"use client";

import { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";

export default function Contact() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "message", message }),
      });

      if (res.ok) {
        setSubmitted(true);
        setMessage("");
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen px-6 pt-24 pb-16 bg-[#07090e] text-white">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-extrabold text-white">Contact</h1>
          <p className="mt-2 text-white/60">
            Ask a question anonymously, or reach out through one of the links below.
          </p>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-bold text-white">Ask Anonymously</h2>
            <p className="mt-1 text-sm text-white/50">No name or email required.</p>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Type your question here..."
                  rows={5}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-[#00D2FF] focus:outline-none focus:ring-1 focus:ring-[#00D2FF]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-[#00D2FF] px-6 py-3 text-sm font-bold text-black transition hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Submit Question"}
                </button>
              </form>
            ) : (
              <div className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-300">
                Thanks — your anonymous message has been sent successfully and is now visible in your Admin Control Center inbox!
              </div>
            )}
          </div>

          <h3 className="mt-12 text-sm font-semibold uppercase tracking-wide text-white/40">Direct Contact</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <a href="mailto:mrfreqline@gmail.com" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#00D2FF]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/15"><svg className="h-6 w-6 text-red-400" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg></div>
              <div><p className="text-xs text-white/50">Business Email</p><p className="text-base font-bold text-white">mrfreqline@gmail.com</p></div>
            </a>
            <a href="https://wa.me/10000000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#00D2FF]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/15"><svg className="h-6 w-6 text-green-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.78 14.02c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.94-.31-1.62-.6-2.85-1.23-4.71-4.09-4.85-4.28-.14-.19-1.16-1.54-1.16-2.94s.72-2.08.98-2.37c.26-.29.56-.36.75-.36.19 0 .38 0 .55.01.17.01.42-.07.65.5.24.58.81 2 .88 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.37-.44.5-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.15.46.13.63-.08.17-.21.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.65.78 1.93.92.29.14.48.21.55.33.07.12.07.68-.17 1.36z"/></svg></div>
              <div><p className="text-xs text-white/50">Sponsor / Business</p><p className="text-base font-bold text-white">WhatsApp</p></div>
            </a>
          </div>

          <h3 className="mt-10 text-sm font-semibold uppercase tracking-wide text-white/40">Follow</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <a href="https://kick.com/mrfreqline" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#00D2FF]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#53FC18]/15"><svg className="h-6 w-6 text-[#53FC18]" viewBox="0 0 24 24" fill="currentColor"><path d="M2 2h6v5h2V5h2V3h2v4h2V3h2v4h2v2h-2v2h2v6h-2v2h-2v2h-2v-2h-2v2H8v-4H6v-2H4v-2H2v2H0V2h2zm4 9h2v2H6v-2z"/></svg></div>
              <span className="text-sm font-medium text-white/80">Kick</span>
            </a>
            <a href="https://www.instagram.com/mrfreqline" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#00D2FF]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-500/15"><svg className="h-6 w-6 text-pink-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.89 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.92 4.92 0 0 1-1.15 1.77 4.92 4.92 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.92 4.92 0 0 1-1.77-1.15 4.92 4.92 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.92 4.92 0 0 1 5.45.53C6.09.28 6.82.11 7.88.06 8.94.01 9.28 0 12 0zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.25A3.25 3.25 0 1 1 12 6.75a3.25 3.25 0 0 1 0 6.5zM17.5 4.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/></svg></div>
              <span className="text-sm font-medium text-white/80">Instagram</span>
            </a>
            <a href="https://www.tiktok.com/@mrfreqline" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#00D2FF]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15"><svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/></svg></div>
              <span className="text-sm font-medium text-white/80">TikTok</span>
            </a>
            <a href="https://www.facebook.com/@mrfreqline" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#00D2FF]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/15"><svg className="h-6 w-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg></div>
              <span className="text-sm font-medium text-white/80">Facebook</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}