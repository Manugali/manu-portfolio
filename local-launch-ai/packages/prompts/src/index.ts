import { z } from "zod";
import type { BusinessProfile } from "@locallaunch/types";

export const siteGenerationSchema = z.object({
  heroHeadline: z.string().min(10),
  heroBody: z.string().min(30),
  aboutSummary: z.string().min(60),
  services: z.array(z.string().min(3)).min(3),
  faqs: z.array(
    z.object({
      question: z.string().min(10),
      answer: z.string().min(20),
    }),
  ),
  cta: z.object({
    label: z.string().min(2),
    value: z.string().min(10),
  }),
  metaTitle: z.string().min(10),
  metaDescription: z.string().min(30),
});

export function buildSystemPrompt(): string {
  return [
    "You are the content engine for LocalLaunch AI.",
    "Create original business website copy from structured facts.",
    "Never copy public descriptions verbatim.",
    "Treat reviews as inspiration unless the user has approved direct display.",
    "Flag uncertain or missing details instead of inventing specifics.",
  ].join(" ");
}

export function buildUserPrompt(profile: BusinessProfile, tone: string, style: string): string {
  return [
    `Business: ${profile.name.value}`,
    `Category: ${profile.category.value}`,
    `Tone: ${tone}`,
    `Style: ${style}`,
    `Facts: ${profile.summaryFacts.join("; ")}`,
    `Service areas: ${profile.serviceAreas.value.join(", ") || "Not provided"}`,
    "Generate original marketing copy for a premium small-business website.",
  ].join("\n");
}
