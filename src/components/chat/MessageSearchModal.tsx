"use client";

import { Clock, MessageSquare, Search, X } from "lucide-react";
import React, { useState } from "react";
import { useChat } from "../../context/ChatContext";
import { formatDateWithTime } from "../../utils/dateFormatter";

const MessageSearchModal: React.FC = () => {
  const {
    showSearchModal,
    setShowSearchModal,
    messages,
    activeConversation,
    currentUser,
  } = useChat();

  const [query, setQuery] = useState("");

  if (!showSearchModal || !activeConversation) return null;

  const searchResults = messages.filter((m) => {
    if (!query.trim()) return false;
    return m.text.toLowerCase().includes(query.toLowerCase().trim());
  });

  return (
    <div
      id="modal-message-search"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="w-full max-w-lg bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 transition-colors">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#3B82F6]" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-[#E2E8F0]">
              Search Messages in "{activeConversation.name}"
            </h3>
          </div>
          <button
            onClick={() => setShowSearchModal(false)}
            className="p-1.5 rounded-lg text-slate-400 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-[#E2E8F0] hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input */}
        <div className="p-4 border-b border-slate-200 dark:border-[#1E293B] bg-slate-50/50 dark:bg-[#0B0E14]/30">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 dark:text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type keywords to search..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-[#0B0E14] border border-slate-200 dark:border-[#1E293B] text-xs text-slate-800 dark:text-[#E2E8F0] focus:outline-none focus:border-[#3B82F6]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:text-[#94A3B8] dark:hover:text-[#E2E8F0]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-2 custom-scrollbar">
          {!query.trim() ? (
            <div className="py-8 text-center text-slate-400 dark:text-[#64748B] text-xs">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
              <p>Type above to find specific messages in this conversation</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-8 text-center text-slate-400 dark:text-[#64748B] text-xs">
              <p className="font-semibold text-slate-700 dark:text-[#E2E8F0]">
                No matching messages found
              </p>
              <p className="mt-0.5">Try searching with a different term</p>
            </div>
          ) : (
            searchResults.map((msg) => {
              const isMe = msg.senderId === currentUser.id;
              return (
                <div
                  key={msg.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0E14] border border-slate-200 dark:border-[#1E293B] hover:border-[#3B82F6]/50 transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-semibold text-slate-800 dark:text-[#E2E8F0]">
                      {isMe ? "You" : msg.senderName || "Member"}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-[#94A3B8] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDateWithTime(msg.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-[#CBD5E1] whitespace-pre-wrap">
                    {msg.text}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageSearchModal;
