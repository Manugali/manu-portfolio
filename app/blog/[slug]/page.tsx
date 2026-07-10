import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BlogPostContent } from "@/components/BlogPostContent";
import { RelatedPosts } from "@/components/RelatedPosts";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";
import { formatPostDate } from "@/lib/blog-utils";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug);

  return (
    <AppShell>
      <article>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[--muted-foreground] transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          All posts
        </Link>

        <header className="mb-10 space-y-4 border-b border-[--border] pb-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <time className="section-label" dateTime={post.date}>
              {formatPostDate(post.date)}
            </time>
            <span className="text-xs text-[--muted-foreground]">
              {post.readingTime} min read
            </span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {post.title}
          </h1>
          <p className="text-sm leading-relaxed text-[--muted-foreground] sm:text-base">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <BlogPostContent content={post.content} />

        <RelatedPosts posts={relatedPosts} />
      </article>
    </AppShell>
  );
}
