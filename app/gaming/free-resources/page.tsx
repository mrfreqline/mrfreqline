"use client";

import { useState, useEffect } from "react";
import Header from "../../Header";
import Footer from "../../Footer";

interface GuideData {
  steps: string[];
  warning?: string;
  youtubeUrl?: string;
}

interface ResourceLink {
  title: string;
  category: string;
  status?: string;
  url: string;
  fileUrl?: string;
  fileName?: string;
  guide?: GuideData;
}

const staticGamingResources: ResourceLink[] = [
  {
    title: "Night Light Launcher",
    category: "Launchers",
    status: "TRUSTED",
    url: "https://github.com/onajlikezz/Nightlight-Launcher/releases",
  },
  {
    title: "Free Download Manager",
    category: "Download Managers",
    url: "https://www.freedownloadmanager.org/",
    guide: {
      steps: [
        "Visit the official website and download the FDM installer for your OS.",
        "Run the installer and complete standard setup.",
        "Install the official Free Download Manager extension in Chrome or Edge.",
        "When clicking any download link in your browser, FDM will catch it automatically.",
        "Set maximum download speed and connection threads in Settings > Downloads for maximum speed.",
      ],
      youtubeUrl: "https://www.youtube.com/results?search_query=how+to+use+free+download+manager",
    },
  },
  {
    title: "Motrix",
    category: "Download Managers",
    url: "https://motrix.app/",
    guide: {
      steps: [
        "Download the latest Motrix installer from the official website or GitHub.",
        "Install Motrix and open the application settings.",
        "Install the Motrix Web Extension in your browser to intercept direct links.",
        "Copy direct file links or torrent magnet links and paste them into Motrix via the '+' button.",
        "Adjust maximum simultaneous downloads and speed limits in Preferences.",
      ],
      youtubeUrl: "https://www.youtube.com/results?search_query=how+to+use+motrix+download+manager",
    },
  },
  {
    title: "JDownloader 2",
    category: "Download Managers",
    url: "https://jdownloader.org/",
    guide: {
      steps: [
        "Download the JDownloader 2 installer from the official page.",
        "Run the setup and uncheck any optional adware/bundled software during installation.",
        "Open JDownloader 2 and enable LinkGrabber in the background.",
        "Copy link URLs from file hosters; JDownloader 2 will parse and capture them automatically.",
        "Click 'Start all Downloads' at the bottom left to begin downloading at high speeds.",
      ],
      youtubeUrl: "https://www.youtube.com/results?search_query=how+to+use+jdownloader+2",
    },
  },
  {
    title: "FitGirl Repacks",
    category: "Repacks & Downloads",
    url: "https://fitgirl-repacks.site",
  },
  {
    title: "Anker Games",
    category: "Repacks & Downloads",
    url: "https://ankergames.net",
  },
  {
    title: "DODI Repacks",
    category: "Repacks & Downloads",
    url: "https://dodi-repacks.site",
  },
];

const categories = ["ALL", "REPACKS & DOWNLOADS", "LAUNCHERS", "DOWNLOAD MANAGERS"];

export default function GamingFreeResources() {
  const [gamingResources, setGamingResources] = useState<ResourceLink[]>(staticGamingResources);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuide, setSelectedGuide] = useState<{
    title: string;
    guide: GuideData;
  } | null>(null);

  // Fetch dynamically added links from your admin API panel
  useEffect(() => {
    async function fetchResources() {
      try {
        const res = await fetch("/api/links?section=gaming");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            // Combine admin panel links with your static defaults (preventing duplicates if titles match)
            setGamingResources((prev) => {
              const fetchedTitles = new Set(data.map((item: ResourceLink) => item.title));
              const uniqueStatic = prev.filter((item) => !fetchedTitles.has(item.title));
              return [...data, ...uniqueStatic];
            });
          }
        }
      } catch (err) {
        console.error("Failed to fetch admin resources:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResources();
  }, []);

  const filteredLinks = gamingResources.filter((link) => {
    const matchesCategory =
      activeCategory === "ALL" ||
      link.category?.toUpperCase() === activeCategory;
    const matchesSearch =
      link.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getFaviconUrl = (siteUrl: string) => {
    try {
      const domain = new URL(siteUrl).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return "";
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#07090e] px-6 pt-28 pb-20 font-sans text-white">
        <div className="mx-auto max-w-6xl">
          {/* Header Title Bar */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Gaming Free Resources
              </h1>
              <p className="mt-2 text-sm text-gray-400 md:text-base">
                Curated gaming tools, download managers, repack sites, and setup guides.
              </p>
            </div>

            {/* Counter Box */}
            <div className="flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-[#111622]/80 px-5 py-3 shadow-inner">
              <span className="text-3xl font-black text-[#00d2ff]">
                {filteredLinks.length}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Links <br /> Found
              </span>
            </div>
          </div>

          <div className="mt-8 border-b border-white/10" />

          {/* Search Box */}
          <div className="mt-8">
            <input
              type="text"
              placeholder="Search gaming resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#10141e] px-6 py-4 text-sm text-white placeholder-gray-500 shadow-md transition-all focus:border-[#00d2ff] focus:outline-none focus:ring-1 focus:ring-[#00d2ff]"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-[#00d2ff] text-black shadow-[0_0_20px_rgba(0,210,255,0.6)]"
                      : "border border-white/10 bg-[#111622] text-gray-300 hover:border-white/25 hover:bg-[#181f30]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Grid Cards */}
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-2">
            {filteredLinks.map((link, index) => (
              <div
                key={`${link.title}-${index}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d121d] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00d2ff]/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md border border-[#00d2ff]/30 bg-[#00d2ff]/10 px-3 py-1 text-[11px] font-bold text-[#00d2ff]">
                      {link.category}
                    </span>
                    {link.status && (
                      <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold tracking-wider text-gray-400">
                        {link.status}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#161c2b] p-1.5">
                      <img
                        src={getFaviconUrl(link.url)}
                        alt={`${link.title} logo`}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                    <h3 className="text-xl font-extrabold text-white transition-colors group-hover:text-[#00d2ff]">
                      {link.title}
                    </h3>
                  </div>

                  <p className="mt-2 text-xs text-gray-400">
                    Direct access to official domain and resources.
                  </p>
                </div>

                {/* Actions Section */}
                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/5 pt-4">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-bold text-[#00d2ff] transition-transform group-hover:translate-x-1"
                  >
                    Visit Website <span className="ml-1.5">▼</span>
                  </a>

                  {link.fileUrl && (
                    <a
                      href={link.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-bold text-[#00d2ff] transition-transform group-hover:translate-x-1"
                    >
                      {link.fileName || "Download File"} <span className="ml-1.5">↓</span>
                    </a>
                  )}

                  {link.guide && (
                    <button
                      onClick={() =>
                        setSelectedGuide({
                          title: link.title,
                          guide: link.guide!,
                        })
                      }
                      className="ml-auto rounded-xl border border-[#00d2ff]/40 bg-[#00d2ff]/10 px-3.5 py-1.5 text-xs font-bold text-[#00d2ff] transition-all hover:bg-[#00d2ff] hover:text-black"
                    >
                      View Setup Guide
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredLinks.length === 0 && (
            <div className="mt-16 rounded-2xl border border-white/5 bg-[#0d121d] py-16 text-center text-gray-400">
              No matching websites found for your search query.
            </div>
          )}
        </div>

        {/* Step-by-Step Guide Modal */}
        {selectedGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-md">
            <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0d121d] p-6 shadow-2xl md:p-8">
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="rounded-md border border-[#00d2ff]/30 bg-[#00d2ff]/10 px-3 py-1 text-[10px] font-bold text-[#00d2ff]">
                    STEP-BY-STEP GUIDE
                  </span>
                  <h2 className="mt-2 text-2xl font-extrabold text-white">
                    {selectedGuide.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-white"
                >
                  Close ✕
                </button>
              </div>

              {/* YouTube Link Button */}
              {selectedGuide.guide.youtubeUrl && (
                <div className="mt-5">
                  <a
                    href={selectedGuide.guide.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-xs font-extrabold text-red-400 transition-all hover:bg-red-500/20"
                  >
                    <span>If you want full tutorial click here</span>
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              )}

              {/* Steps List */}
              <div className="mt-6 space-y-3">
                {selectedGuide.guide.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-[#111622] p-3.5 text-xs text-gray-300"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#00d2ff]/10 font-bold text-[#00d2ff]">
                      {idx + 1}
                    </span>
                    <span className="mt-0.5 leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}