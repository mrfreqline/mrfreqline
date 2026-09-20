import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free Websites & Online Utilities on the Internet | MrFreqline",
  description: "Hand-picked directory of the internet's best free websites: free university courses, student software perks, free cloud streaming, web utilities, and creative tools.",
  keywords: ["best free websites", "free internet tools", "student freebies", "free online courses", "free web utilities", "hidden internet gems"],
  alternates: {
    canonical: "https://mrfreqline.vercel.app/resources/best-free-websites",
  },
  openGraph: {
    title: "Best Free Websites & Online Utilities on the Internet | MrFreqline",
    description: "Curated directory of the web's best free services, free courses, student perks, and tools.",
    url: "https://mrfreqline.vercel.app/resources/best-free-websites",
    siteName: "MrFreqline",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
