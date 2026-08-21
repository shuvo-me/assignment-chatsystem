"use client";

import { useChat } from "@/context/ChatContext";
import { useTheme } from "@/context/ThemeContext";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Keyboard,
  Moon,
  RotateCcw,
  Send,
  Sun,
  UserCheck,
} from "lucide-react";
import React, { useState } from "react";

export const SimulatorBar: React.FC = () => {
  const {
    currentUser,
    activeConversation,
    simulateIncomingMessage,
    triggerTypingSimulation,
    logout,
    resetAllData,
  } = useChat();

  const { isDark, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      aria-label="Candidate & Interviewer Quick Controls"
      className="bg-white dark:bg-[#0B0E14] text-slate-800 dark:text-[#E2E8F0] border-b border-slate-200 dark:border-[#1E293B] transition-colors z-30 flex-shrink-0"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-900 dark:text-[#E2E8F0] tracking-wide truncate">
            Part 1 Step 2 — Chat System UI Boilerplate
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#151921] text-[10px] text-slate-600 dark:text-[#94A3B8] border border-slate-200 dark:border-[#1E293B] font-mono">
            Candidate Test Mode
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!isCollapsed && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Theme toggle button */}
              <button
                onClick={toggleTheme}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#151921] hover:bg-slate-200 dark:hover:bg-[#1E293B] text-slate-700 dark:text-[#E2E8F0] font-medium text-xs transition-colors cursor-pointer border border-slate-200 dark:border-[#1E293B]"
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-600" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>

              {activeConversation && (
                <>
                  <button
                    onClick={() => simulateIncomingMessage()}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium text-xs transition-colors cursor-pointer shadow-2xs"
                    title="Simulate incoming message in real time"
                  >
                    <Send className="w-3 h-3" />
                    <span>+ Sim Message</span>
                  </button>

                  <button
                    onClick={triggerTypingSimulation}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-[#151921] hover:bg-slate-200 dark:hover:bg-[#1E293B] text-slate-700 dark:text-[#E2E8F0] font-medium text-xs transition-colors cursor-pointer border border-slate-200 dark:border-[#1E293B]"
                    title="Simulate typing bubble"
                  >
                    <Keyboard className="w-3 h-3 text-slate-500 dark:text-[#94A3B8]" />
                    <span>Sim Typing</span>
                  </button>
                </>
              )}

              <button
                onClick={() => logout()}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-[#151921] hover:bg-slate-200 dark:hover:bg-[#1E293B] text-slate-700 dark:text-[#E2E8F0] font-medium text-xs transition-colors cursor-pointer border border-slate-200 dark:border-[#1E293B]"
                title="Log out or switch user profile on Login Screen"
              >
                <UserCheck className="w-3 h-3 text-[#3B82F6]" />
                <span className="hidden md:inline">
                  Switch Account ({currentUser.name.split(" ")[0]})
                </span>
              </button>

              <a
                href="https://frontend-task-chatapp.onrender.com/docs/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-[#151921] hover:bg-slate-200 dark:hover:bg-[#1E293B] text-[#3B82F6] font-medium text-xs transition-colors border border-slate-200 dark:border-[#1E293B]"
                title="Open assignment Swagger documentation in a new tab"
              >
                <BookOpen className="w-3 h-3" />
                <span className="hidden lg:inline">Swagger API Docs</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </a>

              <button
                onClick={() => {
                  if (window.confirm("Reset state to initial sample data?")) {
                    resetAllData();
                  }
                }}
                className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-[#1E293B] text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-[#E2E8F0] transition-colors cursor-pointer"
                title="Reset sample data"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-[#1E293B] text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-[#E2E8F0] transition-colors cursor-pointer"
            title={isCollapsed ? "Expand toolbar" : "Minimize toolbar"}
          >
            {isCollapsed ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};
