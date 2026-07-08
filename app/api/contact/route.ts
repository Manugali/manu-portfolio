import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  parseContactRequest,
  validateContactPayload,
} from "@/lib/contact";

const DEFAULT_TO_EMAIL = "manoharreddygali19061999@gmail.com";

function getContactConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY,
    toEmail: process.env.CONTACT_TO_EMAIL ?? DEFAULT_TO_EMAIL,
    fromEmail:
      process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>",
  };
}

export async function POST(req: Request) {
  const payload = await parseContactRequest(req);

  if (!payload) {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (payload.website?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const fieldErrors = validateContactPayload(payload);
  if (fieldErrors) {
    return NextResponse.json(
      { ok: false, error: "Please fix the highlighted fields.", fieldErrors },
      { status: 400 },
    );
  }

  const { name, email, message } = payload;
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();
  const { apiKey, toEmail, fromEmail } = getContactConfig();

  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.log("Contact form (dev, no RESEND_API_KEY):", {
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
      });
      return NextResponse.json({
        ok: true,
        message: "Message received. Email delivery is not configured locally.",
      });
    }

    console.error("Contact form failed: RESEND_API_KEY is not configured.");
    return NextResponse.json(
      {
        ok: false,
        error: "Email delivery is not configured. Please try again later.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: trimmedEmail,
    subject: `Portfolio contact from ${trimmedName}`,
    text: [
      `Name: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
      "",
      trimmedMessage,
    ].join("\n"),
  });

  if (error) {
    console.error("Contact form email failed:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to send your message right now. Please try again later.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Thanks for reaching out. I'll get back to you soon.",
  });
}
