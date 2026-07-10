import type { Metadata } from "next";
import Link from "next/link";
import { Rss } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { BlogIndex } from "@/components/BlogIndex";
import { getAllPostMeta } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Personal notes — the parts of my life that do not belong on a résumé.",
};

export default function BlogPage() {
  const posts = getAllPostMeta();

  return (
    <AppShell>
      <main className="space-y-8">
        <PageHeader
          label="Journal"
          title="The rest of me"
          description="My portfolio covers the work. This is the quieter corner — notes on place, memory, and whatever I am thinking through."
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
