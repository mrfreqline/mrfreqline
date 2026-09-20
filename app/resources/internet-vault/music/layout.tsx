import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free Music & Audio Production Tools | MrFreqline",
  description: "Curated directory of free DAWs, sound synthesizers, royalty-free sound effects, sample packs, audio converters, and stem splitters.",
  keywords: ["free music software", "free daws", "audio production", "royalty free sound effects", "free audio tools"],
  alternates: {
    canonical: "https://mrfreqline.vercel.app/resources/internet-vault/music",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
