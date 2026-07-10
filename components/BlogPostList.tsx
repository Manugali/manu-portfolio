import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog-types";
import { formatPostDate, groupPostsByYear } from "@/lib/blog-utils";
import { cn } from "@/lib/utils";

type BlogPostListProps = {
  posts: BlogPostMeta[];
  activeTag?: string;
  onTagClick?: (tag: string) => void;
};

export function BlogPostList({ posts, activeTag, onTagClick }: BlogPostListProps) {
  const grouped = groupPostsByYear(posts);

  if (posts.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-[--muted-foreground]">
        No posts match this tag yet.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {grouped.map(([year, yearPosts]) => (
        <section key={year}>
          <h2 className="section-label mb-4">{year}</h2>
          <div className="glass-card divide-y divide-[--border] px-5 sm:px-6">
            {yearPosts.map((post) => (
              <article key={post.slug} className="py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <time className="section-label" dateTime={post.date}>
                    {formatPostDate(post.date)}
                  </time>
                  <span className="text-xs text-[--muted-foreground]">
                    {post.readingTime} min read
                  </span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="group mt-2 block"
                >
                  <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[--muted-foreground]">
                    {post.excerpt}
                  </p>
                </Link>

                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => onTagClick?.(tag)}
                      className={cn(
                        "tag cursor-pointer transition-colors",
                        activeTag === tag && "border-[--foreground] text-white"
                      )}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
