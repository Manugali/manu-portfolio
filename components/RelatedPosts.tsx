import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog-types";
import { formatPostDate } from "@/lib/blog-utils";

type RelatedPostsProps = {
  posts: BlogPostMeta[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-14 border-t border-[--border] pt-10">
      <h2 className="section-label mb-5">More to read</h2>
      <div className="grid gap-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass-card glass-card-interactive group flex items-start justify-between gap-4 p-5"
          >
            <div className="min-w-0">
              <time className="section-label" dateTime={post.date}>
                {formatPostDate(post.date)}
              </time>
              <h3 className="mt-1 font-semibold transition-colors group-hover:text-white">
                {post.title}
              </h3>
            </div>
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[--muted-foreground] transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
          </Link>
        ))}
      </div>
    </section>
  );
}
