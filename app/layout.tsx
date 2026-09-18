import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import InstallAppBanner from "./components/InstallAppBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MrFreqline | Tech & AI Prompts",
  description: "Curated tech resources, AI prompts, and guides by MrFreqline.",
  verification: {
    google: "cgHoN6YlQzfxEnJT7ZKza1JljfExRX8CjszmOdZ793Q",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="cgHoN6YlQzfxEnJT7ZKza1JljfExRX8CjszmOdZ793Q"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0b0f19] text-white">
        <InstallAppBanner />
        {children}
      </body>
    </html>
  );
}