"use client";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { PageWrapper } from "@/components/PageWrapper";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";

export default function ContactPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-7xl">
        <Sidebar />
        <div className="flex-1">
          <Topbar onOpenCommand={() => setOpen(true)} />
          <PageWrapper>
          <main className="p-4 md:p-6 space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Contact</h1>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_70%,transparent)] p-5 backdrop-blur">
                <h2 className="text-lg font-semibold">Say hello</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  I’m open to interesting projects and opportunities.
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <a className="block hover:underline" href="mailto:hello@manu.dev">hello@manu.dev</a>
                  <a className="block hover:underline" href="https://github.com/your-github" target="_blank" rel="noreferrer">GitHub</a>
                  <a className="block hover:underline" href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noreferrer">LinkedIn</a>
                </div>
              </div>
              <form className="rounded-2xl border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_70%,transparent)] p-5 backdrop-blur space-y-3" action="/api/contact" method="post">
                <input className="w-full rounded-xl border border-[--border] bg-transparent px-3 py-2 text-sm" name="name" placeholder="Your name" required />
                <input className="w-full rounded-xl border border-[--border] bg-transparent px-3 py-2 text-sm" type="email" name="email" placeholder="Email" required />
                <textarea className="w-full rounded-xl border border-[--border] bg-transparent px-3 py-2 text-sm" name="message" placeholder="Message" rows={5} required />
                <button className="rounded-xl bg-[--primary] text-[--primary-foreground] px-4 py-2 text-sm">Send</button>
              </form>
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


