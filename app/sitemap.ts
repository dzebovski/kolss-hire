import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/locales";
import { VACANCIES } from "@/lib/vacancies";
export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://prace.kolss.eu";
  return locales.flatMap((lang) =>
    ["", ...VACANCIES.map(({ slug }) => `/${slug}`), "/privacy"].map((suffix) => ({
      url: `${site}/${lang}${suffix}`,
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, `${site}/${locale}${suffix}`]),
        ),
      },
    })),
  );
}
