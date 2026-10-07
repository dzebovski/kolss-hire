"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { localizedHref } from "@/lib/i18n/routes";
import { locales, type Locale } from "@/lib/i18n/locales";
export function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const query = useSearchParams().toString();
  const suffix = pathname.replace(/^\/(pl|uk|en)/, "");
  return (
    <nav className="k-langs k-eyebrow" aria-label="Language">
      {locales.map((locale, i) => (
        <span className="lang-item" key={locale}>
          {i > 0 && <span aria-hidden="true">·</span>}
          <a
            href={localizedHref(locale, suffix, query)}
            hrefLang={locale}
            lang={locale}
            aria-current={lang === locale ? "page" : undefined}
          >
            {locale === "uk" ? "UA" : locale.toUpperCase()}
          </a>
        </span>
      ))}
    </nav>
  );
}
