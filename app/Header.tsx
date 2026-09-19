"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
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
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/logo.png" 
              alt="MRFREQLINE logo" 
              className="h-10 w-10 rounded-full object-cover" 
            />
            <span className="text-xl font-bold tracking-wide text-white">
              MR<span className="text-[--accent-cyan]">FREQLINE</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 lg:gap-6 md:flex">
            <Link href="/" className="text-sm font-medium text-white/80 transition hover:text-[--accent-cyan]">Home</Link>
            <Link href="/prompts" className="text-sm font-medium text-white/80 transition hover:text-[--accent-cyan]">Prompts</Link>
            <Link href="/tech/best-pc-optimization-tools" className="text-sm font-medium text-white/80 transition hover:text-[--accent-cyan]">Tech</Link>
            <Link href="/resources/best-free-websites" className="text-sm font-medium text-white/80 transition hover:text-[--accent-cyan]">Website</Link>
            <Link href="/gaming/free-resources" className="text-sm font-medium text-white/80 transition hover:text-[--accent-cyan]">Gaming</Link>
            <Link href="/reviews" className="text-sm font-medium text-white/80 transition hover:text-[--accent-cyan]">Reviews</Link>
            <Link href="/news" className="text-sm font-medium text-white/80 transition hover:text-[--accent-cyan]">News</Link>
            <button type="button" onClick={() => setIsAdvertiseOpen(true)} className="text-sm font-medium text-[--accent-cyan] transition hover:opacity-80">Advertise</button>
            
            <details className="relative list-none [&::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center gap-1 text-sm font-medium text-white/80 transition hover:text-[--accent-cyan]">
                <span>Social</span>
                <span className="text-xs">▾</span>
              </summary>
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 z-50">
                <div className="flex gap-3 rounded-2xl border border-white/10 bg-[#0d111a] p-3 shadow-xl">
                  <a href="https://kick.com/mrfreqline" target="_blank" rel="noopener noreferrer" aria-label="Kick" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#53FC18]/15 transition hover:bg-[#53FC18]/25">
                    <svg className="h-5 w-5 text-[#53FC18]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1.333 0h8v5.333H12V2.667h2.667V0h8v8H20v2.667h-2.667v2.666H20V16h2.667v8h-8v-2.667H12v-2.666H9.333V24h-8Z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/mrfreqline" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500/15 transition hover:bg-pink-500/25">
                    <svg className="h-5 w-5 text-pink-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="https://www.tiktok.com/@mrfreqline" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25">
                    <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.54c0 1.2-.23 2.4-.75 3.47-.53 1.07-1.32 1.98-2.3 2.66-1.01.69-2.18 1.13-3.4 1.28-1.22.15-2.46.04-3.64-.32-1.18-.36-2.26-1-3.18-1.85-.92-.85-1.65-1.91-2.13-3.09-.48-1.18-.68-2.46-.59-3.73.09-1.27.46-2.5 1.1-3.59.64-1.09 1.52-2 2.58-2.66 1.06-.66 2.28-1.05 3.53-1.14 1.25-.09 2.51.1 3.69.57v4.19c-.61-.31-1.29-.48-1.98-.51-.69-.03-1.38.1-2.02.39-.64.29-1.19.74-1.59 1.31-.4.57-.62 1.26-.64 1.96-.02.7.16 1.4.52 1.99.36.59.89 1.06 1.51 1.35.62.29 1.32.38 2.01.27.69-.11 1.33-.42 1.84-.89.51-.47.86-1.09 1-1.77.14-.68.08-1.39-.17-2.05V.02z"/></svg>
                  </a>
                  <a href="https://discord.gg/QQCt4cwqn" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5865F2]/15 transition hover:bg-[#5865F2]/25">
                    <svg className="h-5 w-5 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                  </a>
                  <a href="https://facebook.com/@mrfreqline" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15 transition hover:bg-blue-500/25">
                    <svg className="h-5 w-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                </div>
              </div>
            </details>

            <Link href="/contact" className="text-sm font-medium text-white/80 transition hover:text-[--accent-cyan]">Contact</Link>
            <Link href="/settings" className="text-sm font-medium text-white/80 transition hover:text-[--accent-cyan]">Setting</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/donate" className="hidden rounded-full bg-gradient-to-r from-[#00A3FF] to-[#00D2FF] px-5 py-2 text-sm font-semibold text-black transition hover:opacity-90 sm:block">Donate</Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 md:hidden" aria-label="Toggle menu">
              {mobileOpen ? (<svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>) : (<svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" /></svg>)}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-[--background] px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-1">
              <Link href="/" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-[--accent-cyan]">Home</Link>
              <Link href="/prompts" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-[--accent-cyan]">Prompts</Link>
              <Link href="/tech/best-pc-optimization-tools" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-[--accent-cyan]">Tech</Link>
              <Link href="/resources/best-free-websites" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-[--accent-cyan]">Website</Link>
              <Link href="/gaming/free-resources" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-[--accent-cyan]">Gaming</Link>
              <Link href="/reviews" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-[--accent-cyan]">Reviews</Link>
              <Link href="/news" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-[--accent-cyan]">News</Link>
              <button type="button" onClick={() => { setMobileOpen(false); setIsAdvertiseOpen(true); }} className="rounded-lg px-3 py-3 text-left text-sm font-medium text-[--accent-cyan] transition hover:bg-white/5">Advertise</button>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-[--accent-cyan]">Contact</Link>
              <Link href="/settings" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-[--accent-cyan]">Setting</Link>

              {/* Social Channels in Mobile Drawer */}
              <div className="my-2 border-t border-white/10 pt-3">
                <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-white/40">Social Channels</p>
                <div className="flex items-center gap-2.5 px-3">
                  <a href="https://kick.com/mrfreqline" target="_blank" rel="noopener noreferrer" aria-label="Kick" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#53FC18]/15 transition hover:bg-[#53FC18]/25">
                    <svg className="h-4 w-4 text-[#53FC18]" viewBox="0 0 24 24" fill="currentColor"><path d="M1.333 0h8v5.333H12V2.667h2.667V0h8v8H20v2.667h-2.667v2.666H20V16h2.667v8h-8v-2.667H12v-2.666H9.333V24h-8Z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/mrfreqline" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-500/15 transition hover:bg-pink-500/25">
                    <svg className="h-4 w-4 text-pink-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="https://www.tiktok.com/@mrfreqline" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25">
                    <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.54c0 1.2-.23 2.4-.75 3.47-.53 1.07-1.32 1.98-2.3 2.66-1.01.69-2.18 1.13-3.4 1.28-1.22.15-2.46.04-3.64-.32-1.18-.36-2.26-1-3.18-1.85-.92-.85-1.65-1.91-2.13-3.09-.48-1.18-.68-2.46-.59-3.73.09-1.27.46-2.5 1.1-3.59.64-1.09 1.52-2 2.58-2.66 1.06-.66 2.28-1.05 3.53-1.14 1.25-.09 2.51.1 3.69.57v4.19c-.61-.31-1.29-.48-1.98-.51-.69-.03-1.38.1-2.02.39-.64.29-1.19.74-1.59 1.31-.4.57-.62 1.26-.64 1.96-.02.7.16 1.4.52 1.99.36.59.89 1.06 1.51 1.35.62.29 1.32.38 2.01.27.69-.11 1.33-.42 1.84-.89.51-.47.86-1.09 1-1.77.14-.68.08-1.39-.17-2.05V.02z"/></svg>
                  </a>
                  <a href="https://discord.gg/QQCt4cwqn" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5865F2]/15 transition hover:bg-[#5865F2]/25">
                    <svg className="h-4 w-4 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                  </a>
                  <a href="https://facebook.com/@mrfreqline" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/15 transition hover:bg-blue-500/25">
                    <svg className="h-4 w-4 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                </div>
              </div>
              <Link href="/donate" onClick={() => setMobileOpen(false)} className="mt-2 rounded-lg bg-gradient-to-r from-[#00A3FF] to-[#00D2FF] px-3 py-3 text-center text-sm font-semibold text-black">Donate</Link>
            </nav>
          </div>
        )}
      </header>

      <AdvertisePopup isOpen={isAdvertiseOpen} onClose={() => setIsAdvertiseOpen(false)} />
    </>
  );
}