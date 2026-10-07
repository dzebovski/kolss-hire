import { randomUUID } from "node:crypto";
import { after } from "next/server";
import { checkBotId } from "botid/server";
import { isValidCv } from "@/lib/apply/file";
import { sendMetaConversion } from "@/lib/apply/meta-capi";
import { sendApplicationToSlack } from "@/lib/apply/slack";
import { validateApplicationFields } from "@/lib/apply/schema";

// Node.js is the default; an explicit runtime export is incompatible with Cache Components.
const MAX_REQUEST_BYTES = 4_400_000;

function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

async function readBoundedBody(request: Request): Promise<Uint8Array | null> {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_REQUEST_BYTES) return null;
  if (!request.body) return new Uint8Array();
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_REQUEST_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
}

const stringField = (data: FormData, key: string) => {
  const value = data.get(key);
  return typeof value === "string" ? value : "";
};

export async function POST(request: Request) {
  let verification: { isBot: boolean };
  try {
    verification = await checkBotId();
  } catch {
    console.error("apply blocked: botid verification unavailable");
    return json({ ok: false }, 503);
  }
  if (verification.isBot) return json({ ok: false, error: "rateLimit" }, 403);
  if (!process.env.SLACK_HR_BOT_TOKEN || !process.env.SLACK_HR_CHANNEL_ID) {
    console.error("apply unavailable: slack_not_configured");
    return json({ ok: false, error: "server" }, 503);
  }

  const boundedBody = await readBoundedBody(request);
  if (!boundedBody) return json({ ok: false, error: "payloadTooLarge" }, 413);

  let form: FormData;
  try {
    const contentType = request.headers.get("content-type") || "";
    const body = new Blob([boundedBody.buffer as ArrayBuffer]);
    form = await new Request(request.url, {
      method: "POST",
      headers: { "content-type": contentType },
      body,
    }).formData();
  } catch {
    return json({ ok: false, error: "invalidRequest" }, 400);
  }

  const input = Object.fromEntries(
    [
      "name",
      "phone",
      "email",
      "cvUrl",
      "comment",
      "vacancy",
      "lang",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "fbclid",
      "website",
      "renderedAt",
      "consent",
      "fbp",
      "fbc",
    ].map((key) => [key, stringField(form, key)]),
  );
  const submittedFile = form.get("cvFile");
  const schemaInput = {
    ...input,
    cvFile:
      submittedFile instanceof File && submittedFile.size > 0
        ? submittedFile
        : undefined,
  };
  const renderedAt = Number(input.renderedAt);
  const submittedAt = Date.now();
  const renderedAtMs =
    String(input.renderedAt).length <= 10 ? renderedAt * 1000 : renderedAt;
  if (
    input.website ||
    !Number.isFinite(renderedAtMs) ||
    submittedAt - renderedAtMs < 3_000
  )
    return json({ ok: true, eventId: "" });

  const parsed = validateApplicationFields(schemaInput);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] || "form");
      if (!(key in errors))
        errors[key] = ["cvMissing", "fileSize", "fileType"].includes(
          issue.message,
        )
          ? issue.message
          : key;
    }
    return json({ ok: false, errors }, 422);
  }
  const fields = parsed.data;
  const entry = form.get("cvFile");
  const file = entry instanceof File && entry.size > 0 ? entry : undefined;
  if (!file && !fields.cvUrl)
    return json({ ok: false, errors: { cvUrl: "cvMissing" } }, 422);
  if (file) {
    if (file.size > 4_000_000)
      return json({ ok: false, errors: { cvFile: "fileSize" } }, 422);
    const bytes = new Uint8Array(await file.arrayBuffer());
    if (!isValidCv(file.name, bytes, file.size))
      return json({ ok: false, errors: { cvFile: "fileType" } }, 422);
  }

  try {
    await sendApplicationToSlack(fields, file);
  } catch (error) {
    const code =
      error instanceof Error && error.message === "slack_not_configured"
        ? "slack_not_configured"
        : "slack_delivery_failed";
    console.error(`apply failed: ${code}`);
    return json({ ok: false, error: "server" }, 502);
  }

  const eventId = randomUUID();
  if (fields.consent === "granted" && process.env.META_CAPI_ACCESS_TOKEN) {
    const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://prace.kolss.eu";
    const sourceUrl = new URL(`/${fields.lang}#form`, origin).toString();
    const fbpCookie = request.headers
      .get("cookie")
      ?.match(/(?:^|;\s*)_fbp=([^;]+)/)?.[1];
    const fbcCookie = request.headers
      .get("cookie")
      ?.match(/(?:^|;\s*)_fbc=([^;]+)/)?.[1];
    const forwardedFor = request.headers
      .get("x-forwarded-for")
      ?.split(",")[0]
      ?.trim();
    const metaTask = sendMetaConversion({
      fields,
      eventId,
      eventTime: Math.floor(Date.now() / 1000),
      eventSourceUrl: sourceUrl,
      ip: forwardedFor,
      userAgent: request.headers.get("user-agent") || undefined,
      fbp: fields.fbp || fbpCookie,
      fbc: fields.fbc || fbcCookie,
    }).catch(() => console.error("apply tracking failed: meta_capi_failed"));
    after(() => metaTask);
  }
  return json({ ok: true, eventId });
}
