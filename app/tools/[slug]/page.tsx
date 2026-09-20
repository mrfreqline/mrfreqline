import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_TOOL_SLUGS, TOOLS_DIRECTORY, ToolId } from "../toolsData";
import ToolPageClient from "./ToolPageClient";
import { ToolSvgIcon } from "@/app/resources/essentials-toolkit/components/LiveToolsWorkbench";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 100% Static Generation for all 36 tools
export async function generateStaticParams() {
  return ALL_TOOL_SLUGS.map((slug) => ({
    slug,
  }));
}

// Dynamic SEO Metadata for every single tool
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS_DIRECTORY[slug as ToolId];

  if (!tool) {
    return {
      title: "Tool Not Found | MrFreqline",
      description: "The requested online tool could not be found.",
    };
  }

  const siteUrl = "https://mrfreqline.vercel.app";
  const toolUrl = `${siteUrl}/tools/${tool.id}`;

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    keywords: tool.keywords,
    alternates: {
      canonical: toolUrl,
    },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: toolUrl,
      siteName: "MrFreqline",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.seoTitle,
      description: tool.seoDescription,
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = TOOLS_DIRECTORY[slug as ToolId];

  if (!tool) {
    notFound();
  }

  const siteUrl = "https://mrfreqline.vercel.app";
  const toolUrl = `${siteUrl}/tools/${tool.id}`;

  // Structured Data (JSON-LD) for Google Rich Snippets
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
    "url": toolUrl,
    "description": tool.seoDescription,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All (Web Browser)",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "creator": {
      "@type": "Organization",
      "name": "MrFreqline",
      "url": siteUrl,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tool.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Essentials Toolkit",
        "item": `${siteUrl}/resources/essentials-toolkit`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.name,
        "item": toolUrl,
      },
    ],
  };

  // Related Tools
  const relatedTools = tool.relatedSlugs
    .map((s) => TOOLS_DIRECTORY[s])
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[var(--surface-canvas)] text-[var(--text-main)]">
      {/* Inject Google SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--text-main)] transition">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/resources/essentials-toolkit?category=${encodeURIComponent(tool.category)}`}
            className="hover:text-[var(--text-main)] transition"
          >
            Essentials Toolkit
          </Link>
          <span>/</span>
          <span className="font-semibold text-[var(--accent-primary)]">{tool.name}</span>
        </nav>

        {/* Client Interactive Tool Application */}
        <ToolPageClient tool={tool} />

        {/* SEO How-To & Knowledge Section */}
        <section className="mt-12 space-y-10 border-t border-[var(--surface-border)] pt-10">
          {/* How to use */}
          <div>
            <h2 className="text-lg font-black tracking-tight text-[var(--text-main)] md:text-xl">
              How to Use {tool.name}
            </h2>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Follow these simple steps to use this free browser-based tool:
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {tool.howToSteps.map((step) => (
                <div
                  key={step.step}
                  className="relative rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-4 sm:p-5 shadow-sm"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent-badge-bg)] text-xs font-black text-[var(--accent-primary)]">
                    {step.step}
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-[var(--text-main)]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-muted)]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h2 className="text-lg font-black tracking-tight text-[var(--text-main)] md:text-xl">
              Key Features & Benefits
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {tool.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-4 shadow-sm"
                >
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs leading-relaxed text-[var(--text-main)]">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Frequently Asked Questions (FAQ) */}
          <div>
            <h2 className="text-lg font-black tracking-tight text-[var(--text-main)] md:text-xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 space-y-3">
              {tool.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-4 sm:p-5 shadow-sm"
                >
                  <h3 className="text-sm font-bold text-[var(--text-main)]">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Tools Internal Linking Grid */}
          {relatedTools.length > 0 && (
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black tracking-tight text-[var(--text-main)] md:text-xl">
                    Related Tools
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    Explore other free in-browser utilities
                  </p>
                </div>

                <Link
                  href="/resources/essentials-toolkit"
                  className="text-xs font-bold text-[var(--accent-primary)] hover:underline"
                >
                  View all tools &rarr;
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {relatedTools.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/tools/${rel.id}`}
                    className="group flex flex-col justify-between rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--accent-primary)] hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent-badge-bg)] text-[var(--accent-primary)]">
                          <ToolSvgIcon id={rel.id} className="h-4 w-4" />
                        </div>
                        <span className="text-[10px] font-bold text-[var(--accent-primary)] uppercase">
                          {rel.category}
                        </span>
                      </div>
                      <h3 className="mt-3 text-xs font-bold text-[var(--text-main)] group-hover:text-[var(--accent-primary)] transition">
                        {rel.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-[11px] text-[var(--text-muted)]">
                        {rel.shortDescription}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[var(--surface-border)] pt-2 text-[10px]">
                      <span className="font-semibold text-[var(--text-subtle)] group-hover:text-[var(--accent-primary)] transition-colors">Dedicated Page &rarr;</span>
                      <span className="font-bold text-[var(--accent-primary)]">Open Tool &rarr;</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Master Hub Promotion CTA */}
          <div className="rounded-3xl border border-[var(--surface-border)] bg-gradient-to-br from-[var(--surface-card)] to-[var(--surface-canvas)] p-5 sm:p-6 md:p-8 text-center shadow-sm">
            <h3 className="text-base font-black text-[var(--text-main)] md:text-lg">
              Explore The Full Essentials Studio
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-xs text-[var(--text-muted)]">
              All 65+ live built-in tools are also accessible inside the unified, all-in-one Essentials Toolkit Studio with keyboard shortcuts, quick switching, and bookmarks.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/resources/essentials-toolkit"
                className="rounded-xl bg-[var(--accent-primary)] px-5 py-2.5 text-xs font-black text-black transition hover:opacity-90 shadow-md"
              >
                Launch All-In-One Studio
              </Link>
              <Link
                href="/resources/internet-vault/utilities"
                className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] px-5 py-2.5 text-xs font-bold text-[var(--text-muted)] transition hover:text-[var(--text-main)] hover:border-[var(--accent-primary)]"
              >
                Browse Curated Web Vault
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
