"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface GuideData {
  steps: string[];
  warning?: string;
  youtubeUrl?: string;
}

interface ResourceLink {
  id?: string;
  title: string;
  section?: string;
  category: string;
  status: string;
  url: string;
  fileUrl?: string;
  fileName?: string;
  guide?: GuideData;
}

interface NewsItem {
  id?: string;
  title: string;
  category: string;
  content: string;
  imageUrl?: string;
  date?: string;
}

interface AnonymousMessage {
  id: string;
  message: string;
  timestamp: string;
}

interface PromptItem {
  id?: string;
  title: string;
  category: string;
  promptText: string;
  toolUrl?: string;
  steps: string[];
  beforeImageUrl?: string;
  resultImageUrl?: string;
}

interface ReviewItem {
  id: string;
  name: string;
  phone?: string;
  rating: number;
  comment: string;
  created_at: string;
}

const adminSections = [
  { label: "Essential Toolkit", value: "essential-toolkit" },
  { label: "Gaming Resources", value: "gaming" },
  { label: "Best Free Websites", value: "best-free-websites" },
  { label: "Tech Optimizations", value: "tech" },
];

const adminCategories = [
  "MOVIES & SHOWS",
  "ANIME",
  "MANGA",
  "LIVE TV & SPORTS",
  "APPS",
  "FREE SOFTWARES",
  "DOWNLOAD MANAGERS",
  "FREE COURSES",
  "STUDENT TOOLS",
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
  "FPS & GAMING",
  "RAM OPTIMIZATION",
  "SSD & DISK CLEANING",
  "WINDOWS DEBLOAT",
  "GPU DRIVERS & SETTINGS",
  "NETWORK & LATENCY",
  "SYSTEM STABILITY",
  "UTILITY TOOLS",
  "REPACKS & DOWNLOADS",
  "LAUNCHERS",
];

// Helper to upload files directly to Supabase Storage bucket
async function uploadToSupabase(file: File): Promise<string> {
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const filePath = `${Date.now()}_${cleanName}`;

  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Storage upload error:", uploadError);
    throw new Error(uploadError.message);
  }

  const { data } = supabase.storage.from("media").getPublicUrl(filePath);
  return data.publicUrl;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"links" | "prompts" | "news" | "messages" | "reviews">("links");

  const [links, setLinks] = useState<ResourceLink[]>([]);
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [messages, setMessages] = useState<AnonymousMessage[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  // Links Form State
  const [title, setTitle] = useState("");
  const [section, setSection] = useState("essential-toolkit");
  const [category, setCategory] = useState("MOVIES & SHOWS");
  const [status, setStatus] = useState("TRUSTED");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [steps, setSteps] = useState<string[]>([""]);
  const [warning, setWarning] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isUploadingLink, setIsUploadingLink] = useState(false);

  // News Form State
  const [newsTitle, setNewsTitle] = useState("");
  const [newsCategory, setNewsCategory] = useState("SCAM ALERT");
  const [newsContent, setNewsContent] = useState("");
  const [newsImage, setNewsImage] = useState("");
  const [newsMediaFile, setNewsMediaFile] = useState<File | null>(null);
  const [isUploadingNews, setIsUploadingNews] = useState(false);

  // Prompts Form State
  const [promptTitle, setPromptTitle] = useState("");
  const [promptCategory, setPromptCategory] = useState("Image Generation");
  const [promptText, setPromptText] = useState("");
  const [promptToolUrl, setPromptToolUrl] = useState("");
  const [promptSteps, setPromptSteps] = useState<string[]>([""]);
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [beforeUrl, setBeforeUrl] = useState("");
  const [resultFile, setResultFile] = useState<File | null>(null);
  const [resultUrl, setResultUrl] = useState("");
  const [isUploadingPrompt, setIsUploadingPrompt] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err: any) {
      setError("Network error: " + err.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, activeTab]);

  const fetchData = async () => {
    try {
      const resLinks = await fetch(`/api/links?t=${Date.now()}`);
      const dataLinks = await resLinks.json();
      if (Array.isArray(dataLinks)) setLinks(dataLinks);

      const resPrompts = await fetch(`/api/prompts?t=${Date.now()}`);
      const dataPrompts = await resPrompts.json();
      if (Array.isArray(dataPrompts)) setPrompts(dataPrompts);

      const resNews = await fetch(`/api/links?type=news&t=${Date.now()}`);
      const dataNews = await resNews.json();
      if (Array.isArray(dataNews)) setNews(dataNews);

      const resMessages = await fetch(`/api/links?type=messages&t=${Date.now()}`);
      const dataMessages = await resMessages.json();
      if (Array.isArray(dataMessages)) setMessages(dataMessages);

      // Fetch Reviews
      const resReviews = await fetch(`/api/reviews?t=${Date.now()}`);
      const dataReviews = await resReviews.json();
      if (dataReviews && Array.isArray(dataReviews.reviews)) {
        setReviews(dataReviews.reviews);
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  // Steps Handlers for Links
  const handleAddStep = () => setSteps([...steps, ""]);
  const handleStepChange = (index: number, val: string) => {
    const updated = [...steps];
    updated[index] = val;
    setSteps(updated);
  };
  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  // Steps Handlers for Prompts
  const handleAddPromptStep = () => setPromptSteps([...promptSteps, ""]);
  const handlePromptStepChange = (index: number, val: string) => {
    const updated = [...promptSteps];
    updated[index] = val;
    setPromptSteps(updated);
  };
  const handleRemovePromptStep = (index: number) => {
    setPromptSteps(promptSteps.filter((_, i) => i !== index));
  };

  const handleLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploadingLink(true);

    try {
      let uploadedFileUrl = "";
      let uploadedFileName = "";

      if (file) {
        uploadedFileName = file.name;
        uploadedFileUrl = await uploadToSupabase(file);
      }

      const cleanedSteps = steps.filter((step) => step.trim() !== "");

      const payload = {
        type: "link",
        title,
        section,
        category,
        status,
        url: url.trim(),
        fileUrl: uploadedFileUrl,
        fileName: uploadedFileName,
        ...(cleanedSteps.length > 0 && {
          guide: {
            steps: cleanedSteps,
            warning: warning.trim() || undefined,
            youtubeUrl: youtubeUrl.trim() || undefined,
          },
        }),
      };

      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setTitle("");
        setUrl("");
        setFile(null);
        setSection("essential-toolkit");
        setCategory("MOVIES & SHOWS");
        setSteps([""]);
        setWarning("");
        setYoutubeUrl("");
        fetchData();
        alert("Resource / File published successfully!");
      } else {
        const errorData = await res.json();
        alert("Failed to save: " + (errorData.error || "Server error"));
      }
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setIsUploadingLink(false);
    }
  };

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploadingNews(true);

    try {
      let mediaUrl = newsImage.trim();

      if (newsMediaFile) {
        mediaUrl = await uploadToSupabase(newsMediaFile);
      }

      const payload = {
        type: "news",
        title: newsTitle,
        category: newsCategory,
        content: newsContent,
        imageUrl: mediaUrl,
      };

      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setNewsTitle("");
        setNewsContent("");
        setNewsImage("");
        setNewsMediaFile(null);
        fetchData();
        alert("Announcement published successfully!");
      } else {
        const errorData = await res.json();
        alert("Failed to save: " + (errorData.error || "Server error"));
      }
    } catch (err: any) {
      alert("Media upload failed: " + err.message);
    } finally {
      setIsUploadingNews(false);
    }
  };

  const handlePromptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploadingPrompt(true);

    try {
      let finalBeforeUrl = beforeUrl.trim();
      let finalResultUrl = resultUrl.trim();

      if (beforeFile) {
        finalBeforeUrl = await uploadToSupabase(beforeFile);
      }
      if (resultFile) {
        finalResultUrl = await uploadToSupabase(resultFile);
      }

      const cleanedSteps = promptSteps.filter((s) => s.trim() !== "");

      const payload = {
        title: promptTitle,
        category: promptCategory,
        promptText: promptText.trim(),
        toolUrl: promptToolUrl.trim(),
        steps: cleanedSteps,
        beforeImageUrl: finalBeforeUrl,
        resultImageUrl: finalResultUrl,
      };

      const res = await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setPromptTitle("");
        setPromptText("");
        setPromptToolUrl("");
        setPromptSteps([""]);
        setBeforeFile(null);
        setBeforeUrl("");
        setResultFile(null);
        setResultUrl("");
        fetchData();
        alert("AI Prompt published successfully!");
      } else {
        const errData = await res.json();
        alert("Failed to save prompt: " + (errData.error || "Server error"));
      }
    } catch (err: any) {
      alert("Prompt upload failed: " + err.message);
    } finally {
      setIsUploadingPrompt(false);
    }
  };

  const handleDelete = async (id: string, type: "link" | "news" | "messages" | "prompt" | "review") => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    if (type === "prompt") {
      await fetch(`/api/prompts?id=${id}`, { method: "DELETE" });
    } else if (type === "review") {
      await fetch(`/api/reviews?id=${id}`, { method: "DELETE" });
    } else {
      const query = `?id=${id}&type=${type}`;
      await fetch(`/api/links${query}`, { method: "DELETE" });
    }
    fetchData();
  };

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07090e] px-6">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="mt-1 text-sm text-white/50">MRFREQLINE control center</p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                autoComplete="off"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF] pr-16"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-xs font-semibold text-gray-400 hover:text-[#00D2FF]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error && <p className="text-xs text-red-400 leading-relaxed">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#00D2FF] py-3 text-sm font-bold text-black transition hover:opacity-90"
            >
              Log In
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] p-8 font-sans text-white">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold">MRFREQLINE Control Center</h1>
            <p className="mt-1 text-sm text-gray-400">
              Full control over website links, AI prompts, news, inbox, and community reviews.
            </p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500/20"
          >
            Logout
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab("links")}
            className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
              activeTab === "links"
                ? "bg-[#00d2ff] text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            Manage Links ({links.length})
          </button>
          <button
            onClick={() => setActiveTab("prompts")}
            className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
              activeTab === "prompts"
                ? "bg-[#00d2ff] text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            Manage Prompts ({prompts.length})
          </button>
          <button
            onClick={() => setActiveTab("news")}
            className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
              activeTab === "news"
                ? "bg-[#00d2ff] text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            Manage News ({news.length})
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
              activeTab === "messages"
                ? "bg-[#00d2ff] text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            Inbox ({messages.length})
          </button>
          {/* New Reviews Tab */}
          <button
            onClick={() => setActiveTab("reviews")}
            className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
              activeTab === "reviews"
                ? "bg-[#00d2ff] text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            ⭐ Reviews ({reviews.length})
          </button>
        </div>

        {/* 1. MANAGE LINKS TAB */}
        {activeTab === "links" && (
          <>
            <form
              onSubmit={handleLinkSubmit}
              className="mt-6 rounded-2xl border border-white/10 bg-[#0d121d] p-6 space-y-6"
            >
              <h2 className="text-xl font-bold text-[#00d2ff]">
                + Add New Link or Direct File / Media
              </h2>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Optimizer Tool, Game Config..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#10141e] px-4 py-2.5 text-sm outline-none focus:border-[#00d2ff]"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Website Section</label>
                  <select
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#10141e] px-4 py-2.5 text-sm outline-none focus:border-[#00d2ff] text-white"
                  >
                    {adminSections.map((sec) => (
                      <option key={sec.value} value={sec.value}>
                        {sec.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#10141e] px-4 py-2.5 text-sm outline-none focus:border-[#00d2ff] text-white"
                  >
                    {adminCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Status Tag</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#10141e] px-4 py-2.5 text-sm outline-none focus:border-[#00d2ff] text-white"
                  >
                    <option value="TRUSTED">TRUSTED</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="NEW">NEW</option>
                    <option value="RISK">RISK</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">
                    Target URL Link (or External Drive/Mega Link)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#10141e] px-4 py-2.5 text-sm outline-none focus:border-[#00d2ff]"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#10141e] p-4">
                <label className="block text-xs font-semibold text-[#00d2ff] mb-1">
                  📁 Or Upload Direct File / Zip to Cloud Storage
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full rounded-xl border border-white/10 bg-[#0d121d] p-2.5 text-xs text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-[#00d2ff] file:px-4 file:py-1.5 file:text-xs file:font-bold file:text-black file:cursor-pointer"
                />
                {file && (
                  <p className="mt-2 text-xs text-green-400">
                    Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-[#00d2ff]/20 bg-[#111622] p-5 space-y-4">
                <h3 className="text-sm font-bold text-[#00d2ff]">
                  🛠 How To Use / Installation Steps (Optional)
                </h3>
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Step ${idx + 1}`}
                      value={step}
                      onChange={(e) => handleStepChange(idx, e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#0d121d] px-4 py-2 text-sm outline-none focus:border-[#00d2ff]"
                    />
                    {steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(idx)}
                        className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 text-xs text-red-400"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddStep}
                  className="text-xs font-bold text-[#00d2ff] hover:underline"
                >
                  + Add Another Step
                </button>
              </div>

              <button
                type="submit"
                disabled={isUploadingLink}
                className="w-full rounded-xl bg-[#00d2ff] py-3 text-sm font-extrabold text-black transition hover:opacity-90 disabled:opacity-50"
              >
                {isUploadingLink ? "UPLOADING FILE & SAVING..." : "PUBLISH RESOURCE / FILE"}
              </button>
            </form>

            <div className="mt-10 space-y-3">
              <h2 className="text-xl font-bold">Active Managed Resources & Files</h2>
              {links.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0d121d] p-4"
                >
                  <div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-xs text-gray-400">
                      Section: {item.section || "essential-toolkit"} | Category: {item.category}
                      {item.fileUrl && (
                        <a href={item.fileUrl} target="_blank" rel="noreferrer" className="ml-2 text-[#00d2ff] underline">
                          [View File]
                        </a>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => item.id && handleDelete(item.id, "link")}
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 2. MANAGE PROMPTS TAB */}
        {activeTab === "prompts" && (
          <>
            <form
              onSubmit={handlePromptSubmit}
              className="mt-6 rounded-2xl border border-white/10 bg-[#0d121d] p-6 space-y-6"
            >
              <h2 className="text-xl font-bold text-[#00d2ff]">
                + Add New AI Prompt
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Prompt Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Ultra-Realistic Cyberpunk Portrait"
                    value={promptTitle}
                    onChange={(e) => setPromptTitle(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#10141e] px-4 py-2.5 text-sm outline-none focus:border-[#00d2ff]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Category</label>
                  <select
                    value={promptCategory}
                    onChange={(e) => setPromptCategory(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#10141e] px-4 py-2.5 text-sm outline-none focus:border-[#00d2ff] text-white"
                  >
                    <option value="Image Generation">🎨 Image Generation</option>
                    <option value="Video Generation">🎥 Video Generation</option>
                    <option value="Others">⚡ Others / LLMs</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  AI Prompt Text (Required)
                </label>
                <textarea
                  rows={4}
                  placeholder="Paste the exact prompt text here..."
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#10141e] p-3.5 font-mono text-sm outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  AI Tool / Website URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://midjourney.com, https://klingai.com..."
                  value={promptToolUrl}
                  onChange={(e) => setPromptToolUrl(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#10141e] px-4 py-2.5 text-sm outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-[#10141e] p-4 space-y-2">
                  <label className="block text-xs font-semibold text-gray-300">
                    Input / Before Image (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBeforeFile(e.target.files?.[0] || null)}
                    className="w-full text-xs text-gray-400 file:mr-2 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-xs file:text-white"
                  />
                  <input
                    type="url"
                    placeholder="Or paste image URL"
                    value={beforeUrl}
                    onChange={(e) => setBeforeUrl(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#0d121d] px-3 py-1.5 text-xs outline-none focus:border-[#00d2ff]"
                  />
                </div>

                <div className="rounded-xl border border-[#00d2ff]/30 bg-[#10141e] p-4 space-y-2">
                  <label className="block text-xs font-semibold text-[#00d2ff]">
                    Result / Output Image (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => setResultFile(e.target.files?.[0] || null)}
                    className="w-full text-xs text-gray-400 file:mr-2 file:rounded-md file:border-0 file:bg-[#00d2ff] file:px-3 file:py-1 file:text-xs file:font-bold file:text-black"
                  />
                  <input
                    type="url"
                    placeholder="Or paste result image/video URL"
                    value={resultUrl}
                    onChange={(e) => setResultUrl(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#0d121d] px-3 py-1.5 text-xs outline-none focus:border-[#00d2ff]"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-[#00d2ff]/20 bg-[#111622] p-5 space-y-3">
                <h3 className="text-sm font-bold text-[#00d2ff]">
                  📝 How to use this prompt (Optional Steps)
                </h3>
                {promptSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Step ${idx + 1}: e.g. Open Midjourney / Set aspect ratio to --ar 16:9`}
                      value={step}
                      onChange={(e) => handlePromptStepChange(idx, e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#0d121d] px-4 py-2 text-sm outline-none focus:border-[#00d2ff]"
                    />
                    {promptSteps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePromptStep(idx)}
                        className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 text-xs text-red-400"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddPromptStep}
                  className="text-xs font-bold text-[#00d2ff] hover:underline"
                >
                  + Add Another Step
                </button>
              </div>

              <button
                type="submit"
                disabled={isUploadingPrompt}
                className="w-full rounded-xl bg-[#00d2ff] py-3 text-sm font-extrabold text-black transition hover:opacity-90 disabled:opacity-50"
              >
                {isUploadingPrompt ? "UPLOADING MEDIA & SAVING PROMPT..." : "PUBLISH AI PROMPT"}
              </button>
            </form>

            <div className="mt-10 space-y-3">
              <h2 className="text-xl font-bold">Active Prompts ({prompts.length})</h2>
              {prompts.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0d121d] p-4"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-xs text-gray-400">
                      Category: <span className="text-[#00d2ff]">{item.category}</span>
                      {item.resultImageUrl && " | Has Result Image"}
                      {item.beforeImageUrl && " | Has Before Image"}
                    </p>
                    <p className="line-clamp-1 font-mono text-xs text-gray-500 max-w-xl">
                      {item.promptText}
                    </p>
                  </div>
                  <button
                    onClick={() => item.id && handleDelete(item.id, "prompt")}
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 3. MANAGE NEWS TAB */}
        {activeTab === "news" && (
          <>
            <form
              onSubmit={handleNewsSubmit}
              className="mt-6 rounded-2xl border border-white/10 bg-[#0d121d] p-6 space-y-4"
            >
              <h2 className="text-xl font-bold text-[#00d2ff]">
                + Add News / Scam Alert
              </h2>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Title</label>
                <input
                  type="text"
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  required
                  placeholder="e.g. Major Phishing Warning..."
                  className="w-full rounded-xl border border-white/10 bg-[#10141e] px-4 py-2.5 text-sm outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Category</label>
                <select
                  value={newsCategory}
                  onChange={(e) => setNewsCategory(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#10141e] px-4 py-2.5 text-sm outline-none focus:border-[#00d2ff] text-white"
                >
                  <option value="SCAM ALERT">SCAM ALERT</option>
                  <option value="UPDATE">UPDATE</option>
                  <option value="ANNOUNCEMENT">ANNOUNCEMENT</option>
                  <option value="WARNING">WARNING</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Content</label>
                <textarea
                  rows={4}
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#10141e] p-3 text-sm outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-[#10141e] p-4 space-y-3">
                <label className="block text-xs font-semibold text-[#00d2ff]">
                  Attach Image or Video
                </label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => setNewsMediaFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-gray-300"
                />
                <input
                  type="url"
                  placeholder="Or paste media URL"
                  value={newsImage}
                  onChange={(e) => setNewsImage(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0d121d] px-4 py-2 text-xs outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isUploadingNews}
                className="w-full rounded-xl bg-[#00d2ff] py-3 text-sm font-extrabold text-black transition hover:opacity-90 disabled:opacity-50"
              >
                {isUploadingNews ? "PUBLISHING..." : "PUBLISH ANNOUNCEMENT"}
              </button>
            </form>

            <div className="mt-10 space-y-3">
              <h2 className="text-xl font-bold">Active News</h2>
              {news.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0d121d] p-4"
                >
                  <div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-xs text-gray-400">{item.category} | {item.date}</p>
                  </div>
                  <button
                    onClick={() => item.id && handleDelete(item.id, "news")}
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-400"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 4. INBOX TAB */}
        {activeTab === "messages" && (
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-bold text-[#00d2ff]">Incoming Anonymous Messages</h2>
            {messages.length === 0 ? (
              <p className="text-sm text-gray-400">No anonymous messages yet.</p>
            ) : (
              messages.map((item) => (
                <div key={item.id} className="rounded-xl border border-white/10 bg-[#0d121d] p-5 space-y-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Received: {item.timestamp}</span>
                    <button
                      onClick={() => handleDelete(item.id, "messages")}
                      className="text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-sm font-medium text-white">{item.message}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* 5. NEW: MANAGE REVIEWS TAB */}
        {activeTab === "reviews" && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#00d2ff]">
                  Community Reviews & Suggestions ({reviews.length})
                </h2>
                <p className="text-xs text-gray-400">
                  Real-time ratings, comments, and private phone numbers submitted by users.
                </p>
              </div>
              <button
                onClick={fetchData}
                className="rounded-xl border border-white/10 bg-[#10141e] px-4 py-2 text-xs font-bold text-[#00d2ff] hover:bg-[#151b29]"
              >
                ↻ Refresh Reviews
              </button>
            </div>

            {reviews.length === 0 ? (
              <p className="text-sm text-gray-400 py-8 text-center">
                No user reviews submitted yet.
              </p>
            ) : (
              <div className="space-y-4">
                {reviews.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#0d121d] p-5"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-bold text-white text-base">
                          {item.name || "Anonymous User"}
                        </span>
                        <span className="text-yellow-400 text-sm tracking-wider">
                          {"★".repeat(item.rating)}
                          <span className="text-gray-600">
                            {"★".repeat(5 - item.rating)}
                          </span>
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Phone / WhatsApp (Visible only to Admin) */}
                      {item.phone && (
                        <div className="inline-flex items-center gap-2 rounded-lg bg-[#00d2ff]/10 px-2.5 py-1 text-xs font-mono text-[#00d2ff]">
                          <span>📞 WhatsApp / Phone:</span>
                          <a
                            href={`https://wa.me/${item.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-white"
                          >
                            {item.phone}
                          </a>
                        </div>
                      )}

                      <p className="text-sm text-gray-200 max-w-2xl leading-relaxed">
                        {item.comment}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDelete(item.id, "review")}
                      className="self-start md:self-center shrink-0 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500/20"
                    >
                      🗑️ Delete Review
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}