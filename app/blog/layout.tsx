import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Personal notes — the parts of my life that do not belong on a résumé.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
