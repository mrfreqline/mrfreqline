"use client";

import { useState, useEffect } from "react";

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

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"links" | "news" | "messages">("links");

  const [links, setLinks] = useState<ResourceLink[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [messages, setMessages] = useState<AnonymousMessage[]>([]);

  const [title, setTitle] = useState("");
  const [section, setSection] = useState("essential-toolkit");
  const [category, setCategory] = useState("MOVIES & SHOWS");
  const [status, setStatus] = useState("TRUSTED");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [steps, setSteps] = useState<string[]>([""]);
  const [warning, setWarning] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const [newsTitle, setNewsTitle] = useState("");
  const [newsCategory, setNewsCategory] = useState("SCAM ALERT");
  const [newsContent, setNewsContent] = useState("");
  const [newsImage, setNewsImage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setError("Incorrect password.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
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

      const resNews = await fetch(`/api/links?type=news&t=${Date.now()}`);
      const dataNews = await resNews.json();
      if (Array.isArray(dataNews)) setNews(dataNews);

      const resMessages = await fetch(`/api/links?type=messages&t=${Date.now()}`);
      const dataMessages = await resMessages.json();
      if (Array.isArray(dataMessages)) setMessages(dataMessages);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  const handleAddStep = () => setSteps([...steps, ""]);
  const handleStepChange = (index: number, val: string) => {
    const updated = [...steps];
    updated[index] = val;
    setSteps(updated);
  };
  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let base64File = "";
    if (file) {
      base64File = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    }

    const cleanedSteps = steps.filter((step) => step.trim() !== "");

    const payload = {
      type: "link",
      title,
      section,
      category,
      status,
      url,
      fileUrl: base64File,
      fileName: file ? file.name : "",
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
    } else {
      alert("Failed to save link/file.");
    }
  };

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      type: "news",
      title: newsTitle,
      category: newsCategory,
      content: newsContent,
      imageUrl: newsImage,
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
      fetchData();
    } else {
      alert("Failed to save news.");
    }
  };

  const handleDelete = async (id: string, type: "link" | "news" | "messages") => {
    const query = `?id=${id}&type=${type}`;
    await fetch(`/api/links${query}`, { method: "DELETE" });
    fetchData();
  };

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07090e] px-6">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="mt-1 text-sm text-white/50">MRFREQLINE control center</p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF]"
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
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
              Full control over website links, games, tech tips, files, and anonymous messages.
            </p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500/20"
          >
            Logout
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={() => setActiveTab("links")}
            className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
              activeTab === "links"
                ? "bg-[#00d2ff] text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            Manage Links & Files ({links.length})
          </button>
          <button
            onClick={() => setActiveTab("news")}
            className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
              activeTab === "news"
                ? "bg-[#00d2ff] text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            Manage News & Scam Alerts ({news.length})
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
              activeTab === "messages"
                ? "bg-[#00d2ff] text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            Anonymous Inbox ({messages.length})
          </button>
        </div>

        {activeTab === "links" && (
          <>
            <form
              onSubmit={handleLinkSubmit}
              className="mt-6 rounded-2xl border border-white/10 bg-[#0d121d] p-6 space-y-6"
            >
              <h2 className="text-xl font-bold text-[#00d2ff]">
                + Add New Link or Direct File / Zip Folder
              </h2>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-1">
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Cyberpunk Game..."
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
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Risk / Trust Status Tag</label>
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
                    Target URL Link (Optional if uploading file)
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

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Upload File / Zip Folder (.zip, .rar, .exe, .pdf, .txt)
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full rounded-xl border border-white/10 bg-[#10141e] p-2 text-xs text-gray-400"
                />
              </div>

              <div className="rounded-xl border border-[#00d2ff]/20 bg-[#111622] p-5 space-y-4">
                <h3 className="text-sm font-bold text-[#00d2ff]">
                  🛠 How To Use / Installation Steps (Optional)
                </h3>

                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Step ${idx + 1}: e.g. Disable Antivirus / Extract Zip / Run setup.exe`}
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

                <div className="grid gap-4 md:grid-cols-2 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">
                      Safety Warning Note
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Always run setup as administrator."
                      value={warning}
                      onChange={(e) => setWarning(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#0d121d] px-4 py-2 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">
                      Video / Tutorial URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://youtube.com/..."
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#0d121d] px-4 py-2 text-sm outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#00d2ff] py-3 text-sm font-extrabold text-black transition hover:opacity-90"
              >
                PUBLISH RESOURCE / FILE
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
                      Section: {item.section || "essential-toolkit"} | Category: {item.category} | Status: {item.status}
                      {item.guide && ` | Steps: ${item.guide.steps.length}`}
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

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Image URL (Optional)</label>
                <input
                  type="url"
                  value={newsImage}
                  onChange={(e) => setNewsImage(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#10141e] px-4 py-2.5 text-sm outline-none focus:border-[#00d2ff]"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#00d2ff] py-3 text-sm font-extrabold text-black transition hover:opacity-90"
              >
                PUBLISH ANNOUNCEMENT
              </button>
            </form>

            <div className="mt-10 space-y-3">
              <h2 className="text-xl font-bold">Active News & Scam Alerts</h2>
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
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

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
      </div>
    </div>
  );
}