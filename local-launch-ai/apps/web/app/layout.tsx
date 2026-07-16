import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LocalLaunch AI",
  description: "Generate premium local-business websites from public business information with built-in approval safeguards.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
