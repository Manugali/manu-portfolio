import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal",
  description: "The rest of me.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
