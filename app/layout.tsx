import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LoaderProvider } from "@/components/InitialLoader";

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
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Manohar Gali",
  jobTitle: "Applications Engineer",
  url: siteUrl,
  sameAs: ["https://github.com/Manugali"],
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
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <LoaderProvider>{children}</LoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
