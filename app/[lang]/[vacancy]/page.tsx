import type { Metadata } from "next";
import { lang as getLang } from "next/root-params";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { hasLocale } from "@/lib/i18n/locales";
import { vacancyContent } from "@/lib/i18n/vacancies";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/chrome";
import { ApplicationCta, StickyCta } from "@/components/application-cta";
import { ApplicationForm } from "@/components/application-form";
import { AboutCompany } from "@/components/about-company";
import {
  VACANCIES,
  salaryAmount,
  salaryLabel,
  vacancyBySlug,
} from "@/lib/vacancies";

type Props = { params: Promise<{ vacancy: string }> };

// Every vacancy is prerendered and the whole page depends on the slug, so
// there is no URL-independent shell to show; links here are full page loads.
export const instant = false;

export function generateStaticParams() {
  return VACANCIES.map(({ slug }) => ({ vacancy: slug }));
}

async function load(params: Props["params"]) {
  const lang = await getLang();
  const vacancy = vacancyBySlug((await params).vacancy);
  if (!hasLocale(lang) || !vacancy) notFound();
  return { lang, vacancy, c: await vacancyContent(vacancy.id, lang) };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, vacancy, c } = await load(params);
  const path = `/${vacancy.slug}`;
  return {
    title: c.metadata.title,
    description: c.metadata.description,
    alternates: {
      canonical: `/${lang}${path}`,
      languages: {
        pl: `/pl${path}`,
        uk: `/uk${path}`,
        en: `/en${path}`,
        "x-default": `/pl${path}`,
      },
    },
    openGraph: {
      title: c.metadata.title,
      description: c.metadata.description,
      url: `/${lang}${path}`,
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
export default async function Page({ params }: Props) {
  const { lang, vacancy, c } = await load(params);
  const d = await getDictionary();
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
              <a className="k-link k-small k-back" href={`/${lang}`}>
                <span aria-hidden="true">←</span>
                {d.jobs.nav}
              </a>
              <p className="k-eyebrow k-muted">{c.hero.eyebrow}</p>
              <div className="hero-heading">
                <h1 id="job-title" className="k-h1 k-serif">
                  {c.hero.title}
                </h1>
                {lang !== "pl" && (
                  <p lang="pl" className="k-small">
                    {c.hero.role}
                  </p>
                )}
              </div>
              <p className="k-lead">
                {lang === "uk" ? (
                  <>
                    {c.hero.lead.split(". ")[0]}.<br />
                    {c.hero.lead.split(". ").slice(1).join(". ")}
                  </>
                ) : (
                  c.hero.lead
                )}
              </p>
              <div className="k-facts">
                <div className="k-fact">
                  <p className="k-eyebrow k-muted">{c.hero.payLabel}</p>
                  <p className="k-h3 k-serif">
                    <span className="k-mark">
                      {salaryLabel(vacancy.salary, lang)}
                    </span>
                    {c.hero.payUnit}
                  </p>
                </div>
                <div className="k-fact">
                  <p className="k-eyebrow k-muted">{c.hero.hoursLabel}</p>
                  <p className="k-h3 k-serif">{c.hero.hours}</p>
                </div>
                <div className="k-fact">
                  <p className="k-eyebrow k-muted">{c.hero.locationLabel}</p>
                  <p className="k-h3 k-serif">{c.hero.location}</p>
                </div>
              </div>
              <div className="k-actions">
                <ApplicationCta id="hero-cta">{c.hero.cta}</ApplicationCta>
                <a href="#terms" className="k-link">
                  {c.hero.terms}
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className="k-wrap">
          <div className="k-rule" />
          <section className="k-section k-grid" id="duties">
            <Side number="01" title={c.duties.title} />
            <div className="k-main">
              <List items={c.duties.items} />
              {c.duties.note && <p className="k-small">{c.duties.note}</p>}
              {c.duties.extraTitle && c.duties.extra && (
                <div className="advantage-block">
                  <h3 className="k-serif k-h3">{c.duties.extraTitle}</h3>
                  {c.duties.extra.map((paragraph) => (
                    <p className="k-body" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </section>
          <div className="k-rule" />
          <section className="k-section k-grid" id="requirements">
            <Side number="02" title={c.requirements.title} />
            <div className="k-main spaced-main">
              <List items={c.requirements.items} />
              {c.requirements.note && (
                <p className="k-small">{c.requirements.note}</p>
              )}
              <div className="language-block">
                <p className="k-eyebrow k-muted">
                  {c.requirements.languageTitle}
                </p>
                <div className="k-langopt">
                  <p className="k-serif k-h3">{c.requirements.language}</p>
                  <p className="k-small">{c.requirements.languageNote}</p>
                </div>
              </div>
              <div className="advantage-block">
                <h3 className="k-serif k-h3">
                  {c.requirements.advantageTitle}
                </h3>
                {c.requirements.advantageItems && (
                  <List items={c.requirements.advantageItems} />
                )}
                <p className="k-body">{c.requirements.advantage}</p>
              </div>
            </div>
          </section>
        </div>
        <section id="terms" className="k-dark">
          <div className="k-wrap k-section-pad">
            <div className="k-grid">
              <div className="k-side">
                <p className="k-eyebrow k-dmuted">03</p>
                <h2 className="k-h2 k-serif">{c.terms.title}</h2>
              </div>
              <div className="k-main spaced-main">
                <div className="salary">
                  <p className="k-big k-serif k-lime">
                    {salaryAmount(vacancy.salary)}
                  </p>
                  <p className="k-serif k-h3">
                    {c.terms.payUnit}
                    <span className="k-dmuted">
                      {c.terms.joiner ?? " · "}
                      {c.terms.subtitle}
                    </span>
                  </p>
                </div>
                <dl className="terms-table">
                  {c.terms.rows.map((row) => (
                    <div className="k-bonus" key={row.label}>
                      <dt className="k-eyebrow k-dmuted">{row.label}</dt>
                      <dd className="k-body">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="k-small k-dmuted">{c.terms.note}</p>
                <div className="offer-block">
                  <h3 className="k-eyebrow k-dmuted">{c.terms.offerTitle}</h3>
                  <List items={c.terms.offers} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="k-wrap k-section" id="form">
          <div className="k-grid">
            <div className="k-side form-side">
              <p className="k-eyebrow k-muted">04</p>
              <h2 className="k-h2 k-serif">{c.form.title}</h2>
              <p className="k-body">{c.form.lead}</p>
              <ol className="k-steps">
                {c.form.steps.map((step, i) => (
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
              <ApplicationForm
                lang={lang}
                vacancy={vacancy.id}
                text={{ ...d.form, ...c.form }}
              />
            </div>
          </div>
        </section>
        <AboutCompany text={d.about} />
      </main>
      <Footer lang={lang} text={d.footer} />
      <StickyCta text={c.hero.cta} />
    </>
  );
}
