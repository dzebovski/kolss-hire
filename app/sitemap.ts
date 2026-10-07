import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/locales";
export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://prace.kolss.eu";
  return locales.flatMap((lang) =>
    ["", "/privacy"].map((suffix) => ({
      url: `${site}/${lang}${suffix}`,
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, `${site}/${locale}${suffix}`]),
        ),
      },
    })),
  );
}
