"use client";

import { useState, useEffect } from "react";

export default function InstallAppBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if user is on iOS Safari
    const isIosDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;

    if (isIosDevice && !isStandalone) {
      const dismissed = localStorage.getItem("dismissed_ios_install");
      if (!dismissed) {
        setIsIOS(true);
        setShowBanner(true);
      }
    }

    // Android / Chrome / Brave install prompt listener
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const dismissed = localStorage.getItem("dismissed_install_banner");
      if (!dismissed) {
        setShowBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem(
      isIOS ? "dismissed_ios_install" : "dismissed_install_banner",
      "true"
    );
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md animate-bounce-short">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#00d2ff]/40 bg-[#0d121d]/95 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="MRFREQLINE App Logo"
            className="h-10 w-10 rounded-xl object-cover border border-white/10"
          />
          <div>
            <h4 className="text-xs font-extrabold text-white">
              Install MRFREQLINE App
            </h4>
            <p className="text-[11px] text-gray-400">
              {isIOS
                ? "Tap Share ⎋ then 'Add to Home Screen' ➕"
                : "Add to home screen for 1-tap fast access!"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isIOS && (
            <button
              onClick={handleInstallClick}
              className="rounded-xl bg-[#00d2ff] px-3.5 py-1.5 text-xs font-extrabold text-black shadow-lg shadow-[#00d2ff]/20 hover:opacity-90"
            >
              Install
            </button>
          )}
          <button
            onClick={handleDismiss}
            className="rounded-lg p-1.5 text-gray-400 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}