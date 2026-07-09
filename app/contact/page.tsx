"use client";

import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { getSocialLinks } from "@/lib/social";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

export default function ContactPage() {
  const { email, phone, github, linkedin } = getSocialLinks();

  return (
    <AppShell>
      <main className="min-w-0 w-full space-y-8">
        <PageHeader
          sectionNumber="Contact"
          title="Get in touch"
          description="Have a problem to solve or a product to ship? I'd love to hear from you."
        />

        <div className="grid min-w-0 gap-4">
          <div className="glass-card glass-card-static min-w-0 space-y-5 p-6 text-center">
            <h2 className="text-lg font-semibold gradient-text-soft">Say hello</h2>
            <p className="text-sm leading-relaxed text-[--muted-foreground]">
              I&apos;m open to full-time opportunities, consulting engagements, and
              enterprise software projects where reliability and integration matter.
            </p>
            <p className="text-xs text-[--muted-subtle]">I usually reply within 48 hours</p>
            <div className="space-y-3">
              <a
                className="flex min-w-0 items-center justify-center gap-3 text-sm text-[--muted-foreground] transition-colors hover:text-white"
                href={`mailto:${email}`}
              >
                <Mail className="h-4 w-4 shrink-0" strokeWidth={1.25} />
                <span className="min-w-0 break-all">{email}</span>
              </a>
              <a
                className="flex items-center justify-center gap-3 text-sm text-[--muted-foreground] transition-colors hover:text-white"
                href={`tel:${phone}`}
              >
                <Phone className="h-4 w-4 shrink-0" strokeWidth={1.25} />
                {phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
              </a>
              <a
                className="flex items-center justify-center gap-3 text-sm text-[--muted-foreground] transition-colors hover:text-white"
                href={github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 shrink-0" strokeWidth={1.25} />
                GitHub
              </a>
              {linkedin ? (
                <a
                  className="flex items-center justify-center gap-3 text-sm text-[--muted-foreground] transition-colors hover:text-white"
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4 shrink-0" strokeWidth={1.25} />
                  LinkedIn
                </a>
              ) : null}
            </div>
          </div>

          <ContactForm />
        </div>
      </main>
    </AppShell>
  );
}
