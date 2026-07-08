"use client";

import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { getSocialLinks } from "@/lib/social";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

export default function ContactPage() {
  const { email, phone, github, linkedin } = getSocialLinks();

  return (
    <AppShell>
      <main className="min-w-0 w-full space-y-8">
        <PageHeader
          title="Contact"
          description="Have a problem to solve or a product to ship? I'd love to hear from you."
        />
        <div className="grid min-w-0 gap-4">
          <div className="glass-card min-w-0 p-6 space-y-5 text-center">
            <h2 className="text-lg font-bold gradient-text">Say hello</h2>
            <p className="text-sm text-[--muted-foreground] leading-relaxed">
              I&apos;m open to interesting projects, collaborations, and full-time opportunities.
            </p>
            <div className="space-y-3">
              <a
                className="flex min-w-0 items-center justify-center gap-3 text-sm text-[--muted-foreground] hover:text-white transition-colors"
                href={`mailto:${email}`}
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span className="min-w-0 break-all">{email}</span>
              </a>
              <a
                className="flex items-center justify-center gap-3 text-sm text-[--muted-foreground] hover:text-white transition-colors"
                href={`tel:${phone}`}
              >
                <Phone className="h-4 w-4 shrink-0" />
                {phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
              </a>
              <a
                className="flex items-center justify-center gap-3 text-sm text-[--muted-foreground] hover:text-white transition-colors"
                href={github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 shrink-0" />
                GitHub
              </a>
              {linkedin ? (
                <a
                  className="flex items-center justify-center gap-3 text-sm text-[--muted-foreground] hover:text-white transition-colors"
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4 shrink-0" />
                  LinkedIn
                </a>
              ) : null}
            </div>
          </div>

          <form className="glass-card min-w-0 p-6 space-y-4 text-center" action="/api/contact" method="post">
            <h2 className="text-lg font-bold gradient-text">Send a message</h2>
            <input
              className="w-full rounded-xl border border-[--border] bg-[--muted]/30 px-4 py-2.5 text-sm text-[--foreground] placeholder:text-[--muted-foreground] focus:border-[--muted-foreground] outline-none transition-colors"
              name="name"
              placeholder="Your name"
              required
            />
            <input
              className="w-full rounded-xl border border-[--border] bg-[--muted]/30 px-4 py-2.5 text-sm text-[--foreground] placeholder:text-[--muted-foreground] focus:border-[--muted-foreground] outline-none transition-colors"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <textarea
              className="w-full rounded-xl border border-[--border] bg-[--muted]/30 px-4 py-2.5 text-sm text-[--foreground] placeholder:text-[--muted-foreground] focus:border-[--muted-foreground] outline-none transition-colors resize-none"
              name="message"
              placeholder="Message"
              rows={5}
              required
            />
            <button
              type="submit"
              className="w-full rounded-xl border border-[--border] bg-white text-[--primary-foreground] px-4 py-2.5 text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Send message
            </button>
          </form>
        </div>
      </main>
    </AppShell>
  );
}
