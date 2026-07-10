import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogPostMeta } from "@/lib/blog-types";
import { getReadingTime } from "@/lib/blog-utils";

export type { BlogPost, BlogPostMeta, Tag } from "@/lib/blog-types";
export { TAGS } from "@/lib/blog-types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function parsePostFile(filename: string): BlogPost {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    excerpt: data.excerpt as string,
    date: data.date as string,
    tags: (data.tags ?? []) as BlogPost["tags"],
    featured: Boolean(data.featured),
    content,
    readingTime: getReadingTime(content),
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(parsePostFile)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllPostMeta(): BlogPostMeta[] {
  return getAllPosts().map(({ content, ...meta }) => {
    void content;
    return meta;
  });
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  return parsePostFile(`${slug}.md`);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPostMeta[] {
  const current = getPostBySlug(slug);
  if (!current) {
    return [];
  }

  return getAllPostMeta()
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
    )
    .slice(0, limit)
    .map(({ post }) => post);
}
