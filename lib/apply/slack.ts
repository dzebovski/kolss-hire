import type { ApplicationFields } from "./schema";
import { safeFilename } from "./file";

const escapeMrkdwn = (value: string) =>
  value
    .replace(/[\r\n\u0000-\u001f\u007f]+/g, " ")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export function buildSlackApplication(
  fields: ApplicationFields,
  filename?: string,
): string {
  const cv =
    [
      filename ? "📎 файл у цьому повідомленні" : "",
      fields.cvUrl ? `посилання: ${escapeMrkdwn(fields.cvUrl)}` : "",
    ]
      .filter(Boolean)
      .join(" | ") || "—";
  const source =
    [fields.utm_source, fields.utm_campaign, fields.utm_content]
      .filter(Boolean)
      .join(" / ") || "—";
  const received = new Intl.DateTimeFormat("uk-UA", {
    timeZone: "Europe/Warsaw",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
  return [
    "*Нова заявка · Doradca / Doradczyni klienta — Legionowo*",
    `*Ім’я:* ${escapeMrkdwn(fields.name)}`,
    `*Телефон:* <tel:${fields.phone.replace(/[^\d+]/g, "")}|${escapeMrkdwn(fields.phone)}>`,
    `*Email:* <mailto:${encodeURIComponent(fields.email)}|${escapeMrkdwn(fields.email)}>`,
    `*CV:* ${cv}`,
    `*Коментар:* ${escapeMrkdwn(fields.comment) || "—"}`,
    "*Згода RODO:* так — позначена кандидатом у формі під час надсилання",
    `*Мова сторінки:* ${fields.lang} · *Джерело:* ${escapeMrkdwn(source)}${fields.fbclid ? " · клік з Meta" : ""}`,
    `*Отримано:* ${received} (Warsaw)`,
  ].join("\n");
}

type SlackResponse = {
  ok?: boolean;
  error?: string;
  upload_url?: string;
  file_id?: string;
  files?: Array<{ id: string }>;
};

async function slackApi(
  method: string,
  token: string,
  body: BodyInit,
  headers?: HeadersInit,
  signal?: AbortSignal,
): Promise<SlackResponse> {
  const response = await fetch(`https://slack.com/api/${method}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, ...headers },
    body,
    signal,
  });
  if (!response.ok) throw new Error("slack_http_error");
  const result = (await response.json()) as SlackResponse;
  if (!result.ok) throw new Error("slack_api_error");
  return result;
}

export async function sendApplicationToSlack(
  fields: ApplicationFields,
  file?: File,
): Promise<void> {
  const token = process.env.SLACK_HR_BOT_TOKEN;
  const channel = process.env.SLACK_HR_CHANNEL_ID;
  if (!token || !channel) throw new Error("slack_not_configured");
  const timeout = AbortSignal.timeout(24_000);
  const text = buildSlackApplication(
    fields,
    file ? safeFilename(file.name) : undefined,
  );
  const blockChunks = text.match(/[\s\S]{1,2500}/g) || [text];

  if (!file) {
    await slackApi(
      "chat.postMessage",
      token,
      JSON.stringify({
        channel,
        text,
        blocks: blockChunks.map((chunk) => ({
          type: "section",
          text: { type: "mrkdwn", text: chunk },
        })),
        unfurl_links: false,
        unfurl_media: false,
      }),
      { "Content-Type": "application/json; charset=utf-8" },
      timeout,
    );
    return;
  }

  const filename = safeFilename(file.name);
  const upload = await slackApi(
    "files.getUploadURLExternal",
    token,
    JSON.stringify({ filename, length: file.size }),
    { "Content-Type": "application/json; charset=utf-8" },
    timeout,
  );
  if (!upload.upload_url || !upload.file_id)
    throw new Error("slack_upload_url_missing");
  const binaryResponse = await fetch(upload.upload_url, {
    method: "POST",
    body: file,
    headers: { "Content-Type": "application/octet-stream" },
    signal: timeout,
  });
  if (!binaryResponse.ok) throw new Error("slack_file_upload_error");
  await slackApi(
    "files.completeUploadExternal",
    token,
    JSON.stringify({
      files: [{ id: upload.file_id, title: filename }],
      channel_id: channel,
      initial_comment: text,
    }),
    { "Content-Type": "application/json; charset=utf-8" },
    timeout,
  );
}
