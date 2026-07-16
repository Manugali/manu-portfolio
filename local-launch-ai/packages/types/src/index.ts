export type ContentOrigin = "imported" | "ai_rewritten" | "user_provided" | "user_approved";

export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface ProvenanceField<TValue> {
  value: TValue;
  source: string;
  confidence: number;
  origin: ContentOrigin;
  approvalStatus: ApprovalStatus;
}

export interface BusinessProfile {
  name: ProvenanceField<string>;
  category: ProvenanceField<string>;
  phone?: ProvenanceField<string>;
  address?: ProvenanceField<string>;
  openingHours: ProvenanceField<string[]>;
  serviceAreas: ProvenanceField<string[]>;
  summaryFacts: string[];
  socialLinks: Array<{ platform: string; url: string }>;
}

export interface ThemeTokens {
  primary: string;
  secondary: string;
  accent: string;
  surface: string;
  fontHeading: string;
  fontBody: string;
  radius: "soft" | "rounded" | "pill";
  animationDensity: "calm" | "balanced" | "expressive";
}

export interface SectionContent {
  id: string;
  type: "hero" | "about" | "services" | "faq" | "contact" | "gallery" | "testimonials";
  heading: string;
  body: string;
  ctaLabel?: string;
  items?: string[];
}

export interface GeneratedPage {
  slug: string;
  title: string;
  description: string;
  sections: SectionContent[];
}

export interface GeneratedSite {
  projectId: string;
  businessName: string;
  tone: string;
  style: string;
  theme: ThemeTokens;
  pages: GeneratedPage[];
  metaTitle: string;
  metaDescription: string;
  schemaMarkup: Record<string, unknown>;
  approvalsRequired: string[];
}
