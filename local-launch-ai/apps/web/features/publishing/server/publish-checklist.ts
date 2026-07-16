import type { GeneratedSite } from "@locallaunch/types";

export interface PublishChecklistItem {
  id: string;
  label: string;
  status: "ready" | "warning";
}

export function buildPublishChecklist(site: GeneratedSite): PublishChecklistItem[] {
  const items: PublishChecklistItem[] = [
    {
      id: "copy-provenance",
      label: "Generated copy is original and linked to structured facts",
      status: "ready",
    },
    {
      id: "image-approval",
      label: "All gallery images are business-owned and explicitly approved",
      status: site.approvalsRequired.includes("image_gallery") ? "warning" : "ready",
    },
    {
      id: "testimonial-approval",
      label: "Testimonials or review-inspired content has been approved",
      status: site.approvalsRequired.includes("testimonials") ? "warning" : "ready",
    },
    {
      id: "legal-review",
      label: "Legal pages and contact details are complete",
      status: site.approvalsRequired.includes("legal_review") ? "warning" : "ready",
    },
  ];

  return items;
}
