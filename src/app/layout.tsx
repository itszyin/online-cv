import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { resume } from "@/lib/resume";
import { canonicalUrl, seoDescription, seoTitle, shareImage } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(canonicalUrl),
  title: seoTitle,
  description: seoDescription,
  alternates: { canonical: canonicalUrl },
  authors: [{ name: resume.sidebar.name }],
  openGraph: {
    type: "profile",
    title: seoTitle,
    description: seoDescription,
    url: canonicalUrl,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
    images: [{ url: shareImage.url, alt: shareImage.alt }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
