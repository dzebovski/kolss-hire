import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://prace.kolss.eu";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/pl/thank-you", "/uk/thank-you", "/en/thank-you"],
    },
    sitemap: `${site}/sitemap.xml`,
  };
}
