"use client";

import { useChat } from "@/context/ChatContext";
import { useTheme } from "@/context/ThemeContext";
import {
  ExternalLink,
  LogOut,
  MessageSquarePlus,
  Moon,
  MoreVertical,
  Phone,
  RotateCcw,
  Sun,
  UserCircle,
  Users,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "../common/Avatar";

export const SidebarHeader: React.FC = () => {
  const {
    currentUser,
    setShowNewChatModal,
    setShowNewGroupModal,
    logout,
    resetAllData,
  } = useChat();
  const { theme, toggleTheme, isDark } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-4 border-b border-slate-200 dark:border-[#1E293B] bg-white dark:bg-[#151921] flex items-center justify-between flex-shrink-0 transition-colors">
      {/* Current user badge */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => logout()}
          className="group relative flex-shrink-0 text-left focus:outline-none cursor-pointer"
          title="Click to switch user or sign in"
        >
          <Avatar
            name={currentUser.name}
            avatarUrl={currentUser.avatarUrl}
            status={currentUser.status}
            color={currentUser.color}
            size="md"
          />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm font-semibold text-slate-800 dark:text-[#E2E8F0] truncate">
              {currentUser.name}
            </h1>
            <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Online
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8] truncate flex items-center gap-1">
            <Phone className="w-3 h-3 text-slate-400 dark:text-[#64748B] flex-shrink-0" />
            <span>{currentUser.phone}</span>
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {/* Light / Dark Mode Toggle */}
        <button
          id="btn-toggle-theme"
          onClick={toggleTheme}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-amber-500 dark:text-[#94A3B8] dark:hover:text-amber-300 hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle Theme"
        >
          {isDark ? (
            <Sun className="w-4.5 h-4.5 text-amber-400" />
          ) : (
            <Moon className="w-4.5 h-4.5 text-slate-600" />
          )}
        </button>

        <button
          id="btn-new-direct-chat"
          onClick={() => setShowNewChatModal(true)}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-[#3B82F6] hover:bg-slate-100 dark:hover:bg-[#1E293B] active:bg-slate-200 dark:active:bg-[#1E293B]/80 transition-colors cursor-pointer"
          title="New Direct Conversation"
        >
          <MessageSquarePlus className="w-4.5 h-4.5" />
        </button>

        <button
          id="btn-new-group-chat"
          onClick={() => setShowNewGroupModal(true)}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-[#3B82F6] hover:bg-slate-100 dark:hover:bg-[#1E293B] active:bg-slate-200 dark:active:bg-[#1E293B]/80 transition-colors cursor-pointer"
          title="Create Group Chat"
        >
          <Users className="w-4.5 h-4.5" />
        </button>

        {/* Menu dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            id="btn-sidebar-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-[#E2E8F0] hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
            title="More Options"
          >
            <MoreVertical className="w-4.5 h-4.5" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#151921] rounded-xl shadow-xl border border-slate-200 dark:border-[#1E293B] py-1.5 z-40 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-[#1E293B]">
                <p className="text-[11px] font-semibold text-slate-400 dark:text-[#64748B] uppercase tracking-wider">
                  Signed in as
                </p>
                <p className="text-xs font-semibold text-slate-800 dark:text-[#E2E8F0] truncate">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-[#94A3B8] truncate">
                  {currentUser.phone}
                </p>
              </div>

              <button
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 dark:text-[#E2E8F0] hover:bg-slate-100 dark:hover:bg-[#1E293B] hover:text-[#3B82F6] transition-colors text-left cursor-pointer"
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>Theme: Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-slate-500" />
                    <span>Theme: Dark Mode</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 dark:text-[#E2E8F0] hover:bg-slate-100 dark:hover:bg-[#1E293B] hover:text-[#3B82F6] transition-colors text-left cursor-pointer"
              >
                <UserCircle className="w-4 h-4 text-slate-400 dark:text-[#94A3B8]" />
                <span>Switch Account / Sign In</span>
              </button>

              <a
                href="https://frontend-task-chatapp.onrender.com/docs/"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 dark:text-[#E2E8F0] hover:bg-slate-100 dark:hover:bg-[#1E293B] hover:text-[#3B82F6] transition-colors text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                <ExternalLink className="w-4 h-4 text-slate-400 dark:text-[#94A3B8]" />
                <span>View Swagger API Docs</span>
              </a>

              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Reset all chats and messages back to initial sample state?",
                    )
                  ) {
                    resetAllData();
                    setIsMenuOpen(false);
                  }
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors text-left cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-amber-500" />
                <span>Reset Demo State</span>
              </button>

              <div className="my-1 border-t border-slate-100 dark:border-[#1E293B]" />

              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
