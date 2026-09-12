"use client";
import { useState, useEffect } from "react";
import AdvertisePopup from "./components/AdvertisePopup";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAdvertiseOpen, setIsAdvertiseOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = window.localStorage.getItem("hasSeenAdvertisePopup");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsAdvertiseOpen(true);
        window.localStorage.setItem("hasSeenAdvertisePopup", "true");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[--background]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="MRFREQLINE logo" className="h-10 w-10 rounded-full object-cover" />
            <span className="text-xl font-bold tracking-wide text-white">MR<span className="text-[--accent-cyan]">FREQLINE</span></span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="/" className="text-sm font-medium text-white/80 transition hover:text-[--accent-cyan]">Home</a>
            <a href="/gaming" className="text-sm font-medium text-white/80 transition hover:text-[--accent-cyan]">Gaming</a>
            <a href="/tech/best-pc-optimization-tools" className="text-sm font-medium text-white/80 transition hover:text-[--accent-cyan]">Tech</a>
            <a href="/resources/best-free-websites" className="text-sm font-medium text-white/80 transition hover:text-[--accent-cyan]">Resources</a>
            <a href="/news" className="text-sm font-medium text-white/80 transition hover:text-[--accent-cyan]">News</a>
            <button type="button" onClick={() => setIsAdvertiseOpen(true)} className="text-sm font-medium text-[--accent-cyan] transition hover:opacity-80">Advertise</button>
            <details className="relative list-none [&::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center gap-1 text-sm font-medium text-white/80 transition hover:text-[--accent-cyan]"><span>Social</span><span className="text-xs">▾</span></summary>
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 z-50">
                <div className="flex gap-3 rounded-2xl border border-white/10 bg-[#0d111a] p-3 shadow-xl">
                  <a href="https://kick.com/mrfreqline" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#53FC18]/15 transition hover:bg-[#53FC18]/25"><svg className="h-5 w-5 text-[#53FC18]" viewBox="0 0 24 24" fill="currentColor"><path d="M2 2h6v5h2V5h2V3h2v4h2V3h2v4h2v2h-2v2h2v6h-2v2h-2v2h-2v-2h-2v2H8v-4H6v-2H4v-2H2v2H0V2h2zm4 9h2v2H6v-2z"/></svg></a>
                  <a href="https://www.instagram.com/mrfreqline" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500/15 transition hover:bg-pink-500/25"><svg className="h-5 w-5 text-pink-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.89 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.92 4.92 0 0 1-1.15 1.77 4.92 4.92 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.92 4.92 0 0 1-1.77-1.15 4.92 4.92 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.92 4.92 0 0 1 5.45.53C6.09.28 6.82.11 7.88.06 8.94.01 9.28 0 12 0zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.25A3.25 3.25 0 1 1 12 6.75a3.25 3.25 0 0 1 0 6.5zM17.5 4.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/></svg></a>
                  <a href="https://www.tiktok.com/@mrfreqline" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"><svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/></svg></a>
                  <a href="https://www.facebook.com/@mrfreqline" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15 transition hover:bg-blue-500/25"><svg className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg></a>
                </div>
              </div>
            </details>
            <a href="/contact" className="text-sm font-medium text-white/80 transition hover:text-[--accent-cyan]">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="/donate" className="hidden rounded-full bg-gradient-to-r from-[#00A3FF] to-[#00D2FF] px-5 py-2 text-sm font-semibold text-black transition hover:opacity-90 sm:block">Donate</a>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 md:hidden" aria-label="Toggle menu">
              {mobileOpen ? (<svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>) : (<svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>)}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-[--background] px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-1">
              <a href="/" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-[--accent-cyan]">Home</a>
              <a href="/gaming" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-[--accent-cyan]">Gaming</a>
              <a href="/tech/best-pc-optimization-tools" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-[--accent-cyan]">Tech</a>
              <a href="/resources/best-free-websites" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-[--accent-cyan]">Resources</a>
              <a href="/news" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-[--accent-cyan]">News</a>
              <button type="button" onClick={() => { setMobileOpen(false); setIsAdvertiseOpen(true); }} className="rounded-lg px-3 py-3 text-left text-sm font-medium text-[--accent-cyan] transition hover:bg-white/5">Advertise</button>
              <a href="/contact" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-[--accent-cyan]">Contact</a>
              <a href="/donate" onClick={() => setMobileOpen(false)} className="mt-2 rounded-lg bg-gradient-to-r from-[#00A3FF] to-[#00D2FF] px-3 py-3 text-center text-sm font-semibold text-black">Donate</a>
            </nav>
            <div className="mt-4 flex justify-center gap-3 border-t border-white/10 pt-4">
              <a href="https://kick.com/mrfreqline" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#53FC18]/15"><svg className="h-5 w-5 text-[#53FC18]" viewBox="0 0 24 24" fill="currentColor"><path d="M2 2h6v5h2V5h2V3h2v4h2V3h2v4h2v2h-2v2h2v6h-2v2h-2v2h-2v-2h-2v2H8v-4H6v-2H4v-2H2v2H0V2h2zm4 9h2v2H6v-2z"/></svg></a>
              <a href="https://www.instagram.com/mrfreqline" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500/15"><svg className="h-5 w-5 text-pink-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.89 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.92 4.92 0 0 1-1.15 1.77 4.92 4.92 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.92 4.92 0 0 1-1.77-1.15 4.92 4.92 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.92 4.92 0 0 1 5.45.53C6.09.28 6.82.11 7.88.06 8.94.01 9.28 0 12 0zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.25A3.25 3.25 0 1 1 12 6.75a3.25 3.25 0 0 1 0 6.5zM17.5 4.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/></svg></a>
              <a href="https://www.tiktok.com/@mrfreqline" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15"><svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/></svg></a>
              <a href="https://www.facebook.com/@mrfreqline" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15"><svg className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg></a>
            </div>
          </div>
        )}
      </header>

      <AdvertisePopup isOpen={isAdvertiseOpen} onClose={() => setIsAdvertiseOpen(false)} />
    </>
  );
}