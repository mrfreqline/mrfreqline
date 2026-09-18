"use client";

import { useState, useEffect } from "react";

interface PromptItem {
  id: string;
  title: string;
  category: string;
  promptText: string;
  toolUrl?: string;
  steps: string[];
  beforeImageUrl?: string;
  resultImageUrl?: string;
}

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Track which prompt cards are expanded
  const [expandedPrompts, setExpandedPrompts] = useState<Record<string, boolean>>({});
  // Track which guides are open
  const [openGuides, setOpenGuides] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchPrompts();
  }, [filter]);

  const fetchPrompts = async () => {
    setLoading(true);
    try {
      const url =
        filter === "All"
          ? "/api/prompts"
          : `/api/prompts?category=${encodeURIComponent(filter)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (Array.isArray(data)) setPrompts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const togglePromptExpand = (id: string) => {
    setExpandedPrompts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleGuideOpen = (id: string) => {
    setOpenGuides((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="min-h-screen bg-[#07090e] px-4 py-12 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#00d2ff]">
            AI Prompt Vault
          </span>
          <h1 className="mt-2 text-4xl font-extrabold md:text-5xl">
            AI Prompts & Workflows
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-400">
            Copy tested prompts for Image & Video AI models with before/after comparisons and step-by-step instructions.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {["All", "Image Generation", "Video Generation", "Others"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`rounded-full px-5 py-2 text-xs font-bold transition ${
                filter === tab
                  ? "bg-[#00d2ff] text-black shadow-lg shadow-[#00d2ff]/20"
                  : "border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {tab === "All" ? "✨ All Prompts" : tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="mt-16 text-center text-sm text-gray-500">
            Loading prompts...
          </div>
        ) : prompts.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-white/10 bg-[#0d121d] p-12 text-center text-gray-400">
            No prompts found in this category.
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 items-start">
            {prompts.map((item) => {
              const isExpanded = !!expandedPrompts[item.id];
              const isGuideOpen = !!openGuides[item.id];
              const isLongPrompt = item.promptText.length > 180 || item.promptText.includes("\n");

              return (
                <div
                  key={item.id}
                  className="flex flex-col rounded-2xl border border-white/10 bg-[#0d121d] p-6 transition hover:border-[#00d2ff]/40 shadow-xl"
                >
                  {/* Category & Tool Link */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-md border border-[#00d2ff]/30 bg-[#00d2ff]/10 px-2.5 py-1 text-[10px] font-extrabold uppercase text-[#00d2ff]">
                      {item.category}
                    </span>
                    {item.toolUrl && (
                      <a
                        href={item.toolUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-gray-400 hover:text-[#00d2ff] hover:underline"
                      >
                        Open AI Tool ↗
                      </a>
                    )}
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-white">
                    {item.title}
                  </h3>

                  {/* Before & Result Images */}
                  {(item.beforeImageUrl || item.resultImageUrl) && (
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {item.beforeImageUrl && (
                        <div>
                          <p className="mb-1 text-[10px] font-bold uppercase text-gray-400">
                            Reference
                          </p>
                          <a href={item.beforeImageUrl} target="_blank" rel="noreferrer">
                            <img
                              src={item.beforeImageUrl}
                              alt="Before input"
                              className="h-36 w-full rounded-xl border border-white/10 object-cover hover:opacity-90 transition"
                            />
                          </a>
                        </div>
                      )}
                      {item.resultImageUrl && (
                        <div className={!item.beforeImageUrl ? "col-span-2" : ""}>
                          <p className="mb-1 text-[10px] font-bold uppercase text-[#00d2ff]">
                            AI Result
                          </p>
                          <a href={item.resultImageUrl} target="_blank" rel="noreferrer">
                            <img
                              src={item.resultImageUrl}
                              alt="AI Result"
                              className="h-36 w-full rounded-xl border border-[#00d2ff]/40 object-cover hover:opacity-90 transition"
                            />
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Compact Prompt Box with Show More / Show Less */}
                  <div className="relative mt-4 rounded-xl border border-white/10 bg-[#10141e] p-3.5">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                        Prompt
                      </span>
                      <button
                        onClick={() => handleCopy(item.id, item.promptText)}
                        className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                          copiedId === item.id
                            ? "bg-green-500 text-black"
                            : "bg-[#00d2ff] text-black hover:opacity-90"
                        }`}
                      >
                        {copiedId === item.id ? "✓ Copied!" : "📋 Copy Prompt"}
                      </button>
                    </div>

                    <div
                      className={`relative font-mono text-xs text-gray-300 whitespace-pre-wrap select-all ${
                        !isExpanded && isLongPrompt ? "max-h-24 overflow-hidden" : ""
                      }`}
                    >
                      {item.promptText}

                      {/* Gradient fade when collapsed */}
                      {!isExpanded && isLongPrompt && (
                    <div 
                    className="absolute inset-x-0 bottom-0 h-12 pointer-events-none" 
                    style={{ background: 'linear-gradient(to top, #10141e, transparent)' }} 
/>                      )}
                    </div>

                    {/* Show More / Less toggle button */}
                    {isLongPrompt && (
                      <button
                        type="button"
                        onClick={() => togglePromptExpand(item.id)}
                        className="mt-2 text-xs font-bold text-[#00d2ff] hover:underline flex items-center gap-1"
                      >
                        {isExpanded ? "▲ Show Less" : "▼ Show Full Prompt"}
                      </button>
                    )}
                  </div>

                  {/* Collapsible How To Use Accordion */}
                  {item.steps && item.steps.length > 0 && (
                    <div className="mt-4 rounded-xl border border-white/5 bg-[#121722] overflow-hidden">
                      <button
                        type="button"
                        onClick={() => toggleGuideOpen(item.id)}
                        className="w-full flex items-center justify-between p-3 text-xs font-bold text-gray-300 hover:text-white transition"
                      >
                        <span>🛠️ How to use ({item.steps.length} steps)</span>
                        <span className="text-gray-500 text-sm">
                          {isGuideOpen ? "▲" : "▼"}
                        </span>
                      </button>

                      {isGuideOpen && (
                        <div className="px-4 pb-3 pt-1 border-t border-white/5 text-xs text-gray-400">
                          <ol className="list-decimal pl-4 space-y-1.5">
                            {item.steps.map((step, idx) => (
                              <li key={idx} className="leading-relaxed">
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}