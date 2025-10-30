"use client";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import experience from "@/data/experience.json";
import { CommandPalette } from "@/components/CommandPalette";
import { PageWrapper } from "@/components/PageWrapper";
import { Footer } from "@/components/Footer";

export default function ExperiencePage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-7xl">
        <Sidebar />
        <div className="flex-1">
          <Topbar onOpenCommand={() => setOpen(true)} />
          <PageWrapper>
            <main className="p-4 md:p-6 space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Experience</h1>
              <div className="space-y-4">
                {experience.map((item) => (
                  <div
                    key={`${item.company}-${item.role}`}
                    className="rounded-2xl border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_70%,transparent)] p-5 backdrop-blur"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold">{item.role}</div>
                        <div className="text-sm text-muted-foreground">{item.company}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{item.period}</div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{item.summary}</p>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                      {item.highlights.map((h: string) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
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


