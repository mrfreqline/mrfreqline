"use client";

import Link from "next/link";
import Header from "../../Header";
import Footer from "../../Footer";
import LiveToolsWorkbench, { TOOL_LIST } from "./components/LiveToolsWorkbench";

export default function EssentialsToolkit() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--surface-canvas)] px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20 font-sans text-[var(--text-main)] transition-colors duration-200">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="mb-4 text-sm text-[var(--text-muted)]">
                <Link
                  href="/resources/best-free-websites"
                  className="hover:text-[var(--accent-primary)] transition-colors"
                >
                  Best Free Websites
                </Link>

                <span className="mx-2">/</span>

                <span className="text-[var(--text-main)]">Essentials Toolkit</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text-main)] md:text-5xl">
                Essentials Toolkit
              </h1>

              <p className="mt-2 text-sm text-[var(--text-muted)] md:text-base">
                Useful browser-native tools for everyday work, study, file conversions and calculations. 100% free and client-side private.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] px-5 py-3 shadow-sm">
              <span className="text-3xl font-black text-[var(--accent-primary)]">
                {TOOL_LIST.length}
              </span>

              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Live Tools
                <br />
                Available
              </span>
            </div>
          </div>

          <div className="mt-8 border-b border-[var(--surface-border)]" />

          {/* Live Interactive Tools Workbench */}
          <div className="mt-8">
            <LiveToolsWorkbench />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}