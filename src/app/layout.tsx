import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { resume } from "@/lib/resume";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://zqyin.com"),
  title: `${resume.sidebar.name} — ${resume.sidebar.tagline}`,
  description: resume["career-profile"].summary.trim(),
  alternates: { canonical: "https://zqyin.com/" },
  authors: [{ name: resume.sidebar.name }],
  openGraph: {
    type: "profile",
    title: `${resume.sidebar.name} — Resume`,
    description: resume.sidebar.tagline,
    url: "https://zqyin.com/",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
