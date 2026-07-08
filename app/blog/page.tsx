"use client";

import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";

const posts = [
  {
    title: "Why I love the App Router",
    excerpt: "Cleaner layouts, nested routes, and streaming by default...",
    date: "Coming soon",
  },
  {
    title: "Animating like a pro with Framer Motion",
    excerpt: "A few patterns I use to keep UI buttery-smooth...",
    date: "Coming soon",
  },
];

export default function BlogPage() {
  return (
    <AppShell>
      <main className="space-y-8">
        <PageHeader
          title="Blog / Notes"
          description="Thoughts on engineering, design, and building software that lasts."
        />
        <div className="grid gap-6 sm:grid-cols-2 max-w-4xl">
          {posts.map((post) => (
            <article
              key={post.title}
              className="glass-card p-6 md:p-8 opacity-80"
            >
              <p className="section-label mb-3">{post.date}</p>
              <h2 className="text-lg font-bold gradient-text">{post.title}</h2>
              <p className="mt-3 text-sm text-[--muted-foreground] leading-relaxed">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
