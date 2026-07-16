"use client";

import { useMemo, useState } from "react";
import type { GeneratedSite, SectionContent } from "@locallaunch/types";
import { Card } from "@locallaunch/ui";

interface SiteEditorProps {
  initialSite: GeneratedSite;
}

export function SiteEditor({ initialSite }: SiteEditorProps) {
  const [selectedPage, setSelectedPage] = useState(initialSite.pages[0]?.slug ?? "/");
  const [headline, setHeadline] = useState(initialSite.pages[0]?.sections[0]?.heading ?? "");

  const page = useMemo(
    () => initialSite.pages.find((entry) => entry.slug === selectedPage) ?? initialSite.pages[0],
    [initialSite.pages, selectedPage],
  );

  const sections = page?.sections ?? [];
  const heroSection = sections[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[280px_1fr_340px]">
      <Card className="border-slate-200 bg-white/90">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Pages</p>
        <div className="mt-4 space-y-3">
          {initialSite.pages.map((entry) => (
            <button
              key={entry.slug}
              onClick={() => setSelectedPage(entry.slug)}
              className={`w-full rounded-2xl px-4 py-3 text-left text-sm ${
                selectedPage === entry.slug ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              {entry.title}
            </button>
          ))}
        </div>
      </Card>

      <Card className="border-slate-200 bg-white/95">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 px-8 py-10 text-white">
          <p className="text-sm text-violet-200">Preview · {page?.title}</p>
          <h2 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight">{headline || heroSection?.heading}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">{heroSection?.body}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {sections.slice(1).map((section) => (
              <SectionCard key={section.id} section={section} />
            ))}
          </div>
        </div>
      </Card>

      <Card className="border-slate-200 bg-white/90">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Inline editing</p>
        <div className="mt-4 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Hero heading</label>
            <input
              value={headline}
              onChange={(event) => setHeadline(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-0"
            />
          </div>
          <div className="rounded-2xl bg-slate-100 p-4 text-sm leading-6 text-slate-600">
            Editor v1 focuses on structured controls: page switching, inline copy edits, theme token controls, and content approval visibility before full drag-and-drop arrives in a later phase.
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <EditorPill label="Desktop" active />
            <EditorPill label="Mobile" />
            <EditorPill label="Undo" />
            <EditorPill label="Autosave" active />
          </div>
        </div>
      </Card>
    </div>
  );
}

function SectionCard({ section }: { section: SectionContent }) {
  return (
    <div className="rounded-3xl bg-white/5 p-5">
      <p className="text-sm font-semibold text-white">{section.heading}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{section.body}</p>
      {section.items ? (
        <ul className="mt-4 space-y-2 text-sm text-slate-300">
          {section.items.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function EditorPill({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div className={`rounded-2xl px-4 py-3 text-center ${active ? "bg-violet-500 text-white" : "bg-slate-100 text-slate-700"}`}>
      {label}
    </div>
  );
}
