import { NextResponse } from "next/server";
import {
  getDeadLetter,
  reprocessDeadLetter,
  updateDeadLetter,
} from "@/lib/bridge";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ deadLetter: getDeadLetter() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    id?: string;
    action?: "reprocess" | "discard";
  };

  if (!body.id || !body.action) {
    return NextResponse.json({ error: "id and action are required" }, { status: 400 });
  }

  if (body.action === "discard") {
    const item = updateDeadLetter(body.id, "discarded");
    if (!item) {
      return NextResponse.json({ error: "Dead-letter item not found" }, { status: 404 });
    }
    return NextResponse.json({ item, deadLetter: getDeadLetter() });
  }

  const result = reprocessDeadLetter(body.id);
  if ("error" in result) {
    return NextResponse.json(result, { status: 400 });
  }

  return NextResponse.json({ run: result, deadLetter: getDeadLetter() });
}
