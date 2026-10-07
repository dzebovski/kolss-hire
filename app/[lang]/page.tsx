import type { Metadata } from "next";
import { lang as getLang } from "next/root-params";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { hasLocale } from "@/lib/i18n/locales";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/chrome";
import { ApplicationCta, StickyCta } from "@/components/application-cta";
import { ApplicationForm } from "@/components/application-form";
import { VACANCY } from "@/lib/vacancy";
export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const d = await getDictionary();
  return {
    title: d.metadata.title,
    description: d.metadata.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { pl: "/pl", uk: "/uk", en: "/en", "x-default": "/pl" },
    },
    openGraph: {
      title: d.metadata.title,
      description: d.metadata.description,
      url: `/${lang}`,
      siteName: "KOLSS",
      locale: lang === "uk" ? "uk_UA" : lang === "pl" ? "pl_PL" : "en_GB",
      type: "website",
    },
  };
}
function List({ items }: { items: string[] }) {
  return (
    <ul className="k-list k-body">
      {items.map((item) => (
        <li key={item}>
          <span className="k-dash" aria-hidden="true">
            —
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
function Side({ number, title }: { number: string; title: string }) {
  return (
    <div className="k-side">
      <p className="k-eyebrow k-muted">{number}</p>
      <h2 className="k-h2 k-serif">{title}</h2>
    </div>
  );
}
export default async function Page() {
  const lang = await getLang();
  if (!hasLocale(lang)) notFound();
  const d = await getDictionary();
  const salaryPrefix =
    lang === "en" ? VACANCY.salary.en : VACANCY.salary.amount;
  return (
    <>
      <Header lang={lang} />
      <main id="main">
        <section className="k-hero" aria-labelledby="job-title">
          <div aria-hidden="true" className="k-glow" />
          <div aria-hidden="true" className="k-deco">
            K
          </div>
          <div className="k-wrap">
            <div className="k-hero-in">
              <p className="k-eyebrow k-muted">{d.hero.eyebrow}</p>
              <div className="hero-heading">
                <h1 id="job-title" className="k-h1 k-serif">
                  {d.hero.title}
                </h1>
                {lang !== "pl" && (
                  <p lang="pl" className="k-small">
                    {d.hero.role}
                  </p>
                )}
              </div>
              <p className="k-lead">
                {lang === "uk" ? (
                  <>
                    {d.hero.lead.split(". ")[0]}.<br />
                    {d.hero.lead.split(". ").slice(1).join(". ")}
                  </>
                ) : (
                  d.hero.lead
                )}
              </p>
              <div className="k-facts">
                <div className="k-fact">
                  <p className="k-eyebrow k-muted">{d.hero.payLabel}</p>
                  <p className="k-h3 k-serif">
                    <span className="k-mark">{salaryPrefix}</span>
                    {d.hero.pay.slice(salaryPrefix.length)}
                  </p>
                </div>
                <div className="k-fact">
                  <p className="k-eyebrow k-muted">{d.hero.hoursLabel}</p>
                  <p className="k-h3 k-serif">{d.hero.hours}</p>
                </div>
                <div className="k-fact">
                  <p className="k-eyebrow k-muted">{d.hero.locationLabel}</p>
                  <p className="k-h3 k-serif">{d.hero.location}</p>
                </div>
              </div>
              <div className="k-actions">
                <ApplicationCta id="hero-cta">{d.hero.cta}</ApplicationCta>
                <a href="#terms" className="k-link">
                  {d.hero.terms}
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className="k-wrap">
          <div className="k-rule" />
          <section className="k-section k-grid" id="duties">
            <Side number="01" title={d.duties.title} />
            <div className="k-main">
              <List items={d.duties.items} />
              <p className="k-small">{d.duties.note}</p>
            </div>
          </section>
          <div className="k-rule" />
          <section className="k-section k-grid" id="requirements">
            <Side number="02" title={d.requirements.title} />
            <div className="k-main spaced-main">
              <List items={d.requirements.items} />
              <div className="language-block">
                <p className="k-eyebrow k-muted">
                  {d.requirements.languageTitle}
                </p>
                <div className="k-langopt">
                  <p className="k-serif k-h3">{d.requirements.language}</p>
                  <p className="k-small">{d.requirements.languageNote}</p>
                </div>
              </div>
              <div className="advantage-block">
                <h3 className="k-serif k-h3">
                  {d.requirements.advantageTitle}
                </h3>
                <p className="k-body">{d.requirements.advantage}</p>
              </div>
            </div>
          </section>
        </div>
        <section id="terms" className="k-dark">
          <div className="k-wrap k-section-pad">
            <div className="k-grid">
              <div className="k-side">
                <p className="k-eyebrow k-dmuted">03</p>
                <h2 className="k-h2 k-serif">{d.terms.title}</h2>
              </div>
              <div className="k-main spaced-main">
                <div className="salary">
                  <p className="k-big k-serif k-lime">
                    {VACANCY.salary.amount}
                  </p>
                  <p className="k-serif k-h3">
                    {d.terms.pay
                      .slice(
                        (lang === "en"
                          ? VACANCY.salary.en.replace(" PLN", "")
                          : VACANCY.salary.amount
                        ).length,
                      )
                      .trim()}
                    <span className="k-dmuted">
                      {lang === "uk" ? " + " : " · "}
                      {d.terms.subtitle}
                    </span>
                  </p>
                </div>
                <dl className="terms-table">
                  {d.terms.rows.map((row) => (
                    <div className="k-bonus" key={row.label}>
                      <dt className="k-eyebrow k-dmuted">{row.label}</dt>
                      <dd className="k-body">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="k-small k-dmuted">{d.terms.note}</p>
                <div className="offer-block">
                  <h3 className="k-eyebrow k-dmuted">{d.terms.offerTitle}</h3>
                  <List items={d.terms.offers} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="k-wrap k-section" id="form">
          <div className="k-grid">
            <div className="k-side form-side">
              <p className="k-eyebrow k-muted">04</p>
              <h2 className="k-h2 k-serif">{d.form.title}</h2>
              <p className="k-body">{d.form.lead}</p>
              <ol className="k-steps">
                {d.form.steps.map((step, i) => (
                  <li className="k-step" key={step}>
                    <span className="k-stepnum" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="k-main k-formcol">
              <ApplicationForm lang={lang} text={d.form} />
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} text={d.footer} />
      <StickyCta text={d.hero.cta} />
    </>
  );
}
