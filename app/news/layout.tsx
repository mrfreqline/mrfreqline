import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech News, Updates & Development Changelog | MrFreqline",
  description: "Stay up to date with the latest tool releases, site features, tech insights, and software updates from the MrFreqline team.",
  keywords: ["tech news", "mrfreqline changelog", "software updates", "tech announcements"],
  alternates: {
    canonical: "https://mrfreqline.vercel.app/news",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
