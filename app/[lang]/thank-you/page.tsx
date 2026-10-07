import { Suspense } from "react";
import type { Metadata } from "next";
import { lang as getLang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Header, Footer } from "@/components/chrome";
import { ThankYouTracker } from "@/components/thank-you-tracker";
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: null, languages: {} },
};
export default async function Page() {
  const lang = await getLang();
  if (!hasLocale(lang)) notFound();
  const d = await getDictionary();
  return (
    <div className="simple-page">
      <Header lang={lang} />
      <main className="k-wrap simple-main">
        <div className="simple-col">
          <div className="thanks-mark" aria-hidden="true" />
          <h1 className="k-h1 k-serif">{d.thanks.title}</h1>
          <p className="k-lead">{d.thanks.text}</p>
          <a className="k-link" href={`/${lang}`}>
            <span aria-hidden="true">←</span>
            {d.thanks.back}
          </a>
        </div>
      </main>
      <Footer lang={lang} text={d.footer} />
      <Suspense>
        <ThankYouTracker />
      </Suspense>
    </div>
  );
}
