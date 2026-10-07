import type { Locale } from "./locales";

export function localizedHref(
  locale: Locale,
  suffix: string,
  query: string,
): string {
  return `/${locale}${suffix}${query ? `?${query}` : ""}`;
}
