import { NextResponse } from "next/server";
import { buildReconcileReport } from "@/lib/bridge";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const runId = searchParams.get("runId");
  const report = buildReconcileReport(runId);
  return NextResponse.json({ report });
}
