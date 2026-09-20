import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free Gaming Resources, Launchers, Emulators & Repacks | MrFreqline",
  description: "Curated directory of trusted free gaming tools, custom launchers, download managers, emulators, cloud gaming services, game modding utilities, and performance enhancers.",
  keywords: ["free gaming resources", "game launchers", "trusted game repacks", "emulators", "pc gaming tools", "gaming utilities", "free game downloads"],
  alternates: {
    canonical: "https://mrfreqline.vercel.app/gaming/free-resources",
  },
  openGraph: {
    title: "Best Free Gaming Resources, Launchers, Emulators & Repacks | MrFreqline",
    description: "Curated directory of verified gaming tools, launchers, emulators, and safe downloads.",
    url: "https://mrfreqline.vercel.app/gaming/free-resources",
    siteName: "MrFreqline",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Free Gaming Resources, Launchers & Emulators",
    description: "Curated directory of verified gaming tools, launchers, and emulators.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
