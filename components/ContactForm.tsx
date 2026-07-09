"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to send");
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="glass-card glass-card-static min-w-0 p-8 text-center">
        <div className="icon-container mx-auto mb-5 h-14 w-14">
          <CheckCircle2 className="h-7 w-7 text-emerald-400" strokeWidth={1.25} />
        </div>
        <h2 className="text-lg font-semibold gradient-text">Message sent</h2>
        <p className="mt-3 text-sm leading-relaxed text-[--muted-foreground]">
          Thanks for reaching out. I usually reply within 48 hours.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="btn-ghost mt-6"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="glass-card glass-card-static min-w-0 space-y-4 p-6"
      onSubmit={handleSubmit}
    >
      <div className="text-center">
        <h2 className="text-lg font-semibold gradient-text">Send a message</h2>
        <p className="mt-2 text-xs text-[--muted-subtle]">
          I usually reply within 48 hours
        </p>
      </div>

      <div className="form-field">
        <input
          className="form-input peer"
          name="name"
          placeholder=" "
          required
          disabled={state === "submitting"}
        />
        <label className="form-label">Your name</label>
      </div>

      <div className="form-field">
        <input
          className="form-input peer"
          type="email"
          name="email"
          placeholder=" "
          required
          disabled={state === "submitting"}
        />
        <label className="form-label">Email</label>
      </div>

      <div className="form-field">
        <textarea
          className="form-input peer min-h-[120px] resize-none"
          name="message"
          placeholder=" "
          rows={4}
          required
          disabled={state === "submitting"}
        />
        <label className="form-label">Message</label>
      </div>

      {state === "error" ? (
        <p className="text-center text-xs text-red-400">
          Something went wrong. Please try again or email me directly.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "submitting"}
        className={cn(
          "btn-primary w-full",
          state === "submitting" && "opacity-80"
        )}
      >
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
