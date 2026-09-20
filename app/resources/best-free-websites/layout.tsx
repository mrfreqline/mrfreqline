import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free Movie Websites, Free Streaming Sites, Anime & Tools | MrFreqline",
  description: "Explore 150+ verified free websites: watch free movies and TV shows online, free anime streaming, free coding courses, student discounts, and web utilities.",
  keywords: [
    "free movie website",
    "free movie websites",
    "best free movie streaming sites",
    "watch free movies online",
    "free streaming sites",
    "free movie site",
    "watch free tv shows online",
    "free anime streaming sites",
    "best free websites",
    "free online tools",
    "free online courses",
    "student tools and freebies",
    "hidden internet gems",
  ],
  alternates: {
    canonical: "https://mrfreqline.vercel.app/resources/best-free-websites",
  },
  openGraph: {
    title: "Best Free Movie Websites, Free Streaming Sites, Anime & Tools | MrFreqline",
    description: "Curated directory of the web's best free movie streaming sites, anime, free courses, student perks, and tools.",
    url: "https://mrfreqline.vercel.app/resources/best-free-websites",
    siteName: "MrFreqline",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Free Movie Websites & Free Streaming Sites | MrFreqline",
    description: "Curated directory of the web's best free movie streaming sites, anime, courses, and tools.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
