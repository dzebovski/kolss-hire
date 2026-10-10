import type { Metadata } from "next";
import { lang as getLang } from "next/root-params";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { hasLocale } from "@/lib/i18n/locales";
import { vacancyContent } from "@/lib/i18n/vacancies";
import { VACANCIES, salaryLabel } from "@/lib/vacancies";
import { Header, Footer } from "@/components/chrome";
import { AboutCompany } from "@/components/about-company";
export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const d = await getDictionary();
  return {
    title: d.jobs.metadata.title,
    description: d.jobs.metadata.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { pl: "/pl", uk: "/uk", en: "/en", "x-default": "/pl" },
    },
    openGraph: {
      title: d.jobs.metadata.title,
      description: d.jobs.metadata.description,
      url: `/${lang}`,
      siteName: "KOLSS",
      locale: lang === "uk" ? "uk_UA" : lang === "pl" ? "pl_PL" : "en_GB",
      type: "website",
    },
  };
}
export default async function Page() {
  const lang = await getLang();
  if (!hasLocale(lang)) notFound();
  const d = await getDictionary();
  const jobs = await Promise.all(
    VACANCIES.map(async (vacancy) => ({
      vacancy,
      c: await vacancyContent(vacancy.id, lang),
    })),
  );
  return (
    <>
      <Header lang={lang} />
      <main id="main">
        <section className="k-hero" aria-labelledby="jobs-title">
          <div aria-hidden="true" className="k-glow" />
          <div aria-hidden="true" className="k-deco">
            K
          </div>
          <div className="k-wrap">
            <div className="k-hero-in">
              <p className="k-eyebrow k-muted">{d.jobs.eyebrow}</p>
              <h1 id="jobs-title" className="k-h1 k-serif">
                {d.jobs.title}
              </h1>
              <p className="k-lead">{d.jobs.lead}</p>
            </div>
          </div>
        </section>
        <section className="k-wrap jobs" aria-label={d.jobs.listLabel}>
          <ul className="job-list">
            {jobs.map(({ vacancy, c }, i) => (
              <li key={vacancy.id} className="job-card">
                <p className="k-eyebrow k-muted">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="job-body">
                  <h2 className="k-h2 k-serif">
                    <a href={`/${lang}/${vacancy.slug}`} className="job-link">
                      {c.hero.title}
                    </a>
                  </h2>
                  {lang !== "pl" && (
                    <p lang="pl" className="k-small">
                      {c.hero.role}
                    </p>
                  )}
                  <p className="k-body">{c.hero.lead}</p>
                  <dl className="job-facts">
                    <div>
                      <dt className="k-eyebrow k-muted">{c.hero.payLabel}</dt>
                      <dd className="k-serif">
                        <span className="k-mark">
                          {salaryLabel(vacancy.salary, lang)}
                        </span>
                        {c.hero.payUnit}
                      </dd>
                    </div>
                    <div>
                      <dt className="k-eyebrow k-muted">
                        {c.hero.hoursLabel}
                      </dt>
                      <dd className="k-serif">{c.hero.hours}</dd>
                    </div>
                    <div>
                      <dt className="k-eyebrow k-muted">
                        {c.hero.locationLabel}
                      </dt>
                      <dd className="k-serif">{c.hero.location}</dd>
                    </div>
                  </dl>
                  <span className="k-link job-more" aria-hidden="true">
                    {d.jobs.open}
                    <span>→</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <AboutCompany text={d.about} />
      </main>
      <Footer lang={lang} text={d.footer} />
    </>
  );
}
