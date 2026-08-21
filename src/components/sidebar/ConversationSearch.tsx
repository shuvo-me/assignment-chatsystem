"use client";

import { useChat } from "@/context/ChatContext";
import { MailCheck, MessageSquare, Search, Users, X } from "lucide-react";
import React from "react";

const ConversationSearch: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    conversations,
  } = useChat();

  const unreadTotal = conversations.reduce(
    (acc, curr) => acc + (curr.unreadCount || 0),
    0,
  );
  const directCount = conversations.filter((c) => c.type === "direct").length;
  const groupCount = conversations.filter((c) => c.type === "group").length;

  return (
    <div className="p-3 space-y-2.5 border-b border-slate-200 dark:border-[#1E293B] bg-white dark:bg-[#151921] flex-shrink-0 transition-colors">
      {/* Search Box */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-[#94A3B8]">
          <Search className="w-4 h-4" />
        </div>
        <input
          id="sidebar-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search messages..."
          className="w-full pl-9 pr-8 py-2 rounded-lg bg-slate-100 dark:bg-[#1E293B] border border-transparent text-xs text-slate-900 dark:text-[#E2E8F0] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all placeholder:text-slate-400 dark:placeholder:text-[#94A3B8]"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-700 dark:text-[#94A3B8] dark:hover:text-[#E2E8F0] cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5">
        <button
          id="filter-tab-all"
          onClick={() => setActiveFilter("all")}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeFilter === "all"
              ? "bg-[#3B82F6] text-white shadow-xs"
              : "bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 dark:hover:bg-[#1E293B]/80 text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#E2E8F0]"
          }`}
        >
          All ({conversations.length})
        </button>

        <button
          id="filter-tab-direct"
          onClick={() => setActiveFilter("direct")}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeFilter === "direct"
              ? "bg-[#3B82F6] text-white shadow-xs"
              : "bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 dark:hover:bg-[#1E293B]/80 text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#E2E8F0]"
          }`}
        >
          <MessageSquare className="w-3 h-3" />
          <span>Direct ({directCount})</span>
        </button>

        <button
          id="filter-tab-group"
          onClick={() => setActiveFilter("group")}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeFilter === "group"
              ? "bg-[#3B82F6] text-white shadow-xs"
              : "bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 dark:hover:bg-[#1E293B]/80 text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#E2E8F0]"
          }`}
        >
          <Users className="w-3 h-3" />
          <span>Groups ({groupCount})</span>
        </button>

        {unreadTotal > 0 && (
          <button
            id="filter-tab-unread"
            onClick={() => setActiveFilter("unread")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === "unread"
                ? "bg-[#3B82F6] text-white shadow-xs"
                : "bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 dark:hover:bg-[#1E293B]/80 text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#E2E8F0]"
            }`}
          >
            <MailCheck className="w-3 h-3" />
            <span>Unread</span>
            <span
              className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeFilter === "unread"
                  ? "bg-white text-[#3B82F6]"
                  : "bg-[#3B82F6] text-white"
              }`}
            >
              {unreadTotal}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ConversationSearch;
