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
                Thanks — your anonymous message has been sent successfully 
              </div>
            )}
          </div>

          <h3 className="mt-12 text-sm font-semibold uppercase tracking-wide text-white/40">Direct Contact</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <a href="mailto:mrfreqline@gmail.com" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#00D2FF]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/15">
                <svg className="h-6 w-6 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <div><p className="text-xs text-white/50">Business Email</p><p className="text-base font-bold text-white">mrfreqline@gmail.com</p></div>
            </a>
            <a href="https://wa.me/9716280428" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#00D2FF]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/15">
                <svg className="h-6 w-6 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.1-.476-.15-.676.15s-.777.979-.953 1.18-.352.226-.653.076a8.249 8.249 0 0 1-2.42-1.493c-.943-.842-1.58-1.884-1.765-2.203-.185-.319-.02-.491.13-.641.136-.135.301-.351.452-.527.15-.175.2-.301.301-.502.1-.201.05-.376-.025-.526-.075-.15-.677-1.632-.928-2.235-.245-.588-.493-.508-.677-.518-.175-.008-.376-.01-.577-.01s-.527.075-.802.376c-.276.301-1.054 1.03-1.054 2.512s1.08 2.912 1.23 3.113c.15.201 2.124 3.243 5.145 4.548.719.311 1.28.497 1.718.636.722.23 1.378.197 1.898.12.58-.087 1.78-.727 2.03-1.43.251-.703.251-1.305.176-1.43-.076-.125-.276-.201-.577-.351zM12.052 0C5.4 0 .004 5.394.004 12.046c0 2.124.553 4.197 1.604 6.02L0 24l6.109-1.602a11.968 11.968 0 0 0 5.943 1.57h.005c6.647 0 12.043-5.395 12.043-12.048C24.095 5.394 18.704 0 12.052 0zm.004 22.043h-.004a9.98 9.98 0 0 1-5.09-1.397l-.365-.216-3.784.992 1.01-3.69-.238-.378a9.99 9.99 0 0 1-1.534-5.312C2.05 6.52 6.53 2.04 12.056 2.04c2.67 0 5.18 1.04 7.07 2.93a9.94 9.94 0 0 1 2.93 7.07c0 5.52-4.48 10.003-10.004 10.003z"/>
                </svg>
              </div>
              <div><p className="text-xs text-white/50">Sponsor / Business</p><p className="text-base font-bold text-white">WhatsApp</p></div>
            </a>
          </div>

          <h3 className="mt-10 text-sm font-semibold uppercase tracking-wide text-white/40">Follow</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            <a href="https://kick.com/mrfreqline" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#00D2FF]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#53FC18]/15">
                <svg className="h-6 w-6 text-[#53FC18]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M1.333 0h8v5.333H12V2.667h2.667V0h8v8H20v2.667h-2.667v2.666H20V16h2.667v8h-8v-2.667H12v-2.666H9.333V24h-8Z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-white/80">Kick</span>
            </a>
            <a href="https://www.instagram.com/mrfreqline" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#00D2FF]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-500/15">
                <svg className="h-6 w-6 text-pink-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-white/80">Instagram</span>
            </a>
            <a href="https://www.tiktok.com/@mrfreqline" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#00D2FF]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.54c0 1.2-.23 2.4-.75 3.47-.53 1.07-1.32 1.98-2.3 2.66-1.01.69-2.18 1.13-3.4 1.28-1.22.15-2.46.04-3.64-.32-1.18-.36-2.26-1-3.18-1.85-.92-.85-1.65-1.91-2.13-3.09-.48-1.18-.68-2.46-.59-3.73.09-1.27.46-2.5 1.1-3.59.64-1.09 1.52-2 2.58-2.66 1.06-.66 2.28-1.05 3.53-1.14 1.25-.09 2.51.1 3.69.57v4.19c-.61-.31-1.29-.48-1.98-.51-.69-.03-1.38.1-2.02.39-.64.29-1.19.74-1.59 1.31-.4.57-.62 1.26-.64 1.96-.02.7.16 1.4.52 1.99.36.59.89 1.06 1.51 1.35.62.29 1.32.38 2.01.27.69-.11 1.33-.42 1.84-.89.51-.47.86-1.09 1-1.77.14-.68.08-1.39-.17-2.05V.02z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-white/80">TikTok</span>
            </a>
            <a href="https://discord.gg/QQCt4cwqn" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#00D2FF]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5865F2]/15">
                <svg className="h-6 w-6 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-white/80">Discord</span>
            </a>
            <a href="https://facebook.com/@mrfreqline" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#00D2FF]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/15">
                <svg className="h-6 w-6 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-white/80">Facebook</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}