import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { getProfile } from "@/sanity/queries";
import "./globals.css";

// Same three weights the Modernist design system loads.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    title: profile.seoTitle || [profile.name, profile.role].filter(Boolean).join(" | "),
    description: profile.seoDescription || profile.intro,
  };
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
