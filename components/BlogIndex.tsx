"use client";

import { useMemo, useState } from "react";
import { TAGS, type BlogPostMeta, type Tag } from "@/lib/blog-types";
import { cn } from "@/lib/utils";
import { FeaturedPost } from "@/components/FeaturedPost";
import { BlogPostList } from "@/components/BlogPostList";

type BlogIndexProps = {
  posts: BlogPostMeta[];
};

export function BlogIndex({ posts }: BlogIndexProps) {
  const [activeTag, setActiveTag] = useState<Tag | "all">("all");

  const filteredPosts = useMemo(
    () =>
      activeTag === "all"
        ? posts
        : posts.filter((post) => post.tags.includes(activeTag)),
    [activeTag, posts]
  );

  const featuredPost =
    activeTag === "all" ? filteredPosts.find((post) => post.featured) : undefined;

  const listPosts = featuredPost
    ? filteredPosts.filter((post) => post.slug !== featuredPost.slug)
    : filteredPosts;

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTag("all")}
          className={cn(
            "tag cursor-pointer transition-colors",
            activeTag === "all" && "border-[--foreground] text-white"
          )}
        >
          all
        </button>
        {TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={cn(
              "tag cursor-pointer transition-colors",
              activeTag === tag && "border-[--foreground] text-white"
            )}
          >
            #{tag}
          </button>
        ))}
      </div>

      {featuredPost ? (
        <div className="mt-8">
          <FeaturedPost post={featuredPost} />
        </div>
      ) : null}

      <div className={featuredPost ? "mt-10" : "mt-8"}>
        <BlogPostList
          posts={listPosts}
          activeTag={activeTag === "all" ? undefined : activeTag}
          onTagClick={(tag) => setActiveTag(tag as Tag)}
        />
      </div>
    </>
  );
}
