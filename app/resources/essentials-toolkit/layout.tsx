import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essentials Studio - All-in-One 65+ Web Utilities & Calculators | MrFreqline",
  description: "Unified productivity workbench featuring 65+ live calculators, developer utilities, math solvers, converters, and security tools in a distraction-free studio interface.",
  keywords: ["online utility studio", "all in one calculator", "web workbench", "developer utilities", "free productivity tools"],
  alternates: {
    canonical: "https://mrfreqline.vercel.app/resources/essentials-toolkit",
  },
  openGraph: {
    title: "Essentials Studio - All-in-One 65+ Web Utilities & Calculators | MrFreqline",
    description: "Unified workbench featuring 65+ live calculators and developer utilities.",
    url: "https://mrfreqline.vercel.app/resources/essentials-toolkit",
    siteName: "MrFreqline",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
