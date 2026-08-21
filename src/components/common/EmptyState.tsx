"use client";
import {
  MessageCircleDashed,
  MessageSquare,
  PlusCircle,
  Search,
  Sparkles,
} from "lucide-react";
import React from "react";

interface EmptyStateProps {
  id?: string;
  type:
    | "no-active-chat"
    | "no-conversations"
    | "no-messages"
    | "no-search-results";
  onAction?: () => void;
  actionLabel?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  id,
  type,
  onAction,
  actionLabel,
}) => {
  const configs = {
    "no-active-chat": {
      icon: MessageSquare,
      title: "Select a conversation",
      description:
        "Choose a conversation from the sidebar or start a new direct message or group chat to begin messaging.",
      action: "Start New Conversation",
    },
    "no-conversations": {
      icon: MessageCircleDashed,
      title: "No conversations yet",
      description:
        "Your inbox is clear. Connect with your team members by starting a new conversation or group.",
      action: "Start a Chat",
    },
    "no-messages": {
      icon: Sparkles,
      title: "No messages yet",
      description:
        "Say hello! Be the first one to send a message in this conversation.",
      action: undefined,
    },
    "no-search-results": {
      icon: Search,
      title: "No results found",
      description:
        "We could not find any contacts or conversations matching your search criteria. Check spelling or try a phone number.",
      action: undefined,
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div
      id={id}
      className="h-full flex flex-col items-center justify-center p-8 text-center select-none"
    >
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-[#1E293B] flex items-center justify-center text-[#3B82F6] mb-4 shadow-xs border border-slate-200 dark:border-[#1E293B]">
        <Icon className="w-8 h-8 stroke-[1.75]" />
      </div>

      <h3 className="text-lg font-semibold text-slate-800 dark:text-[#E2E8F0] mb-1.5">
        {config.title}
      </h3>

      <p className="text-sm text-slate-500 dark:text-[#94A3B8] max-w-sm mb-6 leading-relaxed">
        {config.description}
      </p>

      {(actionLabel || config.action) && onAction && (
        <button
          id="empty-state-action-btn"
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium transition-all shadow-xs active:scale-98 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          {actionLabel || config.action}
        </button>
      )}
    </div>
  );
};
