"use client";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { CommandPalette } from "@/components/CommandPalette";
import { PageWrapper } from "@/components/PageWrapper";
import { Footer } from "@/components/Footer";

const posts = [
  {
    title: "Why I love the App Router",
    excerpt: "Cleaner layouts, nested routes, and streaming by default...",
    href: "#",
  },
  {
    title: "Animating like a pro with Framer Motion",
    excerpt: "A few patterns I use to keep UI buttery-smooth...",
    href: "#",
  },
];

export default function BlogPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-7xl">
        <Sidebar />
        <div className="flex-1">
          <Topbar onOpenCommand={() => setOpen(true)} />
          <PageWrapper>
          <main className="p-4 md:p-6 space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Blog / Notes</h1>
            <div className="grid gap-6 sm:grid-cols-2">
              {posts.map((p) => (
                <a
                  key={p.title}
                  href={p.href}
                  className="rounded-2xl border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_70%,transparent)] p-5 backdrop-blur hover:shadow-md transition"
                >
                  <div className="text-lg font-semibold">{p.title}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  <span className="mt-3 inline-block text-xs text-muted-foreground">Read more →</span>
                </a>
              ))}
            </div>
          </main>
          </PageWrapper>
          <CommandPalette open={open} onOpenChange={setOpen} />
          <Footer />
        </div>
      </div>
    </div>
  );
}


