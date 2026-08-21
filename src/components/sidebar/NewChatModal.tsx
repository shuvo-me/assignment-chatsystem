"use client";

import { useChat } from "@/context/ChatContext";
import { userService } from "@/services/user.service";
import { MessageSquarePlus, Search, UserPlus, X } from "lucide-react";
import React, { useState } from "react";
import { Avatar } from "../common/Avatar";

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewChatModal: React.FC<NewChatModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentUser, createDirectChat, conversations, selectConversation } =
    useChat();
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [startingWith, setStartingWith] = useState<string | null>(null);

  const searchQuery_trimmed = searchQuery.trim();
  const searchResults = userService.useSearchUsers(searchQuery_trimmed);

  if (!isOpen) return null;

  const handleStartWithUser = async (userId: string) => {
    try {
      setStartingWith(userId);
      setError(null);

      const existing = conversations.find(
        (c) =>
          c.type === "direct" && c.participantIds.includes(userId),
      );

      if (existing) {
        await selectConversation(existing.id);
      } else {
        await createDirectChat(userId);
      }
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to start conversation",
      );
    } finally {
      setStartingWith(null);
    }
  };

  return (
    <div
      id="modal-new-chat"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="w-full max-w-md bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 transition-colors">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#3B82F6]/15 flex items-center justify-center text-[#3B82F6]">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-[#E2E8F0]">
                New Direct Message
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
                Search by name or number to start a chat
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-[#E2E8F0] hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Search input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 dark:text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users by name or phone..."
              autoFocus
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0B0E14] border border-slate-200 dark:border-[#1E293B] text-xs text-slate-800 dark:text-[#E2E8F0] focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          {/* Results */}
          <div className="max-h-64 overflow-y-auto space-y-1 custom-scrollbar pr-1">
            {!searchQuery_trimmed && (
              <p className="py-6 text-center text-xs text-slate-400 dark:text-[#64748B]">
                Type at least 2 characters to search
              </p>
            )}

            {searchQuery_trimmed && searchResults.isPending && (
              <p className="py-6 text-center text-xs text-slate-400 dark:text-[#64748B]">
                Searching...
              </p>
            )}

            {searchQuery_trimmed && searchResults.error && (
              <p className="py-6 text-center text-xs text-rose-500">
                {searchResults.error.message}
              </p>
            )}

            {searchQuery_trimmed &&
              !searchResults.isPending &&
              !searchResults.error &&
              (searchResults.data ?? []).length === 0 && (
                <p className="py-6 text-center text-xs text-slate-400 dark:text-[#64748B]">
                  No users found matching &ldquo;{searchQuery_trimmed}&rdquo;
                </p>
              )}

            {(searchResults.data ?? [])
              .filter((user) => user.id !== currentUser.id)
              .map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleStartWithUser(user.id)}
                  disabled={startingWith !== null}
                  className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-[#0B0E14] hover:bg-blue-50 dark:hover:bg-[#1E293B] border border-slate-200 dark:border-[#1E293B] transition-colors text-left group cursor-pointer disabled:opacity-60"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Avatar name={user.name} size="sm" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-800 dark:text-[#E2E8F0] truncate group-hover:text-[#3B82F6] transition-colors">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-[#94A3B8] truncate">
                        {user.phone}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#3B82F6] font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    {startingWith === user.id ? (
                      "Starting..."
                    ) : (
                      <>
                        Chat
                        <MessageSquarePlus className="w-3 h-3" />
                      </>
                    )}
                  </span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
