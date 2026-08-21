"use client";

import { useChat } from "@/context/ChatContext";
import { MOCK_USERS } from "@/lib/mockData";
import { ArrowRight, Check, Hash, Users, X } from "lucide-react";
import React, { useState } from "react";
import { Avatar } from "../common/Avatar";

interface NewGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GROUP_COLORS = [
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#10B981",
  "#F59E0B",
  "#6366F1",
  "#06B6D4",
];

export const NewGroupModal: React.FC<NewGroupModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentUser, createGroupConversation } = useChat();
  const [groupName, setGroupName] = useState("");
  const [topic, setTopic] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState(GROUP_COLORS[0]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const availableMembers = MOCK_USERS.filter((u) => u.id !== currentUser.id);

  const toggleUserSelection = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) {
      setError("Please provide a group name");
      return;
    }
    if (selectedUserIds.length === 0) {
      setError("Please select at least 1 other member for the group");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await createGroupConversation(
        groupName.trim(),
        selectedUserIds,
        topic.trim() || undefined,
        selectedColor,
      );
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to create group");
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
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xs"
              style={{ backgroundColor: selectedColor }}
            >
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-[#E2E8F0]">
                Create Group Chat
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
                Collaborate with multiple team members
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

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Group Name & Topic */}
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-[#94A3B8] uppercase tracking-wider mb-1">
                Group Name *
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g. Frontend Engineering Team"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0B0E14] border border-slate-200 dark:border-[#1E293B] text-xs text-slate-800 dark:text-[#E2E8F0] focus:outline-none focus:border-[#3B82F6]"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-[#94A3B8] uppercase tracking-wider mb-1">
                Topic / Purpose (Optional)
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 text-slate-400 dark:text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Sprint discussions, PR reviews & release tracking"
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0B0E14] border border-slate-200 dark:border-[#1E293B] text-xs text-slate-800 dark:text-[#E2E8F0] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
            </div>

            {/* Color Accent Picker */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-[#94A3B8] uppercase tracking-wider mb-1.5">
                Group Theme Color
              </label>
              <div className="flex items-center gap-2">
                {GROUP_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      selectedColor === c
                        ? "scale-110 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#151921] ring-[#3B82F6]"
                        : "opacity-80 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: c }}
                  >
                    {selectedColor === c && (
                      <Check className="w-3.5 h-3.5 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Member Selection */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-semibold text-slate-500 dark:text-[#94A3B8] uppercase tracking-wider">
                Select Members ({selectedUserIds.length} chosen)
              </label>
              <span className="text-[10px] text-slate-400 dark:text-[#64748B]">
                Click to toggle
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
              {availableMembers.map((user) => {
                const isSelected = selectedUserIds.includes(user.id);
                return (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => toggleUserSelection(user.id)}
                    className={`flex items-center justify-between p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#3B82F6] bg-blue-50/80 dark:bg-[#3B82F6]/15"
                        : "border-slate-200 dark:border-[#1E293B] bg-slate-50 dark:bg-[#0B0E14] hover:border-slate-300 dark:hover:border-[#3B82F6]/30"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Avatar
                        name={user.name}
                        avatarUrl={user.avatarUrl}
                        status={user.status}
                        color={user.color}
                        size="sm"
                      />
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

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>Create Group</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
