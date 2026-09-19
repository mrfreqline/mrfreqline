"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../../Header";
import Footer from "../../../Footer";
import AdsterraBanner from "../../../components/AdsterraBanner";
import AdsterraPopunder from "../../../components/AdsterraPopunder";
import rawData from "@/data/vault/developer.json";

const categories = [
  "ALL",
  "EDITORS & IDES",
  "GIT & GITHUB",
  "TERMINAL & CLI",
  "HOSTING & CLOUD",
  "DATABASES & APIS",
  "FRONTEND & UI",
  "CYBERSECURITY & REVERSING",
  "DEV UTILITIES",
];

const getFaviconUrl = (siteUrl: string) => {
  try {
    const domain = new URL(siteUrl).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return "";
  }
};

export default function VaultDeveloperPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLinks = rawData.filter((link) => {
    const matchesCategory =
      activeCategory === "ALL" ||
      link.category.toUpperCase() === activeCategory.toUpperCase();
    const matchesSearch =
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (link.desc && link.desc.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      <AdsterraPopunder />
      <main className="min-h-screen bg-[#07090e] px-6 pt-28 pb-20 font-sans text-white">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/resources/internet-vault" className="hover:text-[#00D2FF] transition-colors">Internet Vault</Link>
            <span>/</span>
            <span className="text-[#00D2FF] font-semibold">Developer & DevOps</span>
          </nav>

          {/* Header Title Section */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Developer & DevOps Vault
              </h1>
              <p className="mt-2 text-sm text-gray-400 md:text-base">
                Modern open-source IDEs, visual Git tools, fast CLI utilities, cloud hosting, and reverse engineering.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-[#111622]/80 px-5 py-3 shadow-inner">
              <span className="text-3xl font-black text-[#00D2FF]">
                {filteredLinks.length}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Developer <br /> Tools
              </span>
            </div>
          </div>

          {/* Search Box */}
          <div className="mt-8 space-y-4">
            <input
              type="text"
              placeholder="Search code editors, git tools, terminal commands, or APIs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-white/40 transition-all duration-300 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF]"
            />

            {/* Category Filter Navbar */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeCategory.toUpperCase() === cat.toUpperCase()
                      ? "bg-[#00D2FF] text-black shadow-[0_0_15px_rgba(0,210,255,0.5)] font-extrabold"
                      : "border border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/15"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Adsterra Responsive Banner */}
          <div className="mt-8">
            <AdsterraBanner format="responsive" />
          </div>

          {/* Links Grid */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {filteredLinks.map((link, index) => (
              <a
                key={`${link.title}-${index}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d111a] p-5 transition-all duration-300 hover:border-[#00D2FF]/40 hover:shadow-lg hover:shadow-[#00D2FF]/5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#00D2FF]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#00D2FF] uppercase">
                      {link.category}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400">
                      {link.status || "VERIFIED"}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/30 p-1">
                      <img
                        src={getFaviconUrl(link.url)}
                        alt=""
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#00D2FF] transition-colors">
                      {link.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-xs text-gray-400 leading-relaxed">
                    {link.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-end text-xs text-[#00D2FF] font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Open Resource &rarr;</span>
                </div>
              </a>
            ))}
          </div>

          {/* Adsterra Native Banner */}
          <div className="mt-12">
            <AdsterraBanner format="native" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
