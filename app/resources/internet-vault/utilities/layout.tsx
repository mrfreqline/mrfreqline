import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free System Utilities & Internet Tools | MrFreqline",
  description: "Curated collection of must-have online utilities, file recovery software, privacy tools, file converters, system monitors, and disk management software.",
  keywords: ["system utilities", "free internet utilities", "file recovery", "privacy tools", "system monitors", "free pc tools"],
  alternates: {
    canonical: "https://mrfreqline.vercel.app/resources/internet-vault/utilities",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
