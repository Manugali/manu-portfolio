import { buildMockSiteDraft } from "@locallaunch/business-logic";
import type { GeneratedSite } from "@locallaunch/types";
import { enrichBusinessProfile, type BusinessIntakeInput } from "./business-enrichment";

export interface GenerateSiteRequest extends BusinessIntakeInput {
  projectId: string;
  tone: string;
  style: "modern" | "luxury" | "restaurant" | "medical" | "corporate" | "creative";
}

export async function generateSiteDraft(request: GenerateSiteRequest): Promise<GeneratedSite> {
  const profile = await enrichBusinessProfile(request);

  return buildMockSiteDraft({
    projectId: request.projectId,
    profile,
    tone: request.tone,
    style: request.style,
  });
}
