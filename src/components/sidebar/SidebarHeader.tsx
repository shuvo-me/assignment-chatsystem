"use client";

import { useChat } from "@/context/ChatContext";
import { useTheme } from "@/context/ThemeContext";
import { MessageSquarePlus, Moon, Phone, Sun, Users } from "lucide-react";
import React from "react";
import { Avatar } from "../common/Avatar";

export const SidebarHeader: React.FC = () => {
  const { currentUser, setShowNewChatModal, setShowNewGroupModal } = useChat();
  const { toggleTheme, isDark } = useTheme();

  return (
    <div className="p-4 border-b border-slate-200 dark:border-[#1E293B] bg-white dark:bg-[#151921] flex items-center justify-between flex-shrink-0 transition-colors">
      {/* Current user badge */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          className="group relative flex-shrink-0 text-left focus:outline-none cursor-pointer"
          type="button"
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
      </div>
    </div>
  );
};
