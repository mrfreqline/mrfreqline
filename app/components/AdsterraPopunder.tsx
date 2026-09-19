"use client";

import Script from "next/script";

interface PopunderProps {
  activeCategory?: string;
}

export default function AdsterraPopunder({ activeCategory }: PopunderProps) {
  const showAds = process.env.NEXT_PUBLIC_SHOW_ADS !== "false";

  if (!showAds) return null;

  // Protect educational/trusted categories from popunders
  if (activeCategory) {
    const cleanCat = activeCategory.trim().toLowerCase();
    if (cleanCat === "free courses" || cleanCat === "student tools") {
      return null;
    }
  }

  return (
    <Script
      src="https://pl31418963.profitableratecpmnetwork.com/6a/8c/23/6a8c23e4776d54c0eb85ff79ec98077b.js"
      strategy="lazyOnload"
    />
  );
}
