import social from "@/data/social.json";

const INVALID_LINKEDIN_URLS = new Set([
  "https://linkedin.com/in/manu",
  "https://www.linkedin.com/in/manu",
  "https://linkedin.com/in/your-linkedin",
  "https://www.linkedin.com/in/your-linkedin",
]);

function normalizeLinkedInUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed || INVALID_LINKEDIN_URLS.has(trimmed)) {
    return "";
  }

  return trimmed;
}

export function getSocialLinks() {
  const linkedin = normalizeLinkedInUrl(
    process.env.NEXT_PUBLIC_LINKEDIN_URL ?? social.linkedin
  );

  return {
    email: social.email,
    phone: social.phone,
    github: social.github,
    linkedin,
  };
}
