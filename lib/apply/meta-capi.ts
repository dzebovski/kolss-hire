import { createHash } from "node:crypto";
import type { ApplicationFields } from "./schema";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function normalizePhone(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 9) digits = `48${digits}`;
  return digits;
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function buildFbc(
  fbclid: string,
  nowMs = Date.now(),
): string | undefined {
  return fbclid ? `fb.1.${nowMs}.${fbclid}` : undefined;
}

export interface CapiInput {
  fields: ApplicationFields;
  eventId: string;
  eventTime: number;
  eventSourceUrl: string;
  ip?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
}

export async function sendMetaConversion(input: CapiInput): Promise<void> {
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const version = process.env.META_GRAPH_API_VERSION;
  if (!token || !pixelId || !version) return;

  const userData: Record<string, unknown> = {
    em: [sha256(normalizeEmail(input.fields.email))],
    ph: [sha256(normalizePhone(input.fields.phone))],
  };
  if (input.fbp) userData.fbp = input.fbp;
  if (input.fbc || input.fields.fbclid)
    userData.fbc = input.fbc || buildFbc(input.fields.fbclid);
  if (input.ip) userData.client_ip_address = input.ip;
  if (input.userAgent) userData.client_user_agent = input.userAgent;

  const event: Record<string, unknown> = {
    event_name: "SubmitApplication",
    event_time: input.eventTime,
    event_id: input.eventId,
    action_source: "website",
    event_source_url: input.eventSourceUrl,
    user_data: userData,
  };
  const testEventCode = process.env.META_TEST_EVENT_CODE;
  const body = {
    data: [event],
    ...(testEventCode ? { test_event_code: testEventCode } : {}),
  };
  const response = await fetch(
    `https://graph.facebook.com/${encodeURIComponent(version)}/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(token)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(3_000),
    },
  );
  if (!response.ok) throw new Error("meta_capi_http_error");
  const result = (await response.json()) as { events_received?: number };
  if (!result.events_received) throw new Error("meta_capi_rejected");
}
