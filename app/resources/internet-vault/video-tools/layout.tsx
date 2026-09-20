import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free Video Tools, Editors & Screen Recorders | MrFreqline",
  description: "Curated collection of free video editing software, online video converters, screen recorders, subtitles generators, and compression utilities.",
  keywords: ["free video tools", "online video editor", "video converter", "screen recorder", "video compression", "free open source video"],
  alternates: {
    canonical: "https://mrfreqline.vercel.app/resources/internet-vault/video-tools",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
