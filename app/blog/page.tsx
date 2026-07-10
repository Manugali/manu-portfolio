import type { Metadata } from "next";
import Link from "next/link";
import { Rss } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { BlogIndex } from "@/components/BlogIndex";
import { getAllPostMeta } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays and notes on building software, learning in public, and working in enterprise teams.",
};

export default function BlogPage() {
  const posts = getAllPostMeta();

  return (
    <AppShell>
      <main className="space-y-8">
        <PageHeader
          label="Blog"
          title="Thinking out loud"
          description="Personal essays on building software, learning, and the messy parts of enterprise work."
        />

        <div className="flex justify-center">
          <Link
            href="/feed.xml"
            className="inline-flex items-center gap-2 text-xs text-[--muted-foreground] transition-colors hover:text-white"
          >
            <Rss className="h-3.5 w-3.5" />
            Subscribe via RSS
          </Link>
        </div>

        <BlogIndex posts={posts} />
      </main>
    </AppShell>
  );
}
