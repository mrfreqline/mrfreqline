"use client";

import { useState, useRef, useEffect } from "react";
import { useThemeSettings, THEME_LIST, ThemeDefinition } from "./ThemeProvider";

interface ThemeDropdownProps {
  align?: "left" | "right";
  className?: string;
}

export default function ThemeDropdown({ align = "right", className = "" }: ThemeDropdownProps) {
  const { theme, setTheme, activeThemeDef } = useThemeSettings();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Pill Button matching reference screenshot */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface-card)] px-3.5 py-1.5 text-xs font-semibold text-[var(--text-main)] shadow-sm hover:border-[var(--accent-primary)] transition-all duration-200"
      >
        {/* Palette SVG Icon */}
        <svg
          className="h-4 w-4 shrink-0 text-[var(--accent-primary)]"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 2.21-1.79 4-4 4h-1.5c-.828 0-1.5.672-1.5 1.5 0 .379.141.725.375.992.234.267.375.617.375 1.008 0 1.381-1.119 2.5-2.5 2.5h-.25c-.276 0-.5.224-.5.5v-.5zM6.5 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm3.5-3.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm3.5 3.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
        </svg>

        <span>Theme</span>

        {/* Small chevron */}
        <svg
          className={`h-3 w-3 text-[var(--text-muted)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Floating Dropdown List matching reference screenshot */}
      {isOpen && (
        <div
          className={`absolute ${
            align === "left" ? "left-0" : "right-0"
          } top-full mt-2 z-[100] w-56 max-h-[380px] overflow-y-auto rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-1.5 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150`}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1">
            {THEME_LIST.map((t: ThemeDefinition) => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-colors duration-150 ${
                    isSelected
                      ? "bg-[var(--surface-canvas)] text-[var(--text-main)]"
                      : "text-[var(--text-main)] hover:bg-[var(--surface-card-hover)]"
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-2.5">
                    {/* Circle Color Swatch */}
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full border border-black/20 shadow-sm"
                      style={{ backgroundColor: t.primary }}
                    />
                    <span className="truncate">{t.name}</span>
                  </div>

                  {/* Active Checkmark */}
                  {isSelected && (
                    <svg
                      className="h-4 w-4 shrink-0 text-[var(--accent-primary)]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
