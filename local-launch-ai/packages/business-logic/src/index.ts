import { buildSystemPrompt, buildUserPrompt, siteGenerationSchema } from "@locallaunch/prompts";
import { themePresets } from "@locallaunch/templates";
import type { BusinessProfile, GeneratedSite } from "@locallaunch/types";

interface GenerateSiteInput {
  projectId: string;
  profile: BusinessProfile;
  tone: string;
  style: keyof typeof themePresets;
}

export function normalizeBusinessFacts(rawFacts: string[]): string[] {
  return rawFacts
    .map((fact) => fact.trim())
    .filter(Boolean)
    .map((fact) => fact.replace(/\s+/g, " "));
}

export function buildMockSiteDraft(input: GenerateSiteInput): GeneratedSite {
  const theme = themePresets[input.style];
  const promptPreview = `${buildSystemPrompt()}\n\n${buildUserPrompt(input.profile, input.tone, input.style)}`;

  const parsed = siteGenerationSchema.parse({
    heroHeadline: `${input.profile.name.value} made memorable online`,
    heroBody: `Launch a polished website for ${input.profile.name.value} with original copy, clear calls to action, and a modern visual system tuned for ${input.profile.category.value.toLowerCase()} customers.`,
    aboutSummary: `${input.profile.name.value} serves ${input.profile.serviceAreas.value.join(", ") || "its local market"} with a focus on trust, responsiveness, and premium customer experience. This draft intentionally rewrites all public-facing language into fresh, original copy.`,
    services: input.profile.summaryFacts.slice(0, 3),
    faqs: [
      {
        question: `What makes ${input.profile.name.value} different?`,
        answer: `${input.profile.name.value} combines local expertise, a clear customer process, and a polished digital presence built from structured facts rather than copied content.`,
      },
      {
        question: "Can the website be edited before publishing?",
        answer: "Yes. Every generated page remains editable, with approval controls for images, testimonials, and any sensitive content.",
      },
    ],
    cta: {
      label: "Request a quote",
      value: "Turn this draft into a lead-generating website.",
    },
    metaTitle: `${input.profile.name.value} | ${input.profile.category.value}`,
    metaDescription: `Discover ${input.profile.name.value}, a ${input.profile.category.value.toLowerCase()} business serving ${input.profile.serviceAreas.value.join(", ") || "its community"}.`,
  });

  return {
    projectId: input.projectId,
    businessName: input.profile.name.value,
    tone: input.tone,
    style: input.style,
    theme,
    metaTitle: parsed.metaTitle,
    metaDescription: parsed.metaDescription,
    approvalsRequired: ["image_gallery", "testimonials", "legal_review"],
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: input.profile.name.value,
      telephone: input.profile.phone?.value,
      address: input.profile.address?.value,
    },
    pages: [
      {
        slug: "/",
        title: "Home",
        description: parsed.metaDescription,
        sections: [
          {
            id: "hero",
            type: "hero",
            heading: parsed.heroHeadline,
            body: `${parsed.heroBody}\n\nPrompt preview: ${promptPreview}`,
            ctaLabel: parsed.cta.label,
          },
          {
            id: "services",
            type: "services",
            heading: "Services",
            body: "Structured from public facts and editable before launch.",
            items: parsed.services,
          },
        ],
      },
      {
        slug: "/about",
        title: "About",
        description: `About ${input.profile.name.value}`,
        sections: [
          {
            id: "about",
            type: "about",
            heading: `Why customers choose ${input.profile.name.value}`,
            body: parsed.aboutSummary,
          },
        ],
      },
      {
        slug: "/services",
        title: "Services",
        description: `Services from ${input.profile.name.value}`,
        sections: [
          {
            id: "services-list",
            type: "services",
            heading: "Services designed for conversion",
            body: "Each service block is generated from structured facts and can be refined in the editor before launch.",
            items: parsed.services,
          },
        ],
      },
      {
        slug: "/faq",
        title: "FAQ",
        description: `Frequently asked questions for ${input.profile.name.value}`,
        sections: parsed.faqs.map((faq, index) => ({
          id: `faq-${index + 1}`,
          type: "faq",
          heading: faq.question,
          body: faq.answer,
        })),
      },
      {
        slug: "/contact",
        title: "Contact",
        description: `Contact ${input.profile.name.value}`,
        sections: [
          {
            id: "contact",
            type: "contact",
            heading: "Start the conversation",
            body: "Publish-ready contact forms route leads into the workspace inbox and outbound notifications.",
          },
        ],
      },
      {
        slug: "/privacy",
        title: "Privacy Policy",
        description: "Privacy policy draft",
        sections: [
          {
            id: "privacy",
            type: "about",
            heading: "Privacy policy requires final review",
            body: "LocalLaunch AI seeds a compliant draft, but the workspace owner must review privacy and data handling disclosures before publishing.",
          },
        ],
      },
      {
        slug: "/terms",
        title: "Terms",
        description: "Terms draft",
        sections: [
          {
            id: "terms",
            type: "about",
            heading: "Terms and conditions",
            body: "Terms pages are generated as editable starting points and should be reviewed by the business owner before going live.",
          },
        ],
      },
    ],
  };
}
