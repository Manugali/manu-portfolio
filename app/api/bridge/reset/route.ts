import { NextResponse } from "next/server";
import { resetBridgeStore } from "@/lib/bridge";

export const dynamic = "force-dynamic";

export async function POST() {
  const snapshot = resetBridgeStore();
  return NextResponse.json({ snapshot });
}
