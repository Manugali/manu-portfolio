import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.formData();
  const name = String(data.get("name") || "");
  const email = String(data.get("email") || "");
  const message = String(data.get("message") || "");

  // TODO: Wire to email service or store. For now, just log.
  console.log("Contact form:", { name, email, message });

  return NextResponse.json({ ok: true });
}


