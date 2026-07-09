import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { InitialLoader } from "@/components/InitialLoader";
import { AtmosphereOverlay } from "@/components/AtmosphereOverlay";

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const logoFont = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-logo",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://manugali.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Manohar Gali — Applications Engineer",
    template: "%s · Manohar Gali",
  },
  description:
    "Full-stack .NET engineer in financial services. Internal platforms, legacy integration, SQL Server, and Azure.",
  keywords: [
    "Manohar Gali",
    "Applications Engineer",
    ".NET",
    "Enterprise Software",
    "Financial Services",
    "Full-Stack Developer",
  ],
  authors: [{ name: "Manohar Gali" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Manohar Gali",
    title: "Manohar Gali — Applications Engineer",
    description:
      "Full-stack .NET engineer building internal platforms in regulated financial environments.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manohar Gali — Applications Engineer",
    description:
      "Full-stack .NET engineer building internal platforms in regulated financial environments.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Manohar Gali",
  jobTitle: "Applications Engineer",
  url: siteUrl,
  sameAs: ["https://github.com/Manugali"],
  knowsAbout: [
    "C#",
    ".NET",
    "ASP.NET Core",
    "SQL Server",
    "Enterprise Software",
    "System Integration",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${logoFont.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[--background] text-[--foreground] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <AtmosphereOverlay />
          <InitialLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
