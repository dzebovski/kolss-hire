import Image from "next/image";
import { Suspense } from "react";
import { LanguageSwitcher } from "./language-switcher";
import { CookieSettingsButton } from "./consent";
import type { Locale } from "@/lib/i18n/locales";
import { VACANCY } from "@/lib/vacancy";
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
        <div className="k-small company">
          <p lang="pl">
            {VACANCY.employer}, {VACANCY.address},
            <br />
            KRS 0001207180, NIP 536-199-62-94, REGON 543320017,
            <br />
            Sąd Rejonowy dla m.st. Warszawy w Warszawie, XIV Wydział Gospodarczy
            KRS, kapitał zakładowy {VACANCY.shareCapital}
          </p>
          <p>
            {text.contact}:{" "}
            <a href={`mailto:${VACANCY.contact.email}`}>
              {VACANCY.contact.email}
            </a>
            {" · "}
            <a href={VACANCY.contact.phoneHref}>{VACANCY.contact.phone}</a>
          </p>
        </div>
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
