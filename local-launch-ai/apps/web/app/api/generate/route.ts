import { NextResponse } from "next/server";
import { generateSiteDraft } from "@/features/generator/server/generate-site";
import { logEvent } from "@/lib/observability/logger";

export async function POST() {
  const draft = await generateSiteDraft({
    projectId: "api-demo",
    sourceType: "google_maps_url",
    sourceValue: "https://maps.google.com/?cid=example",
    businessName: "Northside Dental",
    location: "Chicago, IL",
    ownerNotes: ["Accepts new patients and emphasizes anxiety-friendly care."],
    tone: "reassuring, polished, premium",
    style: "medical",
  });

  logEvent("generation.completed", {
    projectId: draft.projectId,
    pages: draft.pages.length,
    approvalsRequired: draft.approvalsRequired,
  });

  return NextResponse.json(draft);
}
