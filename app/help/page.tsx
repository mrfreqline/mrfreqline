"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../Header";
import Footer from "../Footer";
import AdsterraBanner from "../components/AdsterraBanner";
import AdsterraPopunder from "../components/AdsterraPopunder";

export default function HelpFaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const faqItems = [
    {
      category: "GENERAL NAVIGATION",
      question: "How do I use MrFreqline to find free resources and tools?",
      answer:
        "MrFreqline organizes verified tools into clear, specialized hubs: 'Website' for media streaming, animation, and digital utilities; 'Gaming' for repacks, launchers, performance boosters, and save managers; 'Tech' for step-by-step Windows PC optimization guides; 'Prompts' for artificial intelligence workflows; and 'The Internet Vault' for comprehensive power-user archives spanning books, FLAC audio, torrenting, mobile software, and developer utilities. You can explore through category filter pills on each page or use the live keyword search.",
    },
    {
      category: "SEARCH & DISCOVERY",
      question: "How does search work across the site and The Internet Vault?",
      answer:
        "Each directory page features an instant client-side search bar that filters entries in real time by title, category, and descriptive keywords. For platform-wide searches across all categories, open 'The Internet Vault' (/resources/internet-vault). The Vault master search queries across all 8 specialized archives (Books, Music, Torrenting, Developer, Mobile, Linux/macOS, Graphic Tools, and Video Suites) in a single unified view.",
    },
    {
      category: "MISSING CATEGORIES",
      question: "What should I do if I cannot find a specific tool or category?",
      answer:
        "First, verify that your category filter is set to 'ALL' so no items are hidden. Second, explore 'The Internet Vault' (/resources/internet-vault), which houses over 250+ categorized power-user tools that may not be displayed on top-level pages. Third, search using general keywords (for example, search 'FLAC' instead of an exact website name, or 'editor' instead of a specific software title). If the tool is still unlisted, you can submit a direct request in our Discord server.",
    },
    {
      category: "COMMUNITY & REQUESTS",
      question: "How do I request a new tool or join the official community?",
      answer:
        "We welcome direct suggestions and community submissions. Join our official Discord server at https://discord.gg/QQCt4cwqn to submit links, report broken domains, or discuss software with fellow power users. You can also send feedback directly through the Contact page.",
    },
    {
      category: "TRUST & VERIFICATION",
      question: "What do the status tags (VERIFIED, TRUSTED, ACTIVE) mean?",
      answer:
        "Every resource listed on MrFreqline is audited before publication. 'TRUSTED' signifies an established, long-standing open-source or official project with high industry reputation. 'VERIFIED' indicates our curation team has tested the domain for working links and standard security compliance. 'ACTIVE' represents a functional mirror or directory that is routinely checked for uptime.",
    },
    {
      category: "SECURITY & SAFETY",
      question: "What safety precautions should I take when downloading files or streaming?",
      answer:
        "We strongly advise installing an effective adblocker such as uBlock Origin to prevent deceptive third-party pop-ups and tracking scripts. When downloading third-party applications, scan executable files through VirusTotal prior to execution, and create a Windows System Restore point before applying system or registry optimization tweaks.",
    },
    {
      category: "GUIDES & TUTORIALS",
      question: "How do the embedded Setup Guides work?",
      answer:
        "Select complex tools (such as emulation environments, mod managers, and terminal utilities) include a 'Setup Guide' button on their card. Clicking this button opens a modal window containing numbered instructions, prerequisite checklists, configuration warnings, and curated video walkthrough recommendations.",
    },
  ];

  const filteredFaqs = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <AdsterraPopunder />

      <main className="min-h-screen bg-[var(--background)] px-6 pt-28 pb-20 font-sans text-[var(--foreground)] transition-colors duration-300">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--text-main)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/settings" className="hover:text-[var(--accent-primary)] transition-colors">Settings</Link>
            <span>/</span>
            <span className="text-[var(--accent-primary)] font-semibold">Help & FAQ</span>
          </nav>

          {/* Header Title */}
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold tracking-widest text-[var(--accent-primary)] uppercase">
                Documentation & Knowledge Base
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text-main)] md:text-5xl">
                Help & FAQ
              </h1>
              <p className="mt-2 text-sm text-[var(--text-muted)] md:text-base max-w-2xl">
                Detailed guides on navigation, search syntax, finding unlisted categories, and community safety.
              </p>
            </div>

            <Link
              href="/settings"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] px-4 py-2.5 text-xs font-bold text-[var(--text-main)] shadow-sm hover:border-[var(--accent-primary)] transition-all"
            >
              <span>← Back to Settings</span>
            </Link>
          </div>

          {/* Search Box */}
          <div className="mt-8">
            <input
              type="text"
              placeholder="Search help topics (e.g. 'search', 'categories', 'Discord', 'safety')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] px-6 py-4 text-sm text-[var(--text-main)] placeholder-[var(--text-subtle)] shadow-sm transition-all focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
            />
          </div>

          {/* Adsterra Responsive Banner */}
          <div className="mt-8">
            <AdsterraBanner format="responsive" />
          </div>

          {/* FAQ Accordion List */}
          <div className="mt-8 space-y-4">
            {filteredFaqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] shadow-sm transition-all duration-200 ${
                    isOpen ? "border-[var(--accent-primary)]/50" : "hover:border-[var(--surface-border)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left transition-colors"
                  >
                    <div>
                      <span className="text-[10px] font-extrabold tracking-wider text-[var(--accent-primary)] uppercase">
                        {item.category}
                      </span>
                      <h3 className="mt-1 text-base font-bold text-[var(--text-main)]">
                        {item.question}
                      </h3>
                    </div>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] text-xs text-[var(--text-muted)]">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-[var(--surface-border)] p-5 pt-3">
                      <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-12 text-center text-sm text-[var(--text-muted)]">
                No matching topics found for &quot;{searchQuery}&quot;. Try a broader search term.
              </div>
            )}
          </div>

          {/* Community Discord Banner */}
          <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 sm:flex-row sm:items-center sm:justify-between shadow-sm">
            <div>
              <h3 className="text-base font-bold text-[var(--text-main)]">
                Need more help or want to suggest a new tool?
              </h3>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Our Discord community is active 24/7 for link requests, verification questions, and tech discussions.
              </p>
            </div>
            <a
              href="https://discord.gg/QQCt4cwqn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#5865F2] px-5 py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#4752C4]"
            >
              <span>Join Discord Community</span>
              <span>↗</span>
            </a>
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
