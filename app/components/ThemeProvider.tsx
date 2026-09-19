"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "dark" | "light" | "system";
export type PerformanceGlow = "off" | "default" | "neon";
export type ThemeColor =
  | "default"
  | "sakura"
  | "stealth"
  | "synthwave"
  | "lavender"
  | "crimson"
  | "matrix"
  | "peach"
  | "glacier"
  | "gold";

export interface ThemeDefinition {
  id: ThemeColor;
  name: string;
  tagline: string;
  primary: string;
  secondary: string;
  accentHex: string;
  glowHex: string;
  badgeBg: string;
  badgeText: string;
}

export const THEME_LIST: ThemeDefinition[] = [
  {
    id: "default",
    name: "Cyber Neon",
    tagline: "Default MrFreqline signature electric cyan",
    primary: "#00D2FF",
    secondary: "#0070F3",
    accentHex: "#00D2FF",
    glowHex: "rgba(0, 210, 255, 0.4)",
    badgeBg: "rgba(0, 210, 255, 0.15)",
    badgeText: "#00D2FF",
  },
  {
    id: "synthwave",
    name: "Purple Dark",
    tagline: "Vibrant neon purple and deep electric violet",
    primary: "#8B5CF6",
    secondary: "#6D28D9",
    accentHex: "#8B5CF6",
    glowHex: "rgba(139, 92, 246, 0.4)",
    badgeBg: "rgba(139, 92, 246, 0.15)",
    badgeText: "#8B5CF6",
  },
  {
    id: "stealth",
    name: "Midnight",
    tagline: "Clean oceanic midnight azure & titanium slate",
    primary: "#38BDF8",
    secondary: "#1E293B",
    accentHex: "#38BDF8",
    glowHex: "rgba(56, 189, 248, 0.4)",
    badgeBg: "rgba(56, 189, 248, 0.15)",
    badgeText: "#38BDF8",
  },
  {
    id: "crimson",
    name: "Crimson",
    tagline: "High-intensity scarlet red and ember forge",
    primary: "#EF4444",
    secondary: "#DC2626",
    accentHex: "#EF4444",
    glowHex: "rgba(239, 68, 68, 0.4)",
    badgeBg: "rgba(239, 68, 68, 0.15)",
    badgeText: "#EF4444",
  },
  {
    id: "sakura",
    name: "Synthwave",
    tagline: "Retro aesthetic neon pink and cyber glow",
    primary: "#EC4899",
    secondary: "#D946EF",
    accentHex: "#EC4899",
    glowHex: "rgba(236, 72, 153, 0.4)",
    badgeBg: "rgba(236, 72, 153, 0.15)",
    badgeText: "#EC4899",
  },
  {
    id: "matrix",
    name: "Terminal",
    tagline: "Matrix hacker terminal neo emerald green",
    primary: "#10B981",
    secondary: "#059669",
    accentHex: "#10B981",
    glowHex: "rgba(16, 185, 129, 0.4)",
    badgeBg: "rgba(16, 185, 129, 0.15)",
    badgeText: "#10B981",
  },
  {
    id: "lavender",
    name: "Lavender",
    tagline: "Dreamy aesthetic lilac and soft periwinkle",
    primary: "#C084FC",
    secondary: "#818CF8",
    accentHex: "#C084FC",
    glowHex: "rgba(192, 132, 252, 0.4)",
    badgeBg: "rgba(192, 132, 252, 0.15)",
    badgeText: "#C084FC",
  },
  {
    id: "peach",
    name: "Peach Glow",
    tagline: "Cozy warm apricot and sweet coral amber",
    primary: "#FB923C",
    secondary: "#F472B6",
    accentHex: "#FB923C",
    glowHex: "rgba(251, 146, 60, 0.4)",
    badgeBg: "rgba(251, 146, 60, 0.15)",
    badgeText: "#FB923C",
  },
  {
    id: "glacier",
    name: "Nordic Glacier",
    tagline: "Crisp Arctic ice and deep oceanic sapphire",
    primary: "#0EA5E9",
    secondary: "#2563EB",
    accentHex: "#0EA5E9",
    glowHex: "rgba(14, 165, 233, 0.4)",
    badgeBg: "rgba(14, 165, 233, 0.15)",
    badgeText: "#0EA5E9",
  },
  {
    id: "gold",
    name: "Golden Sunset",
    tagline: "Cyberpunk warm amber gold and sunset copper",
    primary: "#F59E0B",
    secondary: "#EA580C",
    accentHex: "#F59E0B",
    glowHex: "rgba(245, 158, 11, 0.4)",
    badgeBg: "rgba(245, 158, 11, 0.15)",
    badgeText: "#F59E0B",
  },
];

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
  glow: PerformanceGlow;
  setGlow: (glow: PerformanceGlow) => void;
  activeThemeDef: ThemeDefinition;
  mounted: boolean;
  restoreDefaults: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("dark");
  const [theme, setThemeState] = useState<ThemeColor>("default");
  const [glow, setGlowState] = useState<PerformanceGlow>("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedMode = localStorage.getItem("mrfreqline_mode") as ThemeMode;
      const savedTheme = localStorage.getItem("mrfreqline_theme") as ThemeColor;
      const savedGlow = localStorage.getItem("mrfreqline_glow") as PerformanceGlow;

      if (savedMode === "dark" || savedMode === "light" || savedMode === "system") {
        setModeState(savedMode);
      }
      if (THEME_LIST.some((t) => t.id === savedTheme)) {
        setThemeState(savedTheme);
      }
      if (savedGlow === "off" || savedGlow === "default" || savedGlow === "neon") {
        setGlowState(savedGlow);
      }
    } catch {
      // localStorage may fail in private mode
    }
    setMounted(true);
  }, []);

  const applyAttributes = (
    currentMode: ThemeMode,
    currentTheme: ThemeColor,
    currentGlow: PerformanceGlow
  ) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    // Resolve system mode
    let effectiveMode = currentMode;
    if (currentMode === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      effectiveMode = prefersDark ? "dark" : "light";
    }

    root.setAttribute("data-mode", effectiveMode);
    root.setAttribute("data-theme", currentTheme);
    root.setAttribute("data-glow", currentGlow);
  };

  useEffect(() => {
    applyAttributes(mode, theme, glow);

    if (mode === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyAttributes("system", theme, glow);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [mode, theme, glow]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem("mrfreqline_mode", newMode);
    } catch {}
  };

  const setTheme = (newTheme: ThemeColor) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("mrfreqline_theme", newTheme);
    } catch {}
  };

  const setGlow = (newGlow: PerformanceGlow) => {
    setGlowState(newGlow);
    try {
      localStorage.setItem("mrfreqline_glow", newGlow);
    } catch {}
  };

  const restoreDefaults = () => {
    setModeState("dark");
    setThemeState("default");
    setGlowState("default");
    try {
      localStorage.setItem("mrfreqline_mode", "dark");
      localStorage.setItem("mrfreqline_theme", "default");
      localStorage.setItem("mrfreqline_glow", "default");
    } catch {}
    applyAttributes("dark", "default", "default");
  };

  const activeThemeDef =
    THEME_LIST.find((t) => t.id === theme) || THEME_LIST[0];

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        theme,
        setTheme,
        glow,
        setGlow,
        activeThemeDef,
        mounted,
        restoreDefaults,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeSettings() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeSettings must be used within a ThemeProvider");
  }
  return context;
}
