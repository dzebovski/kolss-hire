import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n/locales";
import { vacancyContent } from "@/lib/i18n/vacancies";
import { salaryLabel, vacancyBySlug } from "@/lib/vacancies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "KOLSS · Legionowo";
export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; vacancy: string }>;
}) {
  const { lang, vacancy: slug } = await params;
  const vacancy = vacancyBySlug(slug);
  if (!hasLocale(lang) || !vacancy) notFound();
  const c = await vacancyContent(vacancy.id, lang);
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: "#F7F5EF",
        color: "#1E2421",
        padding: 64,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 32,
        }}
      >
        <span>KOLSS</span>
        <span>Legionowo</span>
      </div>
      <div style={{ fontSize: 64, lineHeight: 1.08, maxWidth: 1040 }}>
        {c.hero.title}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 40,
          background: "#CADC38",
          padding: "16px 24px",
          alignSelf: "flex-start",
        }}
      >
        {salaryLabel(vacancy.salary, lang) + c.hero.payUnit}
      </div>
    </div>,
    size,
  );
}
