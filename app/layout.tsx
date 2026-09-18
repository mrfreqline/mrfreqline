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
  themeColor: "#0b0f19",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mrfreqline.vercel.app"),
  title: {
    default: "MrFreqline | Free Movies, Free Games, Tech Tools & Curated Resources",
    template: "%s | MrFreqline",
  },
  description:
    "Discover the best curated free tools, free games, guides to watch movies free, AI prompts, and verified tech resources on MrFreqline.",
  keywords: [
    "mr freqline",
    "mrfreqline",
    "mr freqline website",
    "watch movies free resources",
    "free movies online",
    "free games",
    "free gaming resources",
    "free tools",
    "free tech tools",
    "free resources",
    "curated tech resources",
    "ai prompts",
    "best tech resources",
  ],
  authors: [{ name: "MrFreqline" }],
  creator: "MrFreqline",
  publisher: "MrFreqline",
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mrfreqline.vercel.app",
    siteName: "MrFreqline",
    title: "MrFreqline | Free Movies, Free Games, Tech Tools & Curated Resources",
    description:
      "Curated tech resources, free tools, free games, movie streaming guides, and AI prompts.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MrFreqline | Free Movies, Free Games & Tech Resources",
    description:
      "Curated tech resources, free tools, free games, movie streaming guides, and AI prompts.",
  },
  verification: {
    google: "cgHoN6YlQzfxEnJT7ZKza1JljfExRX8CjszmOdZ793Q",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MrFreqline",
    alternateName: ["MRFREQLINE", "mr freqline", "mrfreqline"],
    url: "https://mrfreqline.vercel.app",
    description:
      "Curated tech resources, free tools, free games, movie streaming guides, and AI prompts.",
  };

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0b0f19] text-white">
        <InstallAppBanner />
        {children}
      </body>
    </html>
  );
}