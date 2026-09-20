import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free Mobile Apps, Android Tools & iOS Utilities | MrFreqline",
  description: "Curated collection of open-source Android apps, F-Droid gems, iOS utilities, mobile productivity tools, and smartphone customization resources.",
  keywords: ["best mobile apps", "open source android", "f-droid apps", "ios utilities", "mobile tools"],
  alternates: {
    canonical: "https://mrfreqline.vercel.app/resources/internet-vault/mobile",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
