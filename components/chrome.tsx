import Image from "next/image";
import { Suspense } from "react";
import { LanguageSwitcher } from "./language-switcher";
import { CookieSettingsButton } from "./consent";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/dictionaries/uk";
export function Header({ lang }: { lang: Locale }) {
  return (
    <div className="k-wrap">
      <header className="k-header">
        <a
          className="logo-link"
          href="https://kolss.eu"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="KOLSS — kolss.eu"
        >
          <Image
            className="k-logo"
            src="/brand/kolss-logo-dark.svg"
            alt="KOLSS"
            width={158}
            height={24}
            style={{ width: "auto" }}
            priority
          />
        </a>
        <Suspense fallback={<span>PL · UA · EN</span>}>
          <LanguageSwitcher lang={lang} />
        </Suspense>
      </header>
    </div>
  );
}
export function Footer({
  lang,
  text,
}: {
  lang: Locale;
  text: Dictionary["footer"];
}) {
  return (
    <footer className="k-wrap">
      <div className="k-rule" />
      <div className="k-footer">
        <p lang="pl" className="k-small company">
          KOLSS Polska Sp. z o.o., ul. Zegrzyńska 6, 05-119 Legionowo,
          <br />
          KRS 0001207180, NIP 536-199-62-94, REGON 543320017,
          <br />
          Sąd Rejonowy dla m.st. Warszawy w Warszawie, XIV Wydział Gospodarczy
          KRS
        </p>
        <nav className="k-footlinks k-small" aria-label="Footer">
          <a href={`/${lang}/privacy`}>{text.privacy}</a>
          <CookieSettingsButton>{text.cookies}</CookieSettingsButton>
          <a href="https://kolss.eu" target="_blank" rel="noopener noreferrer">
            kolss.eu
          </a>
        </nav>
      </div>
    </footer>
  );
}
