import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free E-Books, Audiobooks & Academic Papers Vault | MrFreqline",
  description: "Curated collection of public domain e-books, open-access research repositories, programming documentation, audiobooks, and literature archives.",
  keywords: ["free ebooks", "free audiobooks", "academic papers", "open library", "programming books free"],
  alternates: {
    canonical: "https://mrfreqline.vercel.app/resources/internet-vault/books",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
