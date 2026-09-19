"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ToolSEOItem } from "../toolsData";
import { ToolRenderer, ToolSvgIcon } from "@/app/resources/essentials-toolkit/components/LiveToolsWorkbench";

export default function ToolPageClient({ tool }: { tool: ToolSEOItem }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mrfreqline_fav_tools");
      if (saved) {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr)) {
          setIsFavorite(arr.includes(tool.id));
        }
      }
    } catch {}
  }, [tool.id]);

  const toggleFavorite = () => {
    try {
      const saved = localStorage.getItem("mrfreqline_fav_tools");
      let arr: string[] = saved ? JSON.parse(saved) : [];
      if (arr.includes(tool.id)) {
        arr = arr.filter((id) => id !== tool.id);
        setIsFavorite(false);
      } else {
        arr.push(tool.id);
        setIsFavorite(true);
      }
      localStorage.setItem("mrfreqline_fav_tools", JSON.stringify(arr));
    } catch {}
  };

  const copyUrl = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tool Header & Actions Card */}
      <div className="flex flex-col gap-4 rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-badge-bg)] text-[var(--accent-primary)] shadow-sm">
              <ToolSvgIcon id={tool.id} className="h-7 w-7" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl font-black tracking-tight text-[var(--text-main)] sm:text-2xl md:text-3xl">
                  {tool.name}
                </h1>
                <span className="rounded-md bg-[var(--accent-badge-bg)] px-2.5 py-0.5 text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
                  {tool.category}
                </span>
                {tool.badge && (
                  <span className="rounded-md border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-2 py-0.5 text-xs font-semibold text-[var(--text-muted)]">
                    {tool.badge}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                {tool.shortDescription}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Bookmark button */}
            <button
              type="button"
              onClick={toggleFavorite}
              className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all shadow-sm ${
                isFavorite
                  ? "border-amber-400/40 bg-amber-400/10 text-amber-400"
                  : "border-[var(--surface-border)] bg-[var(--surface-canvas)] text-[var(--text-muted)] hover:border-[var(--accent-primary)] hover:text-[var(--text-main)]"
              }`}
              title="Save to favorites"
            >
              <span>{isFavorite ? "★" : "☆"}</span>
              <span>{isFavorite ? "Bookmarked" : "Bookmark"}</span>
            </button>

            {/* Share / Copy URL button */}
            <button
              type="button"
              onClick={copyUrl}
              className="flex items-center gap-1.5 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-3.5 py-2 text-xs font-bold text-[var(--text-muted)] transition-all hover:border-[var(--accent-primary)] hover:text-[var(--text-main)] shadow-sm"
              title="Copy link to this tool"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>{copiedUrl ? "Copied Link!" : "Share"}</span>
            </button>

            {/* Open in All-in-One Studio */}
            <Link
              href="/resources/essentials-toolkit"
              className="flex items-center gap-1.5 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-3.5 py-2 text-xs font-bold text-[var(--text-muted)] transition-all hover:border-[var(--accent-primary)] hover:text-[var(--text-main)] shadow-sm"
              title="Open full studio with all tools"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>All Tools Hub</span>
            </Link>
          </div>
        </div>

        {/* Security & Privacy Guarantee Badge */}
        <div className="flex flex-wrap items-center gap-3 border-t border-[var(--surface-border)] pt-4 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-emerald-500">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>100% Client-Side Privacy: Runs locally in your browser</span>
          </div>
          <span className="text-[var(--surface-border)]">•</span>
          <span className="text-[var(--text-subtle)]">Zero Server Uploads</span>
          <span className="text-[var(--surface-border)]">•</span>
          <span className="text-[var(--text-subtle)]">Free Forever ($0)</span>
          <span className="text-[var(--surface-border)]">•</span>
          <span className="text-[var(--text-subtle)]">No Registration Needed</span>
        </div>
      </div>

      {/* Interactive Tool Container */}
      <div className="rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 md:p-8 shadow-md">
        <ToolRenderer toolId={tool.id} />
      </div>
    </div>
  );
}
