import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curated AI Prompts Vault - ChatGPT, Claude, Midjourney & Coding | MrFreqline",
  description: "Browse high-performance system prompts and templates for ChatGPT, Claude, Midjourney, coding assistants, copywriters, and marketers.",
  keywords: ["ai prompts", "chatgpt prompt vault", "midjourney prompts", "coding prompts", "system prompts", "free prompt library"],
  alternates: {
    canonical: "https://mrfreqline.vercel.app/prompts",
  },
  openGraph: {
    title: "Curated AI Prompts Vault - ChatGPT, Claude, Midjourney & Coding | MrFreqline",
    description: "Browse high-performance system prompts and templates for AI models.",
    url: "https://mrfreqline.vercel.app/prompts",
    siteName: "MrFreqline",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
