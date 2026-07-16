import { describe, expect, it } from "vitest";
import type { GeneratedSite } from "@locallaunch/types";
import { buildPublishChecklist } from "./publish-checklist";

const site: GeneratedSite = {
  projectId: "demo",
  businessName: "Velvet Bistro",
  tone: "elegant",
  style: "restaurant",
  theme: {
    primary: "#000",
    secondary: "#111",
    accent: "#222",
    surface: "#fff",
    fontHeading: "Inter",
    fontBody: "Inter",
    radius: "rounded",
    animationDensity: "balanced",
  },
  pages: [],
  metaTitle: "x",
  metaDescription: "y",
  schemaMarkup: {},
  approvalsRequired: ["image_gallery", "legal_review"],
};

describe("buildPublishChecklist", () => {
  it("marks required approvals as warnings", () => {
    const items = buildPublishChecklist(site);
    expect(items.find((item) => item.id === "image-approval")?.status).toBe("warning");
    expect(items.find((item) => item.id === "copy-provenance")?.status).toBe("ready");
  });
});
