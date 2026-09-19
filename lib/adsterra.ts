"use client";

import React from "react";

export const ADSTERRA_SMARTLINK =
  "https://www.profitableratecpmnetwork.com/ybjnyrj1?key=f82d8b3b5fd67bc6585d8b9997ee7e26";

export const MONETIZED_CATEGORIES = [
  "Movies & Shows",
  "Anime",
  "Cartoons",
  "Manga",
  "Live TV & Sports",
  "Apps",
  "Free Softwares",
  "Gaming",
  "Launchers",
  "Repacks & Downloads",
  "Emulators",
  "Download Managers",
];

/**
 * Checks whether a given category is eligible for smartlink ad redirection.
 */
export function isMonetizedCategory(category?: string): boolean {
  if (!category) return false;
  return MONETIZED_CATEGORIES.some(
    (c) => c.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Handles clicking on an external resource link:
 * Opens the Adsterra ad in a new tab while ensuring the visitor
 * successfully reaches their destination website.
 */
export function handleMonetizedClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  targetUrl: string,
  category?: string
) {
  const showAds = process.env.NEXT_PUBLIC_SHOW_ADS !== "false";

  // If ads are disabled or category is not monetized, allow default link navigation
  if (!showAds || !isMonetizedCategory(category)) {
    return;
  }

  // Prevent default only when handling the monetization redirect
  e.preventDefault();

  try {
    // 1. Open Adsterra Smartlink ad in a new tab
    window.open(ADSTERRA_SMARTLINK, "_blank", "noopener,noreferrer");

    // 2. Open destination website in another tab, or navigate current tab if popup blocked
    setTimeout(() => {
      const destinationWindow = window.open(
        targetUrl,
        "_blank",
        "noopener,noreferrer"
      );

      // Fallback: If browser popup blocker suppressed the 2nd popup window,
      // navigate the current tab so the user always reaches their target site
      if (
        !destinationWindow ||
        destinationWindow.closed ||
        typeof destinationWindow.closed === "undefined"
      ) {
        window.location.href = targetUrl;
      }
    }, 50);
  } catch (err) {
    // Fallback in case of unexpected exception
    window.location.href = targetUrl;
  }
}
