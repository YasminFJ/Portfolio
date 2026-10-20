import type { MetadataRoute } from "next";

// Crawling is allowed on purpose: for search engines to honour "noindex"
// (meta tag in layout.tsx and X-Robots-Tag header in next.config.ts) they
// must be able to read the pages. Blocking crawling here would hide it.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://yasminfennou.com/sitemap.xml" };
}
