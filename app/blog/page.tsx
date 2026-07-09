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
          label="Notes"
          title="Thinking out loud"
          description="Short essays on building software and working in enterprise teams."
        />

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

        <div className="grid gap-4">
          {filteredNotes.map((note) => (
            <article key={note.title} className="glass-card p-6">
              <p className="section-label mb-2">{note.date}</p>
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[--muted-foreground]">
                {note.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(tag)}
                    className="tag cursor-pointer text-[11px]"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
