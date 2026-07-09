"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      if (!res.ok) throw new Error("Failed");
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="glass-card p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-8 w-8 text-white" strokeWidth={1.5} />
        <h2 className="text-lg font-semibold">Message sent</h2>
        <p className="mt-2 text-sm text-[--muted-foreground]">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="btn-secondary mt-6"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="glass-card space-y-4 p-6" onSubmit={handleSubmit}>
      <h2 className="text-center text-lg font-semibold">Send a message</h2>
      <input className="field" name="name" placeholder="Your name" required disabled={state === "submitting"} />
      <input
        className="field"
        type="email"
        name="email"
        placeholder="Email"
        required
        disabled={state === "submitting"}
      />
      <textarea
        className="field min-h-[120px] resize-none"
        name="message"
        placeholder="Message"
        rows={4}
        required
        disabled={state === "submitting"}
      />
      {state === "error" ? (
        <p className="text-center text-xs text-red-400">Could not send. Please email me directly.</p>
      ) : null}
      <button type="submit" disabled={state === "submitting"} className="btn-primary w-full">
        {state === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send message"
        )}
      </button>
    </form>
  );
}
