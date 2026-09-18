import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#00d2ff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "MRFREQLINE | Tech Resources & AI Prompts",
  description: "Curated tech resources, AI prompts, tools, and guides.",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MRFREQLINE",
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-full flex flex-col bg-[#0b0f19] text-white">
        {children}
        {/* 1-Tap App Install Banner for Phone & Browser */}
        <InstallAppBanner />
      </body>
    </html>
  );
}