import { NextResponse } from "next/server";
import { getOrAdvanceRun } from "@/lib/bridge";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const advance = searchParams.get("advance") !== "0";
  const run = getOrAdvanceRun(id, advance);

  if (!run) {
    return NextResponse.json({ error: "Run not found" }, { status: 404 });
  }

  return NextResponse.json({ run });
}
