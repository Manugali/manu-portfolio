import { NextResponse } from "next/server";
import { getRuns, startSyncRun, type SourceId } from "@/lib/bridge";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ runs: getRuns() });
}

export async function POST(request: Request) {
  let sourceIds: SourceId[] = ["hr", "policy", "gl"];
  try {
    const body = (await request.json()) as { sourceIds?: SourceId[] };
    if (body.sourceIds?.length) {
      sourceIds = body.sourceIds;
    }
  } catch {
    // empty body is fine — sync all sources
  }

  const run = startSyncRun(sourceIds);
  return NextResponse.json({ run }, { status: 201 });
}
