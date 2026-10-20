import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content/repository";

const BASE = "https://yasminfennou.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = (await getProjects()).filter((p) => p.tier !== "secondary");
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((p) => ({
      url: `${BASE}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${BASE}/orbit`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];
}
