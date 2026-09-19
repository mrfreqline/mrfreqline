import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ALL_TOOL_SLUGS, TOOLS_DIRECTORY, ToolCategory } from "./toolsData";
import { ToolSvgIcon } from "@/app/resources/essentials-toolkit/components/LiveToolsWorkbench";

export const metadata: Metadata = {
  title: "Free Online Tools & In-Browser Utilities (36+ Tools) | MrFreqline",
  description:
    "Explore 36+ free, client-side web tools. Fast PDF tools, image compressors, converters, PC bottleneck calculators, Nepali Preeti typing, and security utilities with 100% privacy.",
  keywords: [
    "free online tools",
    "browser utilities",
    "pdf tools online",
    "image compressor",
    "pc bottleneck calculator",
    "preeti to unicode",
    "file hash checker",
    "qr generator online",
  ],
  alternates: {
    canonical: "https://mrfreqline.vercel.app/tools",
  },
  openGraph: {
    title: "Free Online Tools & In-Browser Utilities (36+ Tools) | MrFreqline",
    description:
      "Explore 36+ free, client-side web tools. Fast PDF tools, image compressors, converters, PC bottleneck calculators, Nepali Preeti typing, and security utilities with 100% privacy.",
    url: "https://mrfreqline.vercel.app/tools",
    siteName: "MrFreqline",
    type: "website",
  },
};

const CATEGORIES: ToolCategory[] = [
  "Academic & Education",
  "Finance & Money",
  "Health & Fitness",
  "PC & Gaming",
  "PDF & Media",
  "Security & Privacy",
  "Time & Date",
  "Text & Dev",
];

export default function ToolsIndexPage() {
  const allTools = ALL_TOOL_SLUGS.map((slug) => TOOLS_DIRECTORY[slug]);

  return (
    <div className="min-h-screen bg-[var(--surface-canvas)] text-[var(--text-main)]">
      <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--text-main)] transition">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-[var(--accent-primary)]">Tools Directory</span>
        </nav>

        {/* Hero Header */}
        <div className="rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 md:p-10 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-block rounded-md bg-[var(--accent-badge-bg)] px-3 py-1 text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
                {ALL_TOOL_SLUGS.length} Live Browser Utilities
              </span>
              <h1 className="mt-3 text-2xl font-black tracking-tight text-[var(--text-main)] sm:text-3xl md:text-4xl">
                Free Online Tools & Utilities
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                Instant in-browser utilities for productivity, hardware diagnostics, file handling, and design. 100% client-side privacy with zero server uploads and no account needed.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/resources/essentials-toolkit"
                className="flex items-center gap-2 rounded-xl bg-[var(--accent-primary)] px-5 py-3 text-xs font-black text-black shadow-md transition hover:opacity-90"
              >
                <span>Launch All-In-One Studio</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[var(--surface-border)] pt-4 text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <span>●</span> 100% Client-Side Privacy
            </span>
            <span>•</span>
            <span>Zero Data Stored</span>
            <span>•</span>
            <span>Completely Free ($0)</span>
            <span>•</span>
            <span>Indexed for Fast Google Access</span>
          </div>
        </div>

        {/* Categories & Tool Cards */}
        <div className="mt-12 space-y-12">
          {CATEGORIES.map((cat) => {
            const catTools = allTools.filter((t) => t.category === cat);
            if (catTools.length === 0) return null;

            return (
              <section key={cat} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-3">
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-lg font-black tracking-tight text-[var(--text-main)] md:text-xl">
                      {cat}
                    </h2>
                    <span className="rounded-full bg-[var(--surface-card)] border border-[var(--surface-border)] px-2.5 py-0.5 text-xs font-bold text-[var(--text-muted)]">
                      {catTools.length}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {catTools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.id}`}
                      className="group flex flex-col justify-between rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 transition-all hover:-translate-y-1 hover:border-[var(--accent-primary)] hover:shadow-md"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-badge-bg)] text-[var(--accent-primary)] transition group-hover:scale-105">
                            <ToolSvgIcon id={tool.id} className="h-5 w-5" />
                          </div>
                          {tool.badge && (
                            <span className="rounded-md border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-2 py-0.5 text-[10px] font-bold text-[var(--text-muted)]">
                              {tool.badge}
                            </span>
                          )}
                        </div>

                        <h3 className="mt-3.5 text-sm font-bold text-[var(--text-main)] group-hover:text-[var(--accent-primary)] transition">
                          {tool.name}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-muted)]">
                          {tool.shortDescription}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-[var(--surface-border)] pt-3 text-xs">
                        <span className="text-[11px] font-semibold text-[var(--text-subtle)] group-hover:text-[var(--accent-primary)] transition-colors">
                          Dedicated Page &rarr;
                        </span>
                        <span className="flex items-center gap-1 font-bold text-[var(--accent-primary)] group-hover:translate-x-1 transition-transform">
                          <span>Open Tool</span>
                          <span>&rarr;</span>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
