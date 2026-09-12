"use client";

import { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";

interface ResourceItem {
  title: string;
  category: string;
  desc: string;
  url?: string;
  fileUrl?: string;
  fileName?: string;
}

const guides: ResourceItem[] = [
  { 
    title: "Valorant: Crosshair & Sensitivity Setup", 
    category: "Guides", 
    desc: "Dial in your settings for consistent aim across maps.", 
    url: "https://playvalorant.com", 
    fileUrl: "/downloads/valorant-settings-config.zip", 
    fileName: "valorant-settings-config.zip" 
  },
  { 
    title: "CS2: Best Launch Options for FPS", 
    category: "Guides", 
    desc: "Launch commands that actually make a difference in 2026.", 
    url: "https://counter-strike.net", 
    fileUrl: "/downloads/cs2-autoexec.cfg", 
    fileName: "cs2-autoexec.cfg" 
  },
  { 
    title: "Elden Ring: Hidden Mechanics Explained", 
    category: "Guides", 
    desc: "Poise, stance breaks, and other systems the game never tells you.", 
    url: "#" 
  },
  { 
    title: "Minecraft: Redstone Basics to Advanced", 
    category: "Guides", 
    desc: "From simple doors to full computation circuits.", 
    url: "#" 
  },
];

const recommended: ResourceItem[] = [
  { title: "Fortnite", category: "F2P • PC / Android", desc: "Battle royale, building mechanics, frequent content updates.", url: "https://www.fortnite.com" },
  { title: "Apex Legends", category: "F2P • PC", desc: "Fast-paced hero shooter with deep movement tech.", url: "https://www.ea.com/games/apex-legends" },
  { title: "Genshin Impact", category: "F2P • PC / Android", desc: "Open-world action RPG with gacha character system.", url: "https://genshin.hoyoverse.com" },
  { title: "Brawlhalla", category: "F2P • PC", desc: "Free platform fighter, easy to learn, active esports scene.", url: "https://www.brawlhalla.com" },
  { title: "Warframe", category: "F2P • PC", desc: "Sci-fi looter-shooter with deep build customization.", url: "https://www.warframe.com" },
  { title: "Path of Exile", category: "F2P • PC", desc: "Deep ARPG with massive skill trees and seasonal leagues.", url: "https://www.pathofexile.com" },
];

export default function GamingHub() {
  const [tab, setTab] = useState("guides");

  // Handles forcing direct binary downloads via fetch + object URL Blob
  const handleDownload = async (targetUrl: string, fileName?: string) => {
    try {
      if (targetUrl.startsWith("data:")) {
        const arr = targetUrl.split(",");
        const mimeMatch = arr[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        const blobUrl = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fileName || "download";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      } else {
        const response = await fetch(targetUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fileName || targetUrl.split("/").pop() || "downloaded-file";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      }
    } catch (err) {
      console.warn("Direct blob download restricted, falling back to direct link download:", err);
      const a = document.createElement("a");
      a.href = targetUrl;
      a.download = fileName || "download";
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const renderCard = (item: ResourceItem) => {
    const visitTarget = item.url;
    const downloadTarget = item.fileUrl;

    return (
      <div key={item.title} className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#00D2FF]">
        <div>
          <span className="rounded-full bg-[#00D2FF]/20 px-3 py-1 text-xs font-semibold text-[#00D2FF]">
            {item.category}
          </span>
          <h3 className="mt-3 text-lg font-bold text-white">{item.title}</h3>
          <p className="mt-2 text-sm text-white/60">{item.desc}</p>
        </div>

        {/* DUAL ACTION BUTTONS */}
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
          {/* VISIT LINK MECHANISM: Opens target web URL in new tab */}
          {visitTarget && visitTarget.trim() !== "" && visitTarget !== "#" && (
            <a
              href={visitTarget}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-[#00D2FF] px-3.5 py-1.5 text-xs font-bold text-black transition hover:opacity-90 shadow-[0_0_10px_rgba(0,210,255,0.3)]"
            >
              ↗ Visit Link
            </a>
          )}

          {/* DOWNLOAD FILE MECHANISM: Fetches file as blob & triggers browser save prompt */}
          {downloadTarget && downloadTarget.trim() !== "" && (
            <button
              onClick={() => handleDownload(downloadTarget, item.fileName)}
              className="inline-flex items-center rounded-lg bg-emerald-400 px-3.5 py-1.5 text-xs font-bold text-black transition hover:opacity-90 shadow-[0_0_10px_rgba(52,211,153,0.3)]"
            >
              ⬇ Download File
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#08090b] px-6 pt-24 pb-16 text-white font-sans">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-extrabold text-white">Gaming</h1>
          <p className="mt-2 text-white/60">Guides, mechanics breakdowns, and the best free-to-play titles worth your time.</p>

          <div className="mt-6 flex gap-3">
            <button 
              onClick={() => setTab("guides")} 
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === "guides" ? "bg-[#00D2FF] text-black shadow-[0_0_12px_rgba(0,210,255,0.4)]" : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              Game Guides
            </button>
            <button 
              onClick={() => setTab("recommended")} 
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === "recommended" ? "bg-[#00D2FF] text-black shadow-[0_0_12px_rgba(0,210,255,0.4)]" : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              Recommended Games
            </button>
          </div>

          {tab === "guides" && (
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {guides.map(renderCard)}
            </div>
          )}

          {tab === "recommended" && (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {recommended.map(renderCard)}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}