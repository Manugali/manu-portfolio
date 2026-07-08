"use client";

import { FormEvent, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { cn } from "@/lib/utils";
import { CheckCircle2, Github, Linkedin, Loader2, Mail, Phone } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const inputClassName =
  "w-full rounded-xl border border-[--border] bg-[--muted]/30 px-4 py-2.5 text-sm text-[--foreground] placeholder:text-[--muted-foreground] focus:border-[--muted-foreground] outline-none transition-colors";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setFieldErrors(data.fieldErrors ?? {});
        setFeedback(
          data.error ?? "Something went wrong. Please try again.",
        );
        return;
      }

      setStatus("success");
      setFeedback(
        data.message ?? "Thanks for reaching out. I'll get back to you soon.",
      );
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch {
      setStatus("error");
      setFeedback("Unable to send your message. Please check your connection.");
    }
  }

  return (
    <AppShell>
      <main className="space-y-8">
        <PageHeader
          title="Contact"
          description="Have a problem to solve or a product to ship? I'd love to hear from you."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="glass-card p-6 space-y-5">
            <h2 className="text-lg font-bold gradient-text">Say hello</h2>
            <p className="text-sm text-[--muted-foreground] leading-relaxed">
              I&apos;m open to interesting projects, collaborations, and
              full-time opportunities.
            </p>
            <div className="space-y-3">
              <a
                className="flex items-center gap-3 text-sm text-[--muted-foreground] hover:text-white transition-colors"
                href="mailto:manoharreddygali19061999@gmail.com"
              >
                <Mail className="h-4 w-4 shrink-0" />
                manoharreddygali19061999@gmail.com
              </a>
              <a
                className="flex items-center gap-3 text-sm text-[--muted-foreground] hover:text-white transition-colors"
                href="tel:+18067019862"
              >
                <Phone className="h-4 w-4 shrink-0" />
                806-701-9862
              </a>
              <a
                className="flex items-center gap-3 text-sm text-[--muted-foreground] hover:text-white transition-colors"
                href="https://github.com/Manugali"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 shrink-0" />
                GitHub
              </a>
              <a
                className="flex items-center gap-3 text-sm text-[--muted-foreground] hover:text-white transition-colors"
                href="https://linkedin.com/in/manu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4 shrink-0" />
                LinkedIn
              </a>
            </div>
          </div>

          <form
            className="glass-card p-6 space-y-4"
            onSubmit={handleSubmit}
            noValidate
          >
            <h2 className="text-lg font-bold gradient-text">Send a message</h2>

            {status === "success" ? (
              <div
                className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100"
                role="status"
                aria-live="polite"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{feedback}</p>
              </div>
            ) : null}

            {status === "error" && feedback ? (
              <div
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100"
                role="alert"
                aria-live="assertive"
              >
                {feedback}
              </div>
            ) : null}

            <div className="space-y-1">
              <input
                className={cn(
                  inputClassName,
                  fieldErrors.name && "border-red-500/60",
                )}
                name="name"
                placeholder="Your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
                disabled={status === "loading"}
              />
              {fieldErrors.name ? (
                <p className="text-xs text-red-300">{fieldErrors.name}</p>
              ) : null}
            </div>

            <div className="space-y-1">
              <input
                className={cn(
                  inputClassName,
                  fieldErrors.email && "border-red-500/60",
                )}
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
                disabled={status === "loading"}
              />
              {fieldErrors.email ? (
                <p className="text-xs text-red-300">{fieldErrors.email}</p>
              ) : null}
            </div>

            <div className="space-y-1">
              <textarea
                className={cn(
                  inputClassName,
                  "resize-none",
                  fieldErrors.message && "border-red-500/60",
                )}
                name="message"
                placeholder="Message"
                rows={5}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
                disabled={status === "loading"}
              />
              {fieldErrors.message ? (
                <p className="text-xs text-red-300">{fieldErrors.message}</p>
              ) : null}
            </div>

            <input
              type="text"
              name="website"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <button
              type="submit"
              className="w-full rounded-xl border border-[--border] bg-white text-[--primary-foreground] px-4 py-2.5 text-sm font-medium hover:bg-gray-100 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send message"
              )}
            </button>
          </form>
        </div>
      </main>
    </AppShell>
  );
}
