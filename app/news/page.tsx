"use client";

import { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";

interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  content: string;
  imageUrl?: string;
}

const typeFilters = ["All", "Scam Alert", "Site Update", "Stream Update"];

export default function News() {
  const [posts, setPosts] = useState<NewsItem[]>([]);
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/links?type=news", {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch news posts:", err);
      });
  }, []);

  // Robust case-insensitive category filtering
  const filteredPosts = posts.filter((p) => {
    if (filter === "All") return true;
    const itemCat = p.category ? p.category.trim().toLowerCase() : "";
    return itemCat === filter.trim().toLowerCase();
  });

  // Media type helpers
  const isImageFile = (url?: string) => {
    if (!url) return false;
    return (
      url.startsWith("data:image/") ||
      Boolean(url.match(/\.(jpeg|jpg|gif|png|webp|svg)($|\?)/i))
    );
  };

  const isVideoFile = (url?: string) => {
    if (!url) return false;
    return (
      url.startsWith("data:video/") ||
      Boolean(url.match(/\.(mp4|webm|ogg|mov|mkv)($|\?)/i))
    );
  };

  const isAudioFile = (url?: string) => {
    if (!url) return false;
    return (
      url.startsWith("data:audio/") ||
      Boolean(url.match(/\.(mp3|wav|ogg|m4a|aac)($|\?)/i))
    );
  };

  // Robust blob downloader for attachments
  const handleDownload = async (fileUrl: string, title: string) => {
    try {
      const sanitizedTitle = title.replace(/[^a-zA-Z0-9_-]/g, "_");
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
        const ext = mime.split("/")[1] || "file";
        a.download = `${sanitizedTitle}.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      } else {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const match = fileUrl.match(/\/([^/?#]+)$/);
        const fallbackName = match ? match[1] : `${sanitizedTitle}_attachment`;

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fallbackName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      }
    } catch (err) {
      console.warn("Blob download failed, opening in new tab:", err);
      window.open(fileUrl, "_blank");
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#07090e] px-6 pb-20 pt-28 font-sans text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-extrabold text-white">News & Announcements</h1>
          <p className="mt-2 text-white/60">
            Site updates, scam alerts, and stream announcements.
          </p>

          {/* Filter Buttons */}
          <div className="mt-6 flex flex-wrap gap-3 relative z-10">
            {typeFilters.map((f) => {
              const isActive = filter.toLowerCase() === f.toLowerCase();
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition cursor-pointer select-none ${
                    isActive
                      ? "bg-[#00D2FF] text-black shadow-[0_0_15px_rgba(0,210,255,0.4)] font-bold"
                      : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>

          {/* News Feed */}
          <div className="mt-10 space-y-6">
            {filteredPosts.map((post) => {
              const fileUrl = post.imageUrl;
              const hasFile = Boolean(fileUrl);
              const isImg = isImageFile(fileUrl);
              const isVid = isVideoFile(fileUrl);
              const isAud = isAudioFile(fileUrl);
              const isScamAlert = post.category?.trim().toLowerCase() === "scam alert";

              return (
                <div
                  key={post.id}
                  className={`rounded-2xl border p-6 transition duration-300 ${
                    isScamAlert
                      ? "border-red-500/30 bg-red-500/10"
                      : "border-white/10 bg-[#0d121d]"
                  }`}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Media Preview Section */}
                    {hasFile && fileUrl && (
                      <div className="shrink-0 w-full md:w-56">
                        {isImg ? (
                          <div
                            onClick={() => setSelectedImage(fileUrl)}
                            className="group relative w-full h-40 overflow-hidden rounded-xl border border-white/10 bg-black/30 cursor-pointer"
                          >
                            <img
                              src={fileUrl}
                              alt={post.title}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold text-white">
                              🔍 Click to View
                            </div>
                          </div>
                        ) : isVid ? (
                          <div className="w-full h-40 rounded-xl overflow-hidden border border-white/10 bg-black">
                            <video
                              src={fileUrl}
                              controls
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : isAud ? (
                          <div className="w-full p-4 rounded-xl border border-white/10 bg-black/40 flex flex-col justify-center gap-2">
                            <span className="text-xs font-bold text-[#00D2FF]">
                              🎵 Audio Attachment
                            </span>
                            <audio src={fileUrl} controls className="w-full h-8" />
                          </div>
                        ) : (
                          <div className="flex h-40 w-full flex-col items-center justify-center rounded-xl border border-white/10 bg-black/40 p-4 text-center">
                            <span className="text-4xl">📁</span>
                            <span className="mt-2 text-xs font-bold text-[#00D2FF]">
                              File Attachment
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Text & Download Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              isScamAlert
                                ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                : "bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/30"
                            }`}
                          >
                            {post.category}
                          </span>
                          <span className="text-xs text-white/40">{post.date}</span>
                        </div>
                        <h3 className="mt-3 text-xl font-bold text-white">{post.title}</h3>
                        <p className="mt-2 text-sm text-white/70 whitespace-pre-line leading-relaxed">
                          {post.content}
                        </p>
                      </div>

                      {/* Download Button for Attached Files */}
                      {hasFile && fileUrl && (
                        <div className="mt-4 pt-3 border-t border-white/5">
                          <button
                            type="button"
                            onClick={() => handleDownload(fileUrl, post.title)}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#00D2FF] px-4 py-2.5 text-xs font-extrabold text-black transition hover:opacity-90 shadow-[0_0_12px_rgba(0,210,255,0.2)] cursor-pointer"
                          >
                            <span>⬇ Download Attachment</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPosts.length === 0 && (
            <div className="mt-12 rounded-2xl border border-white/10 bg-[#0d121d] py-16 text-center text-white/40">
              No news announcements found in this category.
            </div>
          )}
        </div>

        {/* Full Image Modal Viewer */}
        {selectedImage && isImageFile(selectedImage) && (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm cursor-pointer"
          >
            <div
              className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/20 bg-[#0d121d] p-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-3 px-2">
                <button
                  type="button"
                  onClick={() => handleDownload(selectedImage, "news_photo")}
                  className="rounded-lg bg-[#00D2FF] px-3 py-1.5 text-xs font-bold text-black hover:opacity-90 cursor-pointer"
                >
                  ⬇ Download Photo
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-600 transition cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>
              <img
                src={selectedImage}
                alt="Full View"
                className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain mx-auto"
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}