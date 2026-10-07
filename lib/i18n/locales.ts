export const locales = ["pl", "uk", "en"] as const;
export type Locale = (typeof locales)[number];
export const hasLocale = (value: string): value is Locale =>
  locales.some((locale) => locale === value);
export function preferredLocale(header: string | null): Locale {
  const preferences = (header ?? "")
    .split(",")
    .map((entry, index) => {
      const [tag, ...options] = entry.trim().toLowerCase().split(";");
      const qOption = options.find((option) => option.trim().startsWith("q="));
      const q = qOption ? Number(qOption.trim().slice(2)) : 1;
      return { tag, q, index };
    })
    .filter(({ q }) => Number.isFinite(q) && q > 0 && q <= 1)
    .sort((a, b) => b.q - a.q || a.index - b.index);
  for (const { tag } of preferences) {
    if (tag === "ru-ua" || tag === "uk" || tag.startsWith("uk-")) return "uk";
    if (tag === "pl" || tag.startsWith("pl-")) return "pl";
    if (tag === "en" || tag.startsWith("en-")) return "en";
  }
  return "pl";
}
