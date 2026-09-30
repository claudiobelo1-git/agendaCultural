import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { getEventoSlugs } from "@/sanity/lib/fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const slugs = await getEventoSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "daily", priority: 1 },
    { url: `${base}/agenda`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/sobre`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/fala-connosco`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacidade`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const eventRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/agenda/${slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...eventRoutes];
}
