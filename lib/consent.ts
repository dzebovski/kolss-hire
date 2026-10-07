export type ConsentValue = "granted" | "denied" | null;

export function consentFromCookie(cookie: string): ConsentValue {
  const value = cookie.match(
    /(?:^|;\s*)kh_consent=(granted|denied)(?:;|$)/,
  )?.[1];
  return value === "granted" || value === "denied" ? value : null;
}

/** Optional identifiers must never be written before marketing consent. */
export function captureConsentedFbclid(
  cookie: string,
  search: string,
  write: (key: string, value: string) => void,
): void {
  if (consentFromCookie(cookie) !== "granted") return;
  const fbclid = new URLSearchParams(search).get("fbclid");
  if (fbclid) write("kh_fbclid", fbclid);
}
