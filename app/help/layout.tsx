import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center & Frequently Asked Questions | MrFreqline",
  description: "Find answers to frequently asked questions, user guides, and troubleshooting documentation for MrFreqline tools.",
  alternates: {
    canonical: "https://mrfreqline.vercel.app/help",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
