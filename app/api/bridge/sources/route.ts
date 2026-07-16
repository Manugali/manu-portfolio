import { NextResponse } from "next/server";
import { getSources, setFailureMode, type FailureMode, type SourceId } from "@/lib/bridge";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ sources: getSources() });
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as { sourceId?: SourceId; failureMode?: FailureMode };
  if (!body.sourceId || !body.failureMode) {
    return NextResponse.json({ error: "sourceId and failureMode are required" }, { status: 400 });
  }

  const validModes: FailureMode[] = ["none", "timeout", "bad_payload", "duplicate"];
  if (!validModes.includes(body.failureMode)) {
    return NextResponse.json({ error: "Invalid failureMode" }, { status: 400 });
  }

  try {
    const source = setFailureMode(body.sourceId, body.failureMode);
    return NextResponse.json({ source, sources: getSources() });
  } catch {
    return NextResponse.json({ error: "Unknown source" }, { status: 404 });
  }
}
