import type { Metadata } from "next";
import { lang as getLang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Header, Footer } from "@/components/chrome";
export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const d = await getDictionary();
  return {
    title: `${d.privacy.title} — KOLSS`,
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
  return (
    <div className="simple-page">
      <Header lang={lang} />
      <main className="k-wrap simple-main">
        <div className="simple-col">
          <h1 className="k-h1 k-serif">{d.privacy.title}</h1>
          <p className="k-body privacy-copy">{d.privacy.text}</p>
        </div>
      </main>
      <Footer lang={lang} text={d.footer} />
    </div>
  );
}
