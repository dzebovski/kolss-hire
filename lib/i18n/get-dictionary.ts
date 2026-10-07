import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "./locales";
const dictionaries = {
  uk: () => import("./dictionaries/uk").then((m) => m.default),
  pl: () => import("./dictionaries/pl").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
};
export async function dictionaryFor(locale: Locale) {
  return dictionaries[locale]();
}
export async function getDictionary() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return dictionaryFor(locale);
}
