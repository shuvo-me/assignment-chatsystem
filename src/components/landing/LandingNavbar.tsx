"use client";
import { MessageSquare, Moon, Sun } from "lucide-react";
import React from "react";
import { useTheme } from "../../context/ThemeContext";

interface LandingNavbarProps {
  onScrollToSection: (sectionId: string) => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  onScrollToSection,
}) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header
      id="landing-navbar"
      className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-[#0B0E14]/80 border-b border-slate-200/80 dark:border-[#1E293B]/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white dark:border-[#0B0E14]"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
                Chat
                <span className="text-blue-600 dark:text-blue-400">System</span>
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onScrollToSection("section-features")}
            className="px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E293B] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            Core Features
          </button>
          <button
            onClick={() => onScrollToSection("section-architecture")}
            className="px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E293B] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            API & Specs
          </button>
        </nav>

        {/* Right CTA Area */}
        <div className="flex items-center gap-2.5">
          {/* Theme switcher */}
          <button
            id="landing-theme-toggle"
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 dark:hover:bg-[#1E293B]/80 text-slate-700 dark:text-slate-200 transition-all border border-slate-200 dark:border-[#1E293B] cursor-pointer"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
