import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internet Vault - Curated Index of the Best Free Web Tools & Resources | MrFreqline",
  description: "Explore 1,000+ hand-picked free developer tools, graphics software, video utilities, open-source audio editors, books, and operating system tweaks.",
  keywords: ["internet vault", "curated web tools", "developer tools", "free media software", "open source utilities", "web bookmarks"],
  alternates: {
    canonical: "https://mrfreqline.vercel.app/resources/internet-vault",
  },
  openGraph: {
    title: "Internet Vault - Curated Index of the Best Free Web Tools & Resources | MrFreqline",
    description: "Curated index of the best free developer tools, media software, and open-source utilities.",
    url: "https://mrfreqline.vercel.app/resources/internet-vault",
    siteName: "MrFreqline",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
