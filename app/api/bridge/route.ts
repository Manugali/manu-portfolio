import { NextResponse } from "next/server";
import { getSnapshot } from "@/lib/bridge";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ snapshot: getSnapshot() });
}
