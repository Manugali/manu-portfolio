import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work & Experience | Manohar Gali",
  description:
    "Applications Engineer specializing in enterprise .NET development, legacy system integration, and financial services software delivery.",
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
