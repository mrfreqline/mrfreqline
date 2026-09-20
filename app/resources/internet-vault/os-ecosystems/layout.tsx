import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Operating System Tools, Linux Distros & Windows Utilities | MrFreqline",
  description: "Curated collection of Linux distributions, Windows customization tools, desktop environments, terminal emulators, and OS customizers.",
  keywords: ["linux distros", "windows utilities", "os customization", "desktop environments", "system tools"],
  alternates: {
    canonical: "https://mrfreqline.vercel.app/resources/internet-vault/os-ecosystems",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
