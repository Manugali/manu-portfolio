import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog-types";
import { formatPostDate } from "@/lib/blog-utils";

type FeaturedPostProps = {
  post: BlogPostMeta;
};

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="glass-card glass-card-interactive group block p-6 sm:p-8"
    >
      <p className="section-label mb-3">Featured</p>
      <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-white sm:text-2xl">
        {post.title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[--muted-foreground] sm:text-base">
        {post.excerpt}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[--muted-foreground]">
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        <span>{post.readingTime} min read</span>
      </div>
      <span className="mt-5 inline-flex items-center gap-2 text-sm text-[--muted-foreground] transition-colors group-hover:text-white">
        Read essay
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
