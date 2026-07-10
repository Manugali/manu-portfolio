import type { BlogPostMeta } from "@/lib/blog-types";

export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function groupPostsByYear(posts: BlogPostMeta[]): [string, BlogPostMeta[]][] {
  const groups = new Map<string, BlogPostMeta[]>();

  for (const post of posts) {
    const year = new Date(post.date).getFullYear().toString();
    const existing = groups.get(year) ?? [];
    existing.push(post);
    groups.set(year, existing);
  }

  return [...groups.entries()].sort(([a], [b]) => Number(b) - Number(a));
}

export function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
