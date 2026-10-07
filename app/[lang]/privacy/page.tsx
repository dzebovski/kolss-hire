import type { Metadata } from "next";
import { lang as getLang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { LegalBlock, PrivacyContent } from "@/lib/i18n/legal/types";
import { VACANCY } from "@/lib/vacancy";
import { Header, Footer } from "@/components/chrome";
import { CookieSettingsButton } from "@/components/consent";
export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const d = await getDictionary();
  return {
    title: `${d.privacy.title} — KOLSS`,
    description: d.privacy.lead,
    alternates: {
      canonical: `/${lang}/privacy`,
      languages: {
        pl: "/pl/privacy",
        uk: "/uk/privacy",
        en: "/en/privacy",
        "x-default": "/pl/privacy",
      },
    },
  };
}
export default async function Page() {
  const lang = await getLang();
  if (!hasLocale(lang)) notFound();
  const d = await getDictionary();
  const p = d.privacy;
  return (
    <div className="simple-page">
      <Header lang={lang} />
      <main className="k-wrap legal">
        <header className="legal-head">
          <h1 className="k-h1 k-serif">{p.title}</h1>
          <p className="k-lead">{p.lead}</p>
          <p className="k-small">{p.updated}</p>
          {p.translationNote && (
            <p className="k-small legal-note">{p.translationNote}</p>
          )}
        </header>
        <div className="legal-grid">
          <nav className="legal-toc" aria-labelledby="legal-toc-title">
            <p id="legal-toc-title" className="k-eyebrow k-muted">
              {p.contentsTitle}
            </p>
            <ol>
              {p.sections.map((section, i) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span className="legal-num">{num(i)}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="legal-body">
            {p.sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="legal-section"
                aria-labelledby={`${section.id}-title`}
              >
                <h2 id={`${section.id}-title`} className="k-h3 k-serif">
                  <span className="legal-num">{num(i)}</span>
                  {section.title}
                </h2>
                {section.blocks.map((block, j) => (
                  <Block key={j} block={block} p={p} />
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer lang={lang} text={d.footer} />
    </div>
  );
}

function num(i: number) {
  return String(i + 1).padStart(2, "0");
}

function Block({ block, p }: { block: LegalBlock; p: PrivacyContent }) {
  if (typeof block === "string") return <p className="k-body">{block}</p>;
  if ("list" in block)
    return (
      <ul className="legal-list k-body">
        {block.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  if ("contact" in block)
    return (
      <dl className="legal-contact k-body">
        <dt>{p.contactLabels.email}</dt>
        <dd>
          <a href={`mailto:${VACANCY.contact.email}`}>
            {VACANCY.contact.email}
          </a>
        </dd>
        <dt>{p.contactLabels.phone}</dt>
        <dd>
          <a href={VACANCY.contact.phoneHref}>{VACANCY.contact.phone}</a>
        </dd>
        <dt>{p.contactLabels.address}</dt>
        <dd>
          {VACANCY.employer}, {VACANCY.address}
        </dd>
      </dl>
    );
  if ("settings" in block)
    return (
      <CookieSettingsButton className="k-btn legal-settings">
        {p.settingsButton}
      </CookieSettingsButton>
    );
  const h = p.cookieHeaders;
  return (
    <div className="legal-table-wrap">
      <table className="legal-table">
        <thead>
          <tr>
            <th scope="col">{h.name}</th>
            <th scope="col">{h.provider}</th>
            <th scope="col">{h.purpose}</th>
            <th scope="col">{h.lifetime}</th>
          </tr>
        </thead>
        <tbody>
          {block.cookies.map((row) => (
            <tr key={row.name}>
              <th scope="row" data-label={h.name}>
                <code>{row.name}</code>
              </th>
              <td data-label={h.provider}>{row.provider}</td>
              <td data-label={h.purpose}>{row.purpose}</td>
              <td data-label={h.lifetime}>{row.lifetime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
