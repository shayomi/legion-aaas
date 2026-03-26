import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AAAS — Agent as a Service",
  description:
    "An open-source AI agent that plugs into any codebase, learns your system, automates your workflow, and connects your entire organisation — GitHub, Slack, Google Meet, CI/CD and more.",
  keywords: ["AI agent", "DevOps automation", "GitHub automation", "open source", "SME"],
  openGraph: {
    title: "AAAS — Agent as a Service",
    description: "Open-source AI agent for your entire dev workflow.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
