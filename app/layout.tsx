import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { InitialLoader } from "@/components/InitialLoader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-[--background] text-[--foreground] antialiased`}>
        <ThemeProvider>
          <InitialLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
