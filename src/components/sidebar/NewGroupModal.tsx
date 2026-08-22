"use client";

import { useChat } from "@/context/ChatContext";
import { userService } from "@/services/user.service";
import { Check, Search, Users, X } from "lucide-react";
import React, { useState } from "react";
import { Avatar } from "../common/Avatar";
import type { User } from "@/types/chat";

interface NewGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewGroupModal: React.FC<NewGroupModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentUser, createGroupChat } = useChat();
  const [groupName, setGroupName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchQuery_trimmed = searchQuery.trim();
  const searchResults = userService.useSearchUsers(searchQuery_trimmed);

  if (!isOpen) return null;

  const resetAndClose = () => {
    setGroupName("");
    setSearchQuery("");
    setSelectedUsers([]);
    setError(null);
    onClose();
  };

  const toggleUserSelection = (user: User) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) {
      setError("Please provide a group name");
      return;
    }
    // upstream rule: a group needs at least 3 members (you + 2 others)
    if (selectedUsers.length < 2) {
      setError("A group needs at least 3 members including you");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await createGroupChat(
        groupName.trim(),
        selectedUsers.map((u) => u.id),
      );
      resetAndClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create group");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="modal-new-group"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="w-full max-w-lg bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 transition-colors">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#3B82F6]/15 flex items-center justify-center text-[#3B82F6]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-[#E2E8F0]">
                Create Group Chat
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
                Add at least 2 other members
              </p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-lg text-slate-400 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-[#E2E8F0] hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Group Name */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-[#94A3B8] uppercase tracking-wider mb-1">
              Group Name *
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g. Project Team"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0B0E14] border border-slate-200 dark:border-[#1E293B] text-xs text-slate-800 dark:text-[#E2E8F0] focus:outline-none focus:border-[#3B82F6]"
              required
            />
          </div>

          {/* Selected Members */}
          {selectedUsers.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {selectedUsers.map((user) => (
                <span
                  key={user.id}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 dark:bg-[#3B82F6]/15 border border-[#3B82F6]/40 text-[11px] font-medium text-[#3B82F6]"
                >
                  {user.name}
                  <button
                    type="button"
                    onClick={() => toggleUserSelection(user)}
                    className="hover:opacity-70 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Member Search */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-[#94A3B8] uppercase tracking-wider mb-1">
              Select Members ({selectedUsers.length} chosen)
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 dark:text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users by name or phone..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B0E14] border border-slate-200 dark:border-[#1E293B] text-xs text-slate-800 dark:text-[#E2E8F0] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div className="mt-2 max-h-48 overflow-y-auto space-y-1 custom-scrollbar pr-1">
              {!searchQuery_trimmed && (
                <p className="py-4 text-center text-xs text-slate-400 dark:text-[#64748B]">
                  Type at least 2 characters to search
                </p>
              )}

              {searchQuery_trimmed && searchResults.isPending && (
                <p className="py-4 text-center text-xs text-slate-400 dark:text-[#64748B]">
                  Searching...
                </p>
              )}

              {searchQuery_trimmed && searchResults.error && (
                <p className="py-4 text-center text-xs text-rose-500">
                  {searchResults.error.message}
                </p>
              )}

              {searchQuery_trimmed &&
                !searchResults.isPending &&
                !searchResults.error &&
                (searchResults.data ?? []).filter((u) => u.id !== currentUser.id)
                  .length === 0 && (
                  <p className="py-4 text-center text-xs text-slate-400 dark:text-[#64748B]">
                    No users found matching &ldquo;{searchQuery_trimmed}&rdquo;
                  </p>
                )}

              {(searchResults.data ?? [])
                .filter((user) => user.id !== currentUser.id)
                .map((user) => {
                  const isSelected = selectedUsers.some(
                    (u) => u.id === user.id,
                  );
                  return (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => toggleUserSelection(user)}
                      className={`w-full flex items-center justify-between p-2 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#3B82F6] bg-blue-50/80 dark:bg-[#3B82F6]/15"
                          : "border-slate-200 dark:border-[#1E293B] bg-slate-50 dark:bg-[#0B0E14] hover:border-slate-300 dark:hover:border-[#3B82F6]/30"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Avatar name={user.name} size="sm" />
                        <div className="min-w-0">
                          <p
                            className={`text-xs font-semibold truncate ${isSelected ? "text-[#3B82F6]" : "text-slate-800 dark:text-[#E2E8F0]"}`}
                          >
                            {user.name}
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-[#94A3B8] truncate">
                            {user.phone}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          isSelected
                            ? "bg-[#3B82F6] border-[#3B82F6] text-white"
                            : "border-slate-300 dark:border-[#1E293B] bg-white dark:bg-[#151921]"
                        }`}
                      >
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        )}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-60 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Group</span>
                  <Users className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
