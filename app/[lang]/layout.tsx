import type { Metadata } from "next";
import { Geist, Lora } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { ConsentProvider } from "@/components/consent";
import "../globals.css";
const serif = Lora({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-lora",
  display: "swap",
});
const sans = Geist({
  weight: ["400", "500", "600"],
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-geist",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://prace.kolss.eu",
  ),
  other: process.env.META_DOMAIN_VERIFICATION
    ? { "facebook-domain-verification": process.env.META_DOMAIN_VERIFICATION }
    : {},
};
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = await getDictionary();
  return (
    <html lang={lang} className={`${serif.variable} ${sans.variable}`}>
      <body>
        <ConsentProvider lang={lang} text={d.cookies}>
          <div className="k-root">{children}</div>
        </ConsentProvider>
      </body>
    </html>
  );
}
