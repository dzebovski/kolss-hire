import Image from "next/image";
import { Suspense } from "react";
import { HomeLink } from "./home-link";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { LanguageSwitcher } from "./language-switcher";
import { CookieSettingsButton } from "./consent";
import type { Locale } from "@/lib/i18n/locales";
import { COMPANY } from "@/lib/company";
import type { Dictionary } from "@/lib/i18n/dictionaries/uk";
export async function Header({ lang }: { lang: Locale }) {
  const d = await getDictionary();
  const logo = (
    <Image
      className="k-logo"
      src="/brand/kolss-logo-dark.svg"
      alt="KOLSS"
      width={158}
      height={24}
      style={{ width: "auto" }}
      priority
    />
  );
  return (
    <div className="k-wrap">
      <header className="k-header">
        <Suspense
          fallback={
            <a
              className="logo-link"
              href={`/${lang}`}
              aria-label={d.header.home}
            >
              {logo}
            </a>
          }
        >
          <HomeLink lang={lang} label={d.header.home}>
            {logo}
          </HomeLink>
        </Suspense>
        <div className="k-header-nav">
          <a className="k-navlink k-eyebrow" href={`/${lang}`}>
            {d.jobs.nav}
          </a>
          <Suspense fallback={<span>PL · UA · EN</span>}>
            <LanguageSwitcher lang={lang} />
          </Suspense>
        </div>
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
            {COMPANY.employer}, {COMPANY.address},
            <br />
            KRS 0001207180, NIP 536-199-62-94, REGON 543320017,
            <br />
            Sąd Rejonowy dla m.st. Warszawy w Warszawie, XIV Wydział Gospodarczy
            KRS, kapitał zakładowy {COMPANY.shareCapital}
          </p>
          <p>
            {text.contact}:{" "}
            <a href={`mailto:${COMPANY.contact.email}`}>
              {COMPANY.contact.email}
            </a>
            {" · "}
            <a href={COMPANY.contact.phoneHref}>{COMPANY.contact.phone}</a>
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
