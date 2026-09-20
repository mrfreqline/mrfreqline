import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import InstallAppBanner from "./components/InstallAppBanner";
import StickyMobileAd from "./components/StickyMobileAd";
import { ThemeProvider } from "./components/ThemeProvider";

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
    "free movie website",
    "free movie websites",
    "watch free movies online",
    "free movies online",
    "best free movie streaming sites",
    "free streaming websites",
    "free developer tools",
    "free dev tools",
    "web developer tools online",
    "pdf converter",
    "free pdf converter",
    "image to pdf",
    "pdf to image converter",
    "merge pdf online",
    "compress pdf free",
    "online calculators",
    "free tools",
    "free tech tools",
    "pc optimization tools",
    "boost gaming fps",
    "windows 11 debloat",
    "free games",
    "free gaming resources",
    "game repacks",
    "ai prompts vault",
    "best free websites",
    "free online utilities",
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
      suppressHydrationWarning
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
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <ThemeProvider>
          {process.env.NEXT_PUBLIC_SHOW_ADS !== "false" && (
            <Script
              src="https://pl31410687.profitableratecpmnetwork.com/86/76/e9/8676e922298f48c2eb74a4fdc24202b6.js"
              strategy="afterInteractive"
            />
          )}
          <InstallAppBanner />
          {children}
          <StickyMobileAd />
        </ThemeProvider>
      </body>
    </html>
  );
}