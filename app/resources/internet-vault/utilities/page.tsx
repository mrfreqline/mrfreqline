"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../../Header";
import Footer from "../../../Footer";
import AdsterraBanner from "../../../components/AdsterraBanner";
import AdsterraPopunder from "../../../components/AdsterraPopunder";
import rawData from "@/data/vault/utilities.json";

const categories = [
  "ALL",
  "PDF TOOLS",
  "FILE CONVERTERS",
  "TEXT & WRITING",
  "QR TOOLS",
  "DATE & TIME",
  "UNIT CONVERTERS",
  "CURRENCY CONVERTERS",
];

const getFaviconUrl = (siteUrl: string) => {
  try {
    const domain = new URL(siteUrl).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return "";
  }
};

export default function VaultUtilitiesPage() {
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
      <main className="min-h-screen bg-[var(--surface-canvas)] px-6 pt-28 pb-20 font-sans text-[var(--text-main)] transition-colors duration-200">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--text-main)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/resources/internet-vault" className="hover:text-[var(--accent-primary)] transition-colors">Internet Vault</Link>
            <span>/</span>
            <span className="text-[var(--accent-primary)] font-semibold">Web &amp; File Utilities</span>
          </nav>

          {/* Header Title Section */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text-main)] md:text-5xl">
                Web &amp; File Utilities
              </h1>
              <p className="mt-2 text-sm text-[var(--text-muted)] md:text-base">
                Curated online PDF tools, universal file converters, AI writing assistants, and everyday conversion services.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] px-5 py-3 shadow-inner">
              <span className="text-3xl font-black text-[var(--accent-primary)]">
                {filteredLinks.length}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Verified <br /> Services
              </span>
            </div>
          </div>

          {/* Search Box & Category Filters */}
          <div className="mt-8 space-y-4">
            <input
              type="text"
              placeholder="Search PDF tools, file converters, writing assistants, or calculators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] px-5 py-3 text-sm text-[var(--text-main)] placeholder-[var(--text-subtle)] transition-all duration-300 focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
            />

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeCategory.toUpperCase() === cat.toUpperCase()
                      ? "bg-[var(--accent-primary)] text-black shadow-md font-extrabold"
                      : "border border-[var(--surface-border)] bg-[var(--surface-card)] text-[var(--text-muted)] hover:border-[var(--accent-primary)] hover:text-[var(--text-main)]"
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
                className="group flex flex-col justify-between rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 transition-all duration-300 hover:border-[var(--accent-primary)]/40 hover:shadow-lg hover:shadow-[var(--accent-glow-subtle)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[var(--accent-badge-bg)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--accent-primary)] uppercase">
                      {link.category}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400">
                      {link.status || "TRUSTED"}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getFaviconUrl(link.url)}
                        alt=""
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    <h3 className="text-base font-bold text-[var(--text-main)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {link.title}
                    </h3>
                  </div>

                  <p className="mt-1.5 text-xs text-[var(--text-muted)] leading-relaxed">
                    {link.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--surface-border)] flex items-center justify-between text-xs text-[var(--text-subtle)]">
                  <span>{link.category}</span>
                  <span className="text-[var(--accent-primary)] font-semibold group-hover:translate-x-0.5 transition-transform">
                    Visit Site &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>

          {filteredLinks.length === 0 && (
            <div className="mt-12 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-12 text-center text-[var(--text-muted)]">
              No matching utility tools found in this category.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
