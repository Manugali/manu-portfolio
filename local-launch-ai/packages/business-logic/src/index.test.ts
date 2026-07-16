import { describe, expect, it } from "vitest";
import { buildMockSiteDraft, normalizeBusinessFacts } from "./index";
import type { BusinessProfile } from "@locallaunch/types";

const profile: BusinessProfile = {
  name: {
    value: "Harbor Fitness",
    source: "manual",
    confidence: 1,
    origin: "user_provided",
    approvalStatus: "approved",
  },
  category: {
    value: "Gym",
    source: "manual",
    confidence: 1,
    origin: "user_provided",
    approvalStatus: "approved",
  },
  openingHours: {
    value: ["Mon-Fri 6-9"],
    source: "manual",
    confidence: 1,
    origin: "user_provided",
    approvalStatus: "approved",
  },
  serviceAreas: {
    value: ["Seattle"],
    source: "manual",
    confidence: 1,
    origin: "user_provided",
    approvalStatus: "approved",
  },
  summaryFacts: [" Personal training ", "Nutrition coaching", "Recovery lounge"],
  socialLinks: [],
};

describe("normalizeBusinessFacts", () => {
  it("trims and compacts whitespace", () => {
    expect(normalizeBusinessFacts(profile.summaryFacts)).toEqual([
      "Personal training",
      "Nutrition coaching",
      "Recovery lounge",
    ]);
  });
});

describe("buildMockSiteDraft", () => {
  it("creates the required core pages and approval gates", () => {
    const draft = buildMockSiteDraft({
      projectId: "proj_123",
      profile,
      tone: "premium",
      style: "modern",
    });

    expect(draft.pages.map((page) => page.slug)).toEqual(
      expect.arrayContaining(["/", "/about", "/services", "/faq", "/contact", "/privacy", "/terms"]),
    );
    expect(draft.approvalsRequired).toContain("image_gallery");
  });
});
