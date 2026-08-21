"use client";

import { useChat } from "@/context/ChatContext";
import { MOCK_USERS } from "@/lib/mockData";
import {
  ArrowRight,
  Phone,
  Search,
  Sparkles,
  User as UserIcon,
  UserPlus,
  X,
} from "lucide-react";
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
  const {
    currentUser,
    createDirectConversation,
    conversations,
    selectConversation,
  } = useChat();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Available mock users not current user
  const availableUsers = MOCK_USERS.filter((u) => u.id !== currentUser.id);

  const filteredSuggestedUsers = availableUsers.filter((u) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return u.name.toLowerCase().includes(q) || u.phone.includes(q);
  });

  const handleStartWithUser = async (
    targetPhone: string,
    targetName: string,
  ) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Check if conversation already exists with this phone
      const existing = conversations.find(
        (c) =>
          c.type === "direct" &&
          c.participants.some((p) => p.phone === targetPhone),
      );

      if (existing) {
        selectConversation(existing.id);
        onClose();
        return;
      }

      await createDirectConversation(targetPhone, targetName);
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to start conversation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setError("Please enter a phone number");
      return;
    }
    handleStartWithUser(phone.trim(), name.trim() || phone.trim());
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
                Start a 1-on-1 chat by phone number
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

          {/* Direct phone number entry form */}
          <form onSubmit={handleCustomSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-[#94A3B8] uppercase tracking-wider mb-1">
                Recipient Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 dark:text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B0E14] border border-slate-200 dark:border-[#1E293B] text-xs text-slate-800 dark:text-[#E2E8F0] focus:outline-none focus:border-[#3B82F6]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-[#94A3B8] uppercase tracking-wider mb-1">
                Display Name (Optional)
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 dark:text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Lee"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B0E14] border border-slate-200 dark:border-[#1E293B] text-xs text-slate-800 dark:text-[#E2E8F0] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>Start Conversation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Select from Directory */}
          <div className="pt-3 border-t border-slate-200 dark:border-[#1E293B]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-[#94A3B8] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#3B82F6]" />
                Or pick from Team Directory
              </span>
            </div>

            <div className="relative mb-2">
              <Search className="w-3.5 h-3.5 text-slate-400 dark:text-[#64748B] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search contacts..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0B0E14] border border-slate-200 dark:border-[#1E293B] text-xs text-slate-800 dark:text-[#E2E8F0] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div className="max-h-48 overflow-y-auto space-y-1 custom-scrollbar pr-1">
              {filteredSuggestedUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleStartWithUser(user.phone, user.name)}
                  className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-[#0B0E14] hover:bg-blue-50 dark:hover:bg-[#1E293B] border border-slate-200 dark:border-[#1E293B] transition-colors text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Avatar
                      name={user.name}
                      avatarUrl={user.avatarUrl}
                      status={user.status}
                      color={user.color}
                      size="sm"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-800 dark:text-[#E2E8F0] truncate group-hover:text-[#3B82F6] transition-colors">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-[#94A3B8] truncate">
                        {user.phone}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#3B82F6] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Chat &rarr;
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
