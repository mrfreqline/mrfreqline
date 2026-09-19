"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../Header";
import Footer from "../Footer";

export default function DonatePage() {
  const [copiedLink, setCopiedLink] = useState(false);

  const siteUrl = "https://mrfreqline.com";
  const shareText = "Hey! Check out MrFreqline — 65+ free client-side tools (GPA, PDF, converters) and curated tech vault: https://mrfreqline.com";

  const copyShareLink = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const whatsappCoffeeUrl =
    "https://wa.me/9716280428?text=" +
    encodeURIComponent("Hi MrFreqline! I love your free tools and want to support you with a coffee. Please send me your payment QR code!");

  const whatsappShareUrl =
    "https://api.whatsapp.com/send?text=" + encodeURIComponent(shareText);

  const telegramShareUrl =
    `https://t.me/share/url?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent("Check out MrFreqline - 65+ free client-side tools & curated vault!")}`;

  const facebookShareUrl =
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`;

  const twitterShareUrl =
    `https://twitter.com/intent/tweet?text=${encodeURIComponent("Check out MrFreqline - 65+ free client-side tools & curated vault!")}&url=${encodeURIComponent(siteUrl)}`;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--surface-canvas)] px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20 font-sans text-[var(--text-main)] transition-colors duration-200">
        <div className="mx-auto max-w-4xl space-y-8 sm:space-y-12">
          {/* Header & Hero */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-primary)]/30 bg-[var(--accent-badge-bg)] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[var(--accent-primary)]">
              <span>☕ Support MrFreqline</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-main)] sm:text-5xl md:text-6xl">
              Keep MrFreqline <span className="bg-gradient-to-r from-[var(--accent-primary)] to-cyan-300 bg-clip-text text-transparent">Free &amp; Ad-Free</span>
            </h1>

            <p className="mx-auto max-w-2xl text-xs sm:text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
              All 65+ browser tools and the curated Internet Vault are 100% free, private, and require no signup.
              Your support fuels hosting, domain costs, and new tool development.
            </p>
          </div>

          {/* Primary Action: Buy Us a Coffee via WhatsApp QR */}
          <div className="relative overflow-hidden rounded-3xl border border-[var(--accent-primary)]/40 bg-gradient-to-b from-[var(--accent-primary)]/10 via-[var(--surface-card)] to-[var(--surface-card)] p-5 sm:p-8 md:p-10 shadow-xl shadow-[var(--accent-glow-subtle)] text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-[#25D366]/20 text-[#25D366] shadow-md shadow-[#25D366]/20">
              <svg className="h-8 w-8 sm:h-10 sm:w-10 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.1-.476-.15-.676.15s-.777.979-.953 1.18-.352.226-.653.076a8.249 8.249 0 0 1-2.42-1.493c-.943-.842-1.58-1.884-1.765-2.203-.185-.319-.02-.491.13-.641.136-.135.301-.351.452-.527.15-.175.2-.301.301-.502.1-.201.05-.376-.025-.526-.075-.15-.677-1.632-.928-2.235-.245-.588-.493-.508-.677-.518-.175-.008-.376-.01-.577-.01s-.527.075-.802.376c-.276.301-1.054 1.03-1.054 2.512s1.08 2.912 1.23 3.113c.15.201 2.124 3.243 5.145 4.548.719.311 1.28.497 1.718.636.722.23 1.378.197 1.898.12.58-.087 1.78-.727 2.03-1.43.251-.703.251-1.305.176-1.43-.076-.125-.276-.201-.577-.351zM12.052 0C5.4 0 .004 5.394.004 12.046c0 2.124.553 4.197 1.604 6.02L0 24l6.109-1.602a11.968 11.968 0 0 0 5.943 1.57h.005c6.647 0 12.043-5.395 12.043-12.048C24.095 5.394 18.704 0 12.052 0zm.004 22.043h-.004a9.98 9.98 0 0 1-5.09-1.397l-.365-.216-3.784.992 1.01-3.69-.238-.378a9.99 9.99 0 0 1-1.534-5.312C2.05 6.52 6.53 2.04 12.056 2.04c2.67 0 5.18 1.04 7.07 2.93a9.94 9.94 0 0 1 2.93 7.07c0 5.52-4.48 10.003-10.004 10.003z"/>
              </svg>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black text-[var(--text-main)] sm:text-3xl">
                Buy Us a Coffee (eSewa / Khalti / Bank QR)
              </h2>
              <p className="mx-auto max-w-lg text-xs leading-relaxed text-[var(--text-muted)] sm:text-sm">
                Click below to open our direct WhatsApp chat. We will personally send you our instant payment QR code so you can buy us a coffee, tea, or fuel server maintenance!
              </p>
            </div>

            <div className="pt-2">
              <a
                href={whatsappCoffeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] px-5 py-3.5 sm:px-8 sm:py-4 text-xs sm:text-sm font-black uppercase tracking-wider text-black shadow-lg shadow-[#25D366]/25 transition-all hover:scale-105 hover:bg-[#22c35e] active:scale-95"
              >
                <svg className="h-5 w-5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.1-.476-.15-.676.15s-.777.979-.953 1.18-.352.226-.653.076a8.249 8.249 0 0 1-2.42-1.493c-.943-.842-1.58-1.884-1.765-2.203-.185-.319-.02-.491.13-.641.136-.135.301-.351.452-.527.15-.175.2-.301.301-.502.1-.201.05-.376-.025-.526-.075-.15-.677-1.632-.928-2.235-.245-.588-.493-.508-.677-.518-.175-.008-.376-.01-.577-.01s-.527.075-.802.376c-.276.301-1.054 1.03-1.054 2.512s1.08 2.912 1.23 3.113c.15.201 2.124 3.243 5.145 4.548.719.311 1.28.497 1.718.636.722.23 1.378.197 1.898.12.58-.087 1.78-.727 2.03-1.43.251-.703.251-1.305.176-1.43-.076-.125-.276-.201-.577-.351zM12.052 0C5.4 0 .004 5.394.004 12.046c0 2.124.553 4.197 1.604 6.02L0 24l6.109-1.602a11.968 11.968 0 0 0 5.943 1.57h.005c6.647 0 12.043-5.395 12.043-12.048C24.095 5.394 18.704 0 12.052 0zm.004 22.043h-.004a9.98 9.98 0 0 1-5.09-1.397l-.365-.216-3.784.992 1.01-3.69-.238-.378a9.99 9.99 0 0 1-1.534-5.312C2.05 6.52 6.53 2.04 12.056 2.04c2.67 0 5.18 1.04 7.07 2.93a9.94 9.94 0 0 1 2.93 7.07c0 5.52-4.48 10.003-10.004 10.003z"/>
                </svg>
                <span>Message on WhatsApp for QR &rarr;</span>
              </a>
              <p className="mt-3 text-[11px] text-[var(--text-subtle)]">
                Direct WhatsApp • Scan via eSewa, Khalti, or Any Mobile Banking App
              </p>
            </div>
          </div>

          {/* Secondary Action: Free Ways to Support */}
          <div className="rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-4 sm:p-6 md:p-8 space-y-6">
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <h2 className="text-xl font-black text-[var(--text-main)] sm:text-2xl">
                Support for Free — Spread the Word
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                The greatest support you can give us is helping friends, classmates, and study groups discover MrFreqline.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {/* Share on WhatsApp */}
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4 transition hover:border-[#25D366] hover:bg-[#25D366]/5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366] transition group-hover:scale-105">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.1-.476-.15-.676.15s-.777.979-.953 1.18-.352.226-.653.076a8.249 8.249 0 0 1-2.42-1.493c-.943-.842-1.58-1.884-1.765-2.203-.185-.319-.02-.491.13-.641.136-.135.301-.351.452-.527.15-.175.2-.301.301-.502.1-.201.05-.376-.025-.526-.075-.15-.677-1.632-.928-2.235-.245-.588-.493-.508-.677-.518-.175-.008-.376-.01-.577-.01s-.527.075-.802.376c-.276.301-1.054 1.03-1.054 2.512s1.08 2.912 1.23 3.113c.15.201 2.124 3.243 5.145 4.548.719.311 1.28.497 1.718.636.722.23 1.378.197 1.898.12.58-.087 1.78-.727 2.03-1.43.251-.703.251-1.305.176-1.43-.076-.125-.276-.201-.577-.351zM12.052 0C5.4 0 .004 5.394.004 12.046c0 2.124.553 4.197 1.604 6.02L0 24l6.109-1.602a11.968 11.968 0 0 0 5.943 1.57h.005c6.647 0 12.043-5.395 12.043-12.048C24.095 5.394 18.704 0 12.052 0zm.004 22.043h-.004a9.98 9.98 0 0 1-5.09-1.397l-.365-.216-3.784.992 1.01-3.69-.238-.378a9.99 9.99 0 0 1-1.534-5.312C2.05 6.52 6.53 2.04 12.056 2.04c2.67 0 5.18 1.04 7.07 2.93a9.94 9.94 0 0 1 2.93 7.07c0 5.52-4.48 10.003-10.004 10.003z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--text-main)] group-hover:text-[#25D366] transition">Share on WhatsApp</p>
                  <p className="text-[11px] text-[var(--text-muted)]">Send to study groups &amp; friends</p>
                </div>
              </a>

              {/* Share on Telegram */}
              <a
                href={telegramShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4 transition hover:border-[#229ED9] hover:bg-[#229ED9]/5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#229ED9]/15 text-[#229ED9] transition group-hover:scale-105">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.97 9.28c-.15.65-.53.81-1.08.5l-3-2.21-1.45 1.39c-.16.16-.3.3-.61.3l.21-3.05 5.56-5.02c.24-.22-.05-.34-.38-.13l-6.87 4.33-2.96-.92c-.64-.2-.65-.64.14-.95l11.56-4.46c.54-.2 1.01.12.85.94z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--text-main)] group-hover:text-[#229ED9] transition">Share on Telegram</p>
                  <p className="text-[11px] text-[var(--text-muted)]">Post in tech &amp; student channels</p>
                </div>
              </a>

              {/* Copy Link */}
              <button
                type="button"
                onClick={copyShareLink}
                className="group flex items-center gap-3.5 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4 text-left transition hover:border-[var(--accent-primary)] hover:bg-[var(--accent-badge-bg)]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-badge-bg)] text-[var(--accent-primary)] transition group-hover:scale-105">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--text-main)] group-hover:text-[var(--accent-primary)] transition">
                    {copiedLink ? "✓ Link Copied!" : "Copy Website Link"}
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)]">https://mrfreqline.com</p>
                </div>
              </button>

              {/* Share on Facebook */}
              <a
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4 transition hover:border-[#1877F2] hover:bg-[#1877F2]/5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1877F2]/15 text-[#1877F2] transition group-hover:scale-105">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--text-main)] group-hover:text-[#1877F2] transition">Share on Facebook</p>
                  <p className="text-[11px] text-[var(--text-muted)]">Feed &amp; community groups</p>
                </div>
              </a>

              {/* Share on X / Twitter */}
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4 transition hover:border-[var(--text-main)]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition group-hover:scale-105">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--text-main)] transition">Share on X / Twitter</p>
                  <p className="text-[11px] text-[var(--text-muted)]">Tweet to dev &amp; tech followers</p>
                </div>
              </a>

              {/* Bookmark */}
              <div className="flex items-center gap-3.5 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
                  <span className="text-lg">⭐</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--text-main)]">Bookmark Us</p>
                  <p className="text-[11px] text-[var(--text-muted)]">Press <kbd className="rounded bg-[var(--surface-card)] px-1.5 py-0.5 border border-[var(--surface-border)] text-[10px]">Ctrl + D</kbd> to save</p>
                </div>
              </div>
            </div>
          </div>

          {/* Have a Tool Idea / Direct Message */}
          <div className="rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-4 sm:p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[var(--text-main)]">Have a New Tool Request or Feedback?</h3>
              <p className="text-xs text-[var(--text-muted)] max-w-xl">
                Need a specific calculator, conversion utility, or developer tool added to MrFreqline? Let us know on WhatsApp and we will build it for you for free!
              </p>
            </div>

            <a
              href="https://wa.me/9716280428?text=Hi%20MrFreqline!%20I%20have%20an%20idea%20for%20a%20new%20tool%20or%20feature%3A"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] px-5 py-2.5 text-xs font-bold text-[var(--text-main)] transition hover:border-[#25D366] hover:text-[#25D366]"
            >
              <span>Suggest on WhatsApp</span>
              <span>&rarr;</span>
            </a>
          </div>

          {/* Transparency & Core Principles */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-5 text-center space-y-1">
              <div className="text-2xl mb-2">🛡️</div>
              <h4 className="text-xs font-bold text-[var(--text-main)]">100% Free Forever</h4>
              <p className="text-[11px] text-[var(--text-muted)]">No paywalls, subscriptions, or hidden charges on any tools.</p>
            </div>
            <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-5 text-center space-y-1">
              <div className="text-2xl mb-2">🔒</div>
              <h4 className="text-xs font-bold text-[var(--text-main)]">Private Client-Side</h4>
              <p className="text-[11px] text-[var(--text-muted)]">Your files, calculations, and data never leave your browser.</p>
            </div>
            <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-canvas)] p-5 text-center space-y-1">
              <div className="text-2xl mb-2">🚫</div>
              <h4 className="text-xs font-bold text-[var(--text-main)]">Zero Annoying Ads</h4>
              <p className="text-[11px] text-[var(--text-muted)]">No need to use Brave or ad-blockers either. A clean, focused environment without popups, banner ads, or tracking scripts.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
