"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../Header";
import Footer from "../../Footer";

interface ToolLink {
  title: string;
  category: string;
  status?: string;
  url: string;
  desc?: string;
}

const DEFAULT_TOOLS: ToolLink[] = [
  // PDF Tools
  {
    title: "iLovePDF",
    category: "PDF TOOLS",
    status: "TRUSTED",
    url: "https://www.ilovepdf.com",
    desc: "Merge, split, compress and convert PDF files.",
  },
  {
    title: "Smallpdf",
    category: "PDF TOOLS",
    status: "TRUSTED",
    url: "https://smallpdf.com",
    desc: "Easy online tools for editing and converting PDFs.",
  },
  {
    title: "PDF24 Tools",
    category: "PDF TOOLS",
    status: "TRUSTED",
    url: "https://tools.pdf24.org",
    desc: "Free PDF tools for merging, converting and editing.",
  },
  {
    title: "Sejda PDF",
    category: "PDF TOOLS",
    status: "ACTIVE",
    url: "https://www.sejda.com",
    desc: "Online PDF editor, converter and compressor.",
  },

  // Date & Time Converters
  {
    title: "Timeanddate",
    category: "DATE & TIME CONVERTERS",
    status: "TRUSTED",
    url: "https://www.timeanddate.com",
    desc: "Time zones, dates, calendars and world clocks.",
  },
  {
    title: "Epoch Converter",
    category: "DATE & TIME CONVERTERS",
    status: "ACTIVE",
    url: "https://www.epochconverter.com",
    desc: "Convert Unix timestamps to readable dates.",
  },
  {
    title: "World Time Buddy",
    category: "DATE & TIME CONVERTERS",
    status: "ACTIVE",
    url: "https://www.worldtimebuddy.com",
    desc: "Compare time zones and find suitable meeting times.",
  },

  // Photo Compressors
  {
    title: "TinyPNG",
    category: "PHOTO COMPRESSORS",
    status: "TRUSTED",
    url: "https://tinypng.com",
    desc: "Compress PNG and JPEG images with minimal quality loss.",
  },
  {
    title: "Squoosh",
    category: "PHOTO COMPRESSORS",
    status: "TRUSTED",
    url: "https://squoosh.app",
    desc: "Compress and optimize images directly in your browser.",
  },
  {
    title: "Compress JPEG",
    category: "PHOTO COMPRESSORS",
    status: "ACTIVE",
    url: "https://compressjpeg.com",
    desc: "Quickly reduce JPEG image file sizes.",
  },

  // Photo Resizers
  {
    title: "iLoveIMG",
    category: "PHOTO RESIZERS",
    status: "TRUSTED",
    url: "https://www.iloveimg.com",
    desc: "Resize, crop, compress and edit images online.",
  },
  {
    title: "ResizePixel",
    category: "PHOTO RESIZERS",
    status: "ACTIVE",
    url: "https://www.resizepixel.com",
    desc: "Resize and edit images quickly online.",
  },
  {
    title: "Adobe Express Resize",
    category: "PHOTO RESIZERS",
    status: "TRUSTED",
    url: "https://www.adobe.com/express/feature/image/resize",
    desc: "Resize images for social media and other platforms.",
  },

  // Photo Enhancers
  {
    title: "Upscale.media",
    category: "PHOTO ENHANCERS",
    status: "ACTIVE",
    url: "https://www.upscale.media",
    desc: "Upscale and improve image resolution online.",
  },
  {
    title: "Adobe Express",
    category: "PHOTO ENHANCERS",
    status: "TRUSTED",
    url: "https://www.adobe.com/express",
    desc: "Online tools for improving and editing images.",
  },
  {
    title: "Let's Enhance",
    category: "PHOTO ENHANCERS",
    status: "ACTIVE",
    url: "https://letsenhance.io",
    desc: "AI-powered image enhancement and upscaling.",
  },

  // Background Removers
  {
    title: "Remove.bg",
    category: "BACKGROUND REMOVERS",
    status: "TRUSTED",
    url: "https://www.remove.bg",
    desc: "Automatically remove image backgrounds.",
  },
  {
    title: "Adobe Express Background Remover",
    category: "BACKGROUND REMOVERS",
    status: "TRUSTED",
    url: "https://www.adobe.com/express/feature/image/remove-background",
    desc: "Remove backgrounds from images online.",
  },
  {
    title: "Photoroom",
    category: "BACKGROUND REMOVERS",
    status: "ACTIVE",
    url: "https://www.photoroom.com",
    desc: "Remove backgrounds and create product images.",
  },

  // File Converters
  {
    title: "CloudConvert",
    category: "FILE CONVERTERS",
    status: "TRUSTED",
    url: "https://cloudconvert.com",
    desc: "Convert documents, images, audio, video and more.",
  },
  {
    title: "Convertio",
    category: "FILE CONVERTERS",
    status: "TRUSTED",
    url: "https://convertio.co",
    desc: "Convert files between hundreds of formats.",
  },
  {
    title: "Zamzar",
    category: "FILE CONVERTERS",
    status: "ACTIVE",
    url: "https://www.zamzar.com",
    desc: "Online file conversion for documents, images and media.",
  },

  // Text Tools
  {
    title: "Grammarly",
    category: "TEXT TOOLS",
    status: "TRUSTED",
    url: "https://www.grammarly.com",
    desc: "Check grammar, spelling, clarity and writing style.",
  },
  {
    title: "QuillBot",
    category: "TEXT TOOLS",
    status: "ACTIVE",
    url: "https://quillbot.com",
    desc: "Paraphrase, summarize and improve your writing.",
  },
  {
    title: "WordCounter",
    category: "TEXT TOOLS",
    status: "ACTIVE",
    url: "https://wordcounter.net",
    desc: "Count words, characters and sentences.",
  },

  // QR Tools
  {
    title: "QR Code Generator",
    category: "QR TOOLS",
    status: "TRUSTED",
    url: "https://www.qr-code-generator.com",
    desc: "Create QR codes for websites, text and more.",
  },
  {
    title: "QR Code Monkey",
    category: "QR TOOLS",
    status: "ACTIVE",
    url: "https://www.qrcode-monkey.com",
    desc: "Create customizable QR codes for free.",
  },

  // Unit Converters
  {
    title: "UnitConverters",
    category: "UNIT CONVERTERS",
    status: "TRUSTED",
    url: "https://www.unitconverters.net",
    desc: "Convert length, weight, temperature and other units.",
  },
  {
    title: "Convert Units",
    category: "UNIT CONVERTERS",
    status: "ACTIVE",
    url: "https://www.convertunits.com",
    desc: "Simple online unit conversion calculator.",
  },

  // Currency Converters
  {
    title: "XE Currency",
    category: "CURRENCY CONVERTERS",
    status: "TRUSTED",
    url: "https://www.xe.com",
    desc: "Currency converter and exchange rate information.",
  },
  {
    title: "Wise Currency Converter",
    category: "CURRENCY CONVERTERS",
    status: "TRUSTED",
    url: "https://wise.com/gb/currency-converter",
    desc: "Check currency conversion rates around the world.",
  },
];

// Allowed categories specifically for the Essentials Toolkit page
const ALLOWED_TOOL_CATEGORIES = [
  "PDF TOOLS",
  "DATE & TIME CONVERTERS",
  "PHOTO COMPRESSORS",
  "PHOTO RESIZERS",
  "PHOTO ENHANCERS",
  "BACKGROUND REMOVERS",
  "FILE CONVERTERS",
  "TEXT TOOLS",
  "QR TOOLS",
  "UNIT CONVERTERS",
  "CURRENCY CONVERTERS",
];

const categories = ["ALL", ...ALLOWED_TOOL_CATEGORIES];

export default function EssentialsToolkit() {
  const [tools, setTools] = useState<ToolLink[]>(DEFAULT_TOOLS);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/links")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const formattedApiTools = data
            .map((item: any) => {
              let rawDesc = item.guide || item.desc || "Useful utility tool.";
              if (typeof rawDesc === "object") {
                rawDesc = rawDesc.steps
                  ? Array.isArray(rawDesc.steps)
                    ? rawDesc.steps.join(" ")
                    : String(rawDesc.steps)
                  : JSON.stringify(rawDesc);
              }

              return {
                title: item.title || "Untitled",
                category: (item.category || "").toUpperCase(),
                status: item.status || "ACTIVE",
                url: item.url || item.fileUrl || "#",
                desc: String(rawDesc),
              };
            })
            // STRICTLY filter out categories that don't belong in the Essentials Toolkit (like Manga, Movies & Shows)
            .filter((item) => ALLOWED_TOOL_CATEGORIES.includes(item.category));

          // Combine filtered API items with default tools, avoiding title duplicates
          const combined = [...formattedApiTools];
          DEFAULT_TOOLS.forEach((defTool) => {
            if (
              !combined.some(
                (t) => t.title.toLowerCase() === defTool.title.toLowerCase()
              )
            ) {
              combined.push(defTool);
            }
          });

          setTools(combined);
        }
      })
      .catch((err) => console.error("Failed to fetch toolkit links:", err));
  }, []);

  const filteredTools = tools.filter((tool) => {
    const matchesCategory =
      activeCategory === "ALL" ||
      tool.category?.toUpperCase() === activeCategory;

    const matchesSearch =
      tool.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.desc?.toLowerCase().includes(searchQuery.toLowerCase());

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
          {/* Header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="mb-4 text-sm text-gray-500">
                <Link
                  href="/resources/best-free-websites"
                  className="hover:text-[#00d2ff]"
                >
                  Best Free Websites
                </Link>

                <span className="mx-2">/</span>

                <span>Essentials Toolkit</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Essentials Toolkit
              </h1>

              <p className="mt-2 text-sm text-gray-400 md:text-base">
                Useful online tools for everyday work, study and productivity.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-[#111622]/80 px-5 py-3">
              <span className="text-3xl font-black text-[#00d2ff]">
                {filteredTools.length}
              </span>

              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Tools
                <br />
                Found
              </span>
            </div>
          </div>

          <div className="mt-8 border-b border-white/10" />

          {/* Search */}
          <div className="mt-8">
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#10141e] px-6 py-4 text-sm text-white placeholder-gray-500 shadow-md transition-all focus:border-[#00d2ff] focus:outline-none focus:ring-1 focus:ring-[#00d2ff]"
            />
          </div>

          {/* Categories */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-[#00d2ff] text-black shadow-[0_0_20px_rgba(0,210,255,0.5)]"
                      : "border border-white/10 bg-[#111622] text-gray-300 hover:border-white/25 hover:bg-[#181f30]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Tools */}
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool, index) => (
              <div
                key={`${tool.title}-${index}`}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d121d] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00d2ff]/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-md border border-[#00d2ff]/30 bg-[#00d2ff]/10 px-3 py-1 text-[10px] font-bold text-[#00d2ff]">
                      {tool.category}
                    </span>

                    {tool.status && (
                      <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold tracking-wider text-gray-400">
                        {tool.status}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#161c2b] p-1.5">
                      <img
                        src={getFaviconUrl(tool.url)}
                        alt={`${tool.title} logo`}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>

                    <h2 className="text-lg font-extrabold text-white transition-colors group-hover:text-[#00d2ff]">
                      {tool.title}
                    </h2>
                  </div>

                  <p className="mt-4 min-h-[48px] text-sm leading-6 text-gray-400">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-5 border-t border-white/5 pt-4">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-bold text-[#00d2ff] transition-transform group-hover:translate-x-1"
                  >
                    Visit Website
                    <span className="ml-2">↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredTools.length === 0 && (
            <div className="mt-16 rounded-2xl border border-white/5 bg-[#0d121d] py-16 text-center text-gray-400">
              No matching tools found.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}