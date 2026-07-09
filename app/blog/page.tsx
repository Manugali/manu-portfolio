"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import notes from "@/data/notes.json";
import { cn } from "@/lib/utils";

const TAGS = ["building", "learning", "opinions", "life", "tech"] as const;
type Tag = (typeof TAGS)[number];

type Note = {
  title: string;
  excerpt: string;
  date: string;
  tags: Tag[];
};

const allNotes = notes as Note[];

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState<Tag | "all">("all");

  const filteredNotes = useMemo(
    () =>
      activeTag === "all"
        ? allNotes
        : allNotes.filter((note) => note.tags.includes(activeTag)),
    [activeTag]
  );

  return (
    <AppShell>
      <main className="space-y-8">
        <PageHeader
          title="Notes"
          description="Things I'm thinking about — work, building, and everything in between."
        />

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTag("all")}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              activeTag === "all"
                ? "border-white/40 bg-white/10 text-white"
                : "border-[--border] text-[--muted-foreground] hover:border-[--muted-foreground] hover:text-white"
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
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                activeTag === tag
                  ? "border-white/40 bg-white/10 text-white"
                  : "border-[--border] text-[--muted-foreground] hover:border-[--muted-foreground] hover:text-white"
              )}
            >
              #{tag}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {filteredNotes.length === 0 ? (
            <p className="text-center text-sm text-[--muted-foreground]">
              No notes with this tag yet — check back soon.
            </p>
          ) : (
            filteredNotes.map((note) => (
              <article
                key={note.title}
                className="glass-card p-6 text-center opacity-80"
              >
                <p className="section-label mb-3">{note.date}</p>
                <h2 className="text-lg font-semibold gradient-text">{note.title}</h2>
                <p className="mt-3 text-sm text-[--muted-foreground] leading-relaxed">
                  {note.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  {note.tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveTag(tag)}
                      className="text-xs text-[--muted-foreground] transition-colors hover:text-white"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </AppShell>
  );
}
