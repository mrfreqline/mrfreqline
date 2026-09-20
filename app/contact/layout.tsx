import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Tool Suggestions | MrFreqline",
  description: "Get in touch with the MrFreqline team for support, feature suggestions, bug reports, and partnership inquiries.",
  alternates: {
    canonical: "https://mrfreqline.vercel.app/contact",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
