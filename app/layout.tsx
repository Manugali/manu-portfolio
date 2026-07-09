import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { InitialLoader } from "@/components/InitialLoader";

const logoFont = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-logo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manohar Gali - Software Engineer",
  description: "Experienced Software Engineer specializing in enterprise-grade applications and digital transformation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={logoFont.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-[--background] text-[--foreground] antialiased">
        <ThemeProvider>
          <InitialLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
