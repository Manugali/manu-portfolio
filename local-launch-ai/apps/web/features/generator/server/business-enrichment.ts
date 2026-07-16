import type { BusinessProfile, ProvenanceField } from "@locallaunch/types";

export interface BusinessIntakeInput {
  sourceType: "google_maps_url" | "business_search" | "manual";
  sourceValue: string;
  businessName?: string;
  location?: string;
  ownerNotes?: string[];
}

function field<TValue>(value: TValue, source: string, confidence: number): ProvenanceField<TValue> {
  return {
    value,
    source,
    confidence,
    origin: "imported",
    approvalStatus: "pending",
  };
}

export async function enrichBusinessProfile(input: BusinessIntakeInput): Promise<BusinessProfile> {
  const normalizedName = input.businessName ?? "Local Business";
  const normalizedLocation = input.location ?? "Downtown";

  const summaryFacts = [
    `${normalizedName} serves customers in ${normalizedLocation}.`,
    "Customers can request a quote, consultation, or reservation from the website.",
    "The final site should feel premium, trustworthy, and mobile-first.",
    ...(input.ownerNotes ?? []),
  ];

  return {
    name: field(normalizedName, input.sourceType, 0.92),
    category: field("Local Service Business", input.sourceType, 0.76),
    phone: field("(555) 012-3456", "manual_fallback", 0.45),
    address: field(`${normalizedLocation}, Example City`, input.sourceType, 0.71),
    openingHours: field(["Mon-Fri 9:00 AM - 6:00 PM", "Sat 10:00 AM - 2:00 PM"], input.sourceType, 0.66),
    serviceAreas: field([normalizedLocation, "Nearby neighborhoods"], input.sourceType, 0.8),
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/example" },
      { platform: "Facebook", url: "https://facebook.com/example" },
    ],
    summaryFacts,
  };
}
