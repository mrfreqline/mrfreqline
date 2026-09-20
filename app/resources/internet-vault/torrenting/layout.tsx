import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best P2P Utilities, Open-Source Torrent Clients & Safety Tools | MrFreqline",
  description: "Curated collection of open-source BitTorrent clients, network safety utilities, IP leak checkers, and peer-to-peer productivity tools.",
  keywords: ["torrent clients", "p2p tools", "qbittorrent", "ip leak checker", "peer to peer utilities"],
  alternates: {
    canonical: "https://mrfreqline.vercel.app/resources/internet-vault/torrenting",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
