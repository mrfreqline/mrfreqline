import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "50+ Best PC Optimization Tools & FPS Tweaks Guide | MrFreqline",
  description: "Comprehensive Windows PC optimization guide: boost gaming FPS, lower input lag, clean RAM, debloat Windows 10/11, optimize GPU settings, and network latency fixes.",
  keywords: ["pc optimization tools", "best pc tweaks", "boost gaming fps", "windows debloat", "ram cleaner", "gpu settings", "reduce input lag"],
  alternates: {
    canonical: "https://mrfreqline.vercel.app/tech/best-pc-optimization-tools",
  },
  openGraph: {
    title: "50+ Best PC Optimization Tools & FPS Tweaks Guide | MrFreqline",
    description: "Boost your gaming FPS, fix micro-stutters, and optimize Windows 10/11 with our curated PC optimization guide.",
    url: "https://mrfreqline.vercel.app/tech/best-pc-optimization-tools",
    siteName: "MrFreqline",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "50+ Best PC Optimization Tools & FPS Tweaks Guide",
    description: "Boost your gaming FPS, fix micro-stutters, and optimize Windows 10/11.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
