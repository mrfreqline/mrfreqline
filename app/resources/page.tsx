"use client";

import { useState, useEffect } from "react";

export const dynamic = "force-dynamic";

interface GuideData {
  steps: string[];
  warning?: string;
  youtubeUrl?: string;
}

interface ResourceLink {
  id: string;
  title: string;
  category: string;
  status: string;
  url?: string;
  fileUrl?: string;
  fileName?: string;
  guide?: GuideData;
}

const categoriesList = [
  "ALL",
  "MOVIES & SHOWS",
  "ANIME",
  "MANGA",
  "GAMES",
  "REPACKS & DOWNLOADS",
  "LAUNCHERS",
  "DOWNLOAD MANAGERS",
  "TECH IDEAS",
  "TUTORIALS & STEPS",
  "LIVE TV & SPORTS",
  "APPS & SOFTWARES",
];

export default function ResourcesPage() {
  const [links, setLinks] = useState<ResourceLink[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);

  // Updated download handler that fetches resources as Blobs to force save dialogs
  const handleDownload = async (fileUrl: string, fileName?: string) => {
    try {
      if (fileUrl.startsWith("data:")) {
        const arr = fileUrl.split(",");
        const mimeMatch = arr[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        const blobUrl = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fileName || "download";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      } else {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fileName || fileUrl.split("/").pop() || "downloaded-file";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      }
    } catch (err) {
      console.warn("Direct blob download restricted, falling back to anchor download:", err);
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = fileName || "download";
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  useEffect(() => {
    fetch(`/api/links?t=${Date.now()}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLinks(data);
        }
      })
      .catch((err) => console.error("Failed to load resources:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredLinks =
    selectedCategory === "ALL"
      ? links
      : links.filter(
          (l) => l.category.trim().toUpperCase() === selectedCategory.trim().toUpperCase()
        );

  return (
    <main className="min-h-screen bg-[#07090e] px-6 py-12 font-sans text-white">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="border-b border-white/10 pb-6">
          <h1 className="flex items-center gap-3 text-3xl font-black tracking-tight">
            <span className="h-3 w-3 rounded-full bg-[#00d2ff] shadow-[0_0_10px_#00d2ff]" />
            Resources & Downloads
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Browse verified community links, toolkits, apps, and direct file downloads.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                selectedCategory === cat
                  ? "bg-[#00d2ff] text-black shadow-[0_0_12px_rgba(0,210,255,0.3)]"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mt-12 text-center text-sm font-semibold text-gray-500 animate-pulse">
            Loading resources...
          </div>
        )}

        {/* Resources List */}
        {!loading && (
          <div className="mt-8 grid gap-4">
            {filteredLinks.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 justify-between rounded-2xl border border-white/10 bg-[#0d121d] p-5 transition sm:flex-row sm:items-center hover:border-white/20"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${
                        item.status === "RISK" ||
                        item.status === "SCAM WARNING" ||
                        item.status === "SCAM / AVOID"
                          ? "border-red-500/30 bg-red-500/20 text-red-400"
                          : "border-white/10 bg-white/5 text-gray-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-[#00d2ff]">
                    {item.category}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  {item.url && item.url.trim() !== "" && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-white/10 bg-[#141b2b] px-4 py-2.5 text-xs font-bold text-gray-200 transition hover:border-[#00d2ff] hover:text-[#00d2ff]"
                    >
                      Visit Link ↗
                    </a>
                  )}

                  {item.fileUrl && item.fileUrl.trim() !== "" && (
                    <button
                      onClick={() => handleDownload(item.fileUrl!, item.fileName)}
                      className="flex items-center gap-1.5 rounded-xl bg-[#00d2ff] px-4 py-2.5 text-xs font-extrabold text-black transition shadow-[0_0_10px_rgba(0,210,255,0.2)] hover:opacity-90"
                    >
                      ⬇ Download File {item.fileName ? `(${item.fileName})` : ""}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {filteredLinks.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/10 bg-[#0d121d]/50 py-12 text-center text-sm text-gray-500">
                No resources found for this category.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}