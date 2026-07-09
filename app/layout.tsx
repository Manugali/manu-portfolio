import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { InitialLoader } from "@/components/InitialLoader";

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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[--background] text-[--foreground] antialiased">
        <ThemeProvider>
          <InitialLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
