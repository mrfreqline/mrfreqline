"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../Header";
import Footer from "../../Footer";
import AdsterraBanner from "../../components/AdsterraBanner";
import AdsterraPopunder from "../../components/AdsterraPopunder";

import booksData from "@/data/vault/books.json";
import musicData from "@/data/vault/music.json";
import torrentData from "@/data/vault/torrenting.json";
import devData from "@/data/vault/developer.json";
import mobileData from "@/data/vault/mobile.json";
import osData from "@/data/vault/os-ecosystems.json";
import imageData from "@/data/vault/image-tools.json";
import videoData from "@/data/vault/video-tools.json";

interface VaultSection {
  slug: string;
  title: string;
  count: number;
  description: string;
  subcategories: string[];
}

const sections: VaultSection[] = [
  {
    slug: "books",
    title: "Books & Reading",
    count: booksData.length,
    description: "Digital libraries, public domain archives, unabridged audiobooks, and comic/manga readers.",
    subcategories: ["E-Books & Libraries", "Audiobooks", "Comics & Manga", "Calibre & Readers", "Public Domain"],
  },
  {
    slug: "music",
    title: "Music & Audio",
    count: musicData.length,
    description: "Lossless FLAC downloads, internet radio stations, audio production suites, and free VST synthesizers.",
    subcategories: ["Streaming", "Lossless & Downloads", "Internet Radio", "Audio Production & VSTs"],
  },
  {
    slug: "torrenting",
    title: "Torrenting & P2P",
    count: torrentData.length,
    description: "Verified public trackers, high-performance BitTorrent clients, and premium Debrid caching services.",
    subcategories: ["Torrent Clients", "Debrid Services", "Public Trackers", "Indexers & Usenet"],
  },
  {
    slug: "developer",
    title: "Developer & DevOps",
    count: devData.length,
    description: "Open-source IDEs, visual Git clients, fast Rust terminal replacements, APIs, and cybersecurity tools.",
    subcategories: ["Editors & IDEs", "Git & GitHub", "Terminal & CLI", "Databases & APIs", "Cybersecurity"],
  },
  {
    slug: "mobile",
    title: "Mobile Ecosystems",
    count: mobileData.length,
    description: "Clean APK mirrors, F-Droid FOSS stores, Revanced patchers, and un-tethered iOS sideloading tools.",
    subcategories: ["Android APKs", "F-Droid & FOSS", "iOS Sideloading", "Jailbreak & CFW"],
  },
  {
    slug: "os-ecosystems",
    title: "Linux & macOS",
    count: osData.length,
    description: "Curated Linux distributions, gaming compatibility layers (Proton/Wine), and macOS productivity tools.",
    subcategories: ["Linux Distributions", "Package Managers", "Gaming & Compatibility", "macOS Utilities"],
  },
  {
    slug: "image-tools",
    title: "Image & Graphic Design",
    count: imageData.length,
    description: "Web photo manipulation, local AI upscalers, 3D printing STL files, CC0 textures, and pixel art editors.",
    subcategories: ["Photo Editors", "AI Upscalers", "3D & Printing", "Pixel Art", "Stock Assets"],
  },
  {
    slug: "video-tools",
    title: "Video Production",
    count: videoData.length,
    description: "Hollywood NLE editors, lossless video cutters, FFmpeg transcoding utilities, and media server suites.",
    subcategories: ["Video Editors", "Encoders & Converters", "Screen Recording", "Media Players", "Downloaders"],
  },
];

// All vault links compiled for global search
const allVaultLinks = [
  ...booksData.map((l) => ({ ...l, section: "books", sectionName: "Books & Reading" })),
  ...musicData.map((l) => ({ ...l, section: "music", sectionName: "Music & Audio" })),
  ...torrentData.map((l) => ({ ...l, section: "torrenting", sectionName: "Torrenting & P2P" })),
  ...devData.map((l) => ({ ...l, section: "developer", sectionName: "Developer & DevOps" })),
  ...mobileData.map((l) => ({ ...l, section: "mobile", sectionName: "Mobile Ecosystems" })),
  ...osData.map((l) => ({ ...l, section: "os-ecosystems", sectionName: "Linux & macOS" })),
  ...imageData.map((l) => ({ ...l, section: "image-tools", sectionName: "Image & Graphic Design" })),
  ...videoData.map((l) => ({ ...l, section: "video-tools", sectionName: "Video Production" })),
];

const getFaviconUrl = (siteUrl: string) => {
  try {
    const domain = new URL(siteUrl).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return "";
  }
};

export default function InternetVaultHub() {
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = searchQuery.trim()
    ? allVaultLinks.filter(
        (l) =>
          l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (l.desc && l.desc.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <>
      <Header />
      <AdsterraPopunder />
      <main className="min-h-screen bg-[#07090e] px-6 pt-28 pb-20 font-sans text-white">
        <div className="mx-auto max-w-6xl">
          {/* Header Title Section */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold tracking-widest text-[#00D2FF] uppercase">
                Master Directory & Knowledge Base
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                The Internet Vault
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-gray-400 md:text-base">
                Curated archive of developer utilities, media software, digital libraries, and power-user tools across the web.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-[#111622]/80 px-5 py-3 shadow-inner">
              <span className="text-3xl font-black text-[#00D2FF]">
                {allVaultLinks.length}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Verified <br /> Resources
              </span>
            </div>
          </div>

          {/* Search Box */}
          <div className="mt-8">
            <input
              type="text"
              placeholder="Search across all vault sections (e.g. 'Photopea', 'HandBrake', 'Git', 'FLAC')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder-white/40 transition-all duration-300 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF]"
            />
          </div>

          {/* Adsterra Responsive Banner */}
          <div className="mt-8">
            <AdsterraBanner format="responsive" />
          </div>

          {/* If Searching: Show Global Search Results */}
          {searchQuery.trim() !== "" ? (
            <div className="mt-10">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">
                  Search Results for <span className="text-[#00D2FF]">"{searchQuery}"</span>
                </h2>
                <span className="text-xs text-gray-400">{searchResults.length} tools found</span>
              </div>

              {searchResults.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-[#0d111a] p-10 text-center text-gray-400">
                  No matching tools found in the Vault. Try a different search term.
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-3">
                  {searchResults.map((item, index) => (
                    <a
                      key={`${item.title}-${index}`}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d111a] p-5 transition-all duration-300 hover:border-[#00D2FF]/40 hover:shadow-lg hover:shadow-[#00D2FF]/5"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="rounded-full bg-[#00D2FF]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#00D2FF] uppercase">
                            {item.sectionName}
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-400">
                            {item.status || "VERIFIED"}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/30 p-1">
                            <img
                              src={getFaviconUrl(item.url)}
                              alt=""
                              className="h-full w-full object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </div>
                          <h3 className="text-base font-bold text-white group-hover:text-[#00D2FF] transition-colors">
                            {item.title}
                          </h3>
                        </div>
                        <p className="mt-1.5 text-xs text-gray-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                        <span>{item.category}</span>
                        <span className="text-[#00D2FF] font-semibold group-hover:translate-x-0.5 transition-transform">
                          Visit Site &rarr;
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Standard View: Show 8 Section Cards */
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {sections.map((sec) => (
                <Link
                  key={sec.slug}
                  href={`/resources/internet-vault/${sec.slug}`}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d111a] p-6 shadow-md transition-all duration-300 hover:border-[#00D2FF]/50 hover:bg-[#111622] hover:-translate-y-1"
                >
                  <div>
                    <h2 className="text-xl font-bold text-white group-hover:text-[#00D2FF] transition-colors">
                      {sec.title}
                    </h2>

                    <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                      {sec.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {sec.subcategories.slice(0, 3).map((sub) => (
                        <span
                          key={sub}
                          className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-gray-300"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#00D2FF]">
                    <span>Enter Section</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Adsterra Native Banner */}
          <div className="mt-16">
            <AdsterraBanner format="native" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
