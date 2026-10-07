"use client";

export type ConsentValue = "granted" | "denied" | null;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: Window["fbq"];
    __khPixelReady?: boolean;
  }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const PIXEL_READY_EVENT = "kh:pixel-ready";
const START_APPLICATION_KEY = "kh_start_application";
const FBCLID_KEY = "kh_fbclid";

export function readConsentCookie(): ConsentValue {
  if (typeof document === "undefined") return null;
  const value = document.cookie.match(
    /(?:^|;\s*)kh_consent=(granted|denied)(?:;|$)/,
  )?.[1];
  return value === "granted" || value === "denied" ? value : null;
}

export function saveConsentCookie(value: Exclude<ConsentValue, null>): void {
  document.cookie = `kh_consent=${value}; Max-Age=${180 * 24 * 60 * 60}; Path=/; SameSite=Lax; Secure`;
}

export function captureFbclid(): void {
  if (typeof window === "undefined") return;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  if (fbclid) {
    try {
      window.sessionStorage.setItem(FBCLID_KEY, fbclid);
    } catch {
      // Tracking remains optional when browser storage is unavailable.
    }
  }
}

export function startApplication(): void {
  if (
    !PIXEL_ID ||
    readConsentCookie() !== "granted" ||
    typeof window === "undefined"
  )
    return;
  captureFbclid();
  try {
    if (window.sessionStorage.getItem(START_APPLICATION_KEY)) return;
    window.sessionStorage.setItem(START_APPLICATION_KEY, "1");
  } catch {
    // Avoid sending repeated events if session storage is unavailable.
    return;
  }
  if (window.__khPixelReady && window.fbq)
    window.fbq("trackCustom", "StartApplication");
  else
    window.addEventListener(PIXEL_READY_EVENT, trackStartOnce, { once: true });
}

function trackStartOnce(): void {
  if (
    readConsentCookie() === "granted" &&
    window.__khPixelReady &&
    window.fbq
  ) {
    window.fbq("trackCustom", "StartApplication");
  }
}

function readCookie(name: string): string | undefined {
  return document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))?.[1];
}

export function trackingCookies(): { fbp?: string; fbc?: string } {
  if (
    !PIXEL_ID ||
    typeof window === "undefined" ||
    readConsentCookie() !== "granted"
  )
    return {};
  captureFbclid();
  const fbp = readCookie("_fbp");
  let fbc = readCookie("_fbc");
  if (!fbc) {
    try {
      const fbclid = window.sessionStorage.getItem(FBCLID_KEY);
      if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
    } catch {
      // No fallback identifier when browser storage is unavailable.
    }
  }
  return { ...(fbp ? { fbp: fbp } : {}), ...(fbc ? { fbc: fbc } : {}) };
}

export function revokePixelConsent(): void {
  if (typeof window !== "undefined" && window.fbq)
    window.fbq("consent", "revoke");
  if (typeof document === "undefined") return;

  const host = window.location.hostname;
  const domains = [
    undefined,
    host,
    ...(host.endsWith(".kolss.eu") || host === "kolss.eu" ? [".kolss.eu"] : []),
  ];
  const paths = ["/", "/pl", "/uk", "/en"];
  for (const name of ["_fbp", "_fbc"]) {
    for (const path of paths) {
      for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=${path}; SameSite=Lax${domain ? `; Domain=${domain}` : ""}; Secure`;
      }
    }
  }
}

export function notifyPixelReady(): void {
  if (typeof window === "undefined") return;
  window.__khPixelReady = true;
  window.dispatchEvent(new Event(PIXEL_READY_EVENT));
}

export function onPixelReady(callback: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  if (window.__khPixelReady && window.fbq) {
    callback();
    return () => undefined;
  }
  const listener = () => callback();
  window.addEventListener(PIXEL_READY_EVENT, listener);
  return () => window.removeEventListener(PIXEL_READY_EVENT, listener);
}

export function hasPixelId(): boolean {
  return Boolean(PIXEL_ID);
}

export function getPixelId(): string | undefined {
  return PIXEL_ID;
}
