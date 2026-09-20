import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free Developer Tools, Coding Utilities, Free IDEs & APIs | MrFreqline",
  description: "Curated collection of 100+ free developer tools: online coding utilities, code formatters, free IDEs, regex testers, git tools, free cloud hosting, and developer APIs.",
  keywords: [
    "free developer tools",
    "best developer tools",
    "free coding tools",
    "web developer tools online",
    "free dev tools",
    "developer utilities",
    "free ides",
    "git tools",
    "free cloud hosting",
    "developer apis",
    "programming resources free",
  ],
  alternates: {
    canonical: "https://mrfreqline.vercel.app/resources/internet-vault/developer",
  },
  openGraph: {
    title: "Best Free Developer Tools, Coding Utilities, Free IDEs & APIs | MrFreqline",
    description: "Curated collection of 100+ free developer tools, IDEs, code utilities, and APIs.",
    url: "https://mrfreqline.vercel.app/resources/internet-vault/developer",
    siteName: "MrFreqline",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
