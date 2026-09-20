import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Free Developer Tools, IDEs & Web APIs | Internet Vault | MrFreqline",
  description: "Curated collection of free developer resources: code editors, terminal utilities, free cloud hosting, REST APIs, Git tools, and cybersecurity references.",
  keywords: ["developer tools", "free ides", "git tools", "free cloud hosting", "developer apis", "programming resources"],
  alternates: {
    canonical: "https://mrfreqline.vercel.app/resources/internet-vault/developer",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
