import { describe, it, expect } from "vitest";
import { preferredLocale } from "../lib/i18n/locales";
describe("Accept-Language", () => {
  it.each([
    [null, "pl"],
    ["en;q=.3,uk-UA;q=.9", "uk"],
    ["ru-UA,pl;q=.8", "uk"],
    ["ru,en;q=.5", "en"],
    ["uk;q=0,pl;q=.5", "pl"],
    ["uk;q=invalid,en", "en"],
    ["de", "pl"],
  ])("selects %s", (header, locale) =>
    expect(preferredLocale(header)).toBe(locale),
  );
});
