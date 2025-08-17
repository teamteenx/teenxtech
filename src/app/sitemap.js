export default function sitemap() {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const now = new Date();
  // Single-page layout: canonical is root. Add more routes if you create them.
  return [
    {
      url: SITE_URL + "/",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
