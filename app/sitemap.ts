import type { MetadataRoute } from "next";
import { getAllPostMeta } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://manugali.dev";
  const lastModified = new Date();
  const posts = getAllPostMeta();

  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/experience`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/resume`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/projects`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/blog`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/feed.xml`, lastModified, changeFrequency: "weekly", priority: 0.3 },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];
}
