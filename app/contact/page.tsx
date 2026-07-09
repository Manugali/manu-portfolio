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
      <main className="space-y-8">
        <PageHeader
          label="Contact"
          title="Get in touch"
          description="Have a role or project in mind? I'd like to hear from you."
        />

        <div className="grid gap-4">
          <div className="glass-card space-y-4 p-6 text-center">
            <p className="text-sm text-[--muted-foreground]">
              Prefer email or a quick call? Reach me directly.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href={`mailto:${email}`}
                className="flex items-center justify-center gap-2 text-[--muted-foreground] hover:text-white"
              >
                <Mail className="h-4 w-4" />
                <span className="break-all">{email}</span>
              </a>
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-center gap-2 text-[--muted-foreground] hover:text-white"
              >
                <Phone className="h-4 w-4" />
                {phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
              </a>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-[--muted-foreground] hover:text-white"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              {linkedin ? (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-[--muted-foreground] hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
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
