"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../Header";
import Footer from "../Footer";
import AdsterraBanner from "../components/AdsterraBanner";
import AdsterraPopunder from "../components/AdsterraPopunder";
import {
  useThemeSettings,
  ThemeMode,
  PerformanceGlow,
  ThemeDefinition,
} from "../components/ThemeProvider";

import ThemeDropdown from "../components/ThemeDropdown";

export default function SettingsPage() {
  const {
    mode,
    setMode,
    theme,
    setTheme,
    glow,
    setGlow,
    activeThemeDef,
    restoreDefaults,
  } = useThemeSettings();

  const [restored, setRestored] = useState(false);

  const handleRestore = () => {
    restoreDefaults();
    setRestored(true);
    setTimeout(() => setRestored(false), 2500);
  };

  return (
    <>
      <Header />
      <AdsterraPopunder />

      <main className="min-h-screen bg-[var(--background)] px-6 pt-28 pb-20 font-sans text-[var(--foreground)] transition-colors duration-300">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-main)] md:text-4xl">
              Settings
            </h1>
            <p className="mt-1.5 text-sm text-[var(--text-muted)]">
              Manage your viewing preferences, visual performance, and themes.
            </p>
          </div>

          {/* Adsterra Responsive Banner */}
          <div className="mt-6">
            <AdsterraBanner format="responsive" />
          </div>

          {/* Settings Panel */}
          <div className="relative mt-8 rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-card)] shadow-lg transition-all duration-300">
            {/* MODE */}
            <div className="flex flex-col gap-3 rounded-t-3xl p-5 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--surface-border)]">
              <div>
                <h2 className="text-base font-bold text-[var(--text-main)]">
                  Mode
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Canvas lighting ({mode === "light" ? "Pure White" : mode === "dark" ? "Obsidian Dark" : "Auto System"})
                </p>
              </div>

              {/* 3-Pill Switcher */}
              <div className="flex items-center rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setMode("dark")}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                    mode === "dark"
                      ? "bg-[var(--accent-primary)] text-black shadow-md font-extrabold"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  Dark
                </button>
                <button
                  type="button"
                  onClick={() => setMode("light")}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                    mode === "light"
                      ? "bg-[var(--accent-primary)] text-black shadow-md font-extrabold"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  Light
                </button>
                <button
                  type="button"
                  onClick={() => setMode("system")}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                    mode === "system"
                      ? "bg-[var(--accent-primary)] text-black shadow-md font-extrabold"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  System
                </button>
              </div>
            </div>

            {/* PERFORMANCE */}
            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--surface-border)]">
              <div>
                <h2 className="text-base font-bold text-[var(--text-main)]">
                  Performance
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  GPU glow &amp; animation intensity
                </p>
              </div>

              {/* 3-Pill Switcher */}
              <div className="flex items-center rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setGlow("off")}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                    glow === "off"
                      ? "bg-[var(--accent-primary)] text-black shadow-md font-extrabold"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  Off
                </button>
                <button
                  type="button"
                  onClick={() => setGlow("default")}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                    glow === "default"
                      ? "bg-[var(--accent-primary)] text-black shadow-md font-extrabold"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  Default
                </button>
                <button
                  type="button"
                  onClick={() => setGlow("neon")}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                    glow === "neon"
                      ? "bg-[var(--accent-primary)] text-black shadow-md font-extrabold"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  Glow Neon
                </button>
              </div>
            </div>

            {/* THEME GENERATOR */}
            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--surface-border)]">
              <div>
                <h2 className="text-base font-bold text-[var(--text-main)]">
                  Theme Generator
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Current: <span className="font-semibold text-[var(--accent-primary)]">{activeThemeDef.name}</span>
                </p>
              </div>

              {/* Theme Dropdown Pill */}
              <ThemeDropdown align="right" />
            </div>

            {/* HELP & FAQ */}
            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--surface-border)]">
              <div>
                <h2 className="text-base font-bold text-[var(--text-main)]">
                  Help &amp; FAQ
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Knowledge base, category guide, search tips, and Discord community
                </p>
              </div>

              <Link
                href="/help"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-5 py-2.5 text-xs font-bold text-[var(--text-main)] shadow-sm hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all shrink-0"
              >
                <span>Help &amp; FAQ Page</span>
                <span>↗</span>
              </Link>
            </div>

            {/* RESTORE DEFAULT SETTINGS */}
            <div className="flex flex-col gap-3 rounded-b-3xl bg-[var(--surface-canvas)]/70 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-bold text-[var(--text-main)]">
                  Restore Default Settings
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Revert all appearance to original defaults: Obsidian Dark mode, Cyber Neon theme, and standard glow animation.
                </p>
              </div>

              <button
                type="button"
                onClick={handleRestore}
                className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-2.5 text-xs font-bold shadow-sm transition-all shrink-0 active:scale-95 ${
                  restored
                    ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-black"
                    : "border-[var(--surface-border)] bg-[var(--surface-card)] text-[var(--text-main)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                }`}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {restored ? (
                    <polyline points="20 6 9 17 4 12" />
                  ) : (
                    <>
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                    </>
                  )}
                </svg>
                <span>{restored ? "Restored to Default!" : "Restore Default"}</span>
              </button>
            </div>
          </div>

          {/* Adsterra Native Banner */}
          <div className="mt-10">
            <AdsterraBanner format="native" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
