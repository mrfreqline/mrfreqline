import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free Image Tools, Graphic Editors & AI Converters | MrFreqline",
  description: "Curated collection of the best free image editors, SVG optimizers, background removers, compression tools, vector graphics, and photo assets.",
  keywords: ["free image tools", "online photo editor", "svg optimizer", "background remover", "image compression", "free graphic design"],
  alternates: {
    canonical: "https://mrfreqline.vercel.app/resources/internet-vault/image-tools",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
