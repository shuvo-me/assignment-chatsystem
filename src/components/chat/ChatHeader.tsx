"use client";
import { useChat } from "@/context/ChatContext";
import { ArrowLeft, Info, Search, Sparkles, Users } from "lucide-react";
import React from "react";
import { Avatar } from "../common/Avatar";

interface ChatHeaderProps {
  onBackMobile: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onBackMobile }) => {
  const {
    activeConversation,
    currentUser,
    showInfoDrawer,
    setShowInfoDrawer,
    setShowSearchModal,
    typingUsers,
    simulateIncomingMessage,
    triggerTypingSimulation,
  } = useChat();

  if (!activeConversation) return null;

  const isGroup = activeConversation.type === "group";
  const otherParticipant = !isGroup
    ? activeConversation.participants.find((p) => p.id !== currentUser.id)
    : null;

  const isTyping = typingUsers.length > 0;

  return (
    <div
      id="chat-header-bar"
      className="px-4 py-3 border-b border-slate-200 dark:border-[#1E293B] bg-white dark:bg-[#151921] flex items-center justify-between flex-shrink-0 z-10 transition-colors"
    >
      {/* Left info & mobile back */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          id="btn-back-mobile"
          onClick={onBackMobile}
          className="md:hidden p-2 -ml-1 rounded-xl text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-[#E2E8F0] hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
          title="Back to conversations"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <button
          id="btn-chat-header-avatar"
          onClick={() => setShowInfoDrawer(!showInfoDrawer)}
          className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
        >
          {isGroup ? (
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs font-bold text-sm"
              style={{
                backgroundColor: activeConversation.avatarColor || "#3B82F6",
              }}
            >
              <Users className="w-5 h-5" />
            </div>
          ) : (
            <Avatar
              name={activeConversation.name}
              avatarUrl={
                activeConversation.avatarUrl || otherParticipant?.avatarUrl
              }
              status={otherParticipant?.status}
              color={activeConversation.avatarColor || otherParticipant?.color}
              size="md"
            />
          )}

          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-slate-800 dark:text-[#E2E8F0] truncate group-hover:text-[#3B82F6] transition-colors">
              {activeConversation.name}
            </h2>

            <div className="text-xs text-slate-500 dark:text-[#94A3B8] truncate flex items-center gap-1.5">
              {isTyping ? (
                <span className="text-[#3B82F6] font-medium italic flex items-center gap-1 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-bounce" />
                  {typingUsers.join(", ")} is typing...
                </span>
              ) : isGroup ? (
                <span>
                  {activeConversation.participants.length} participants
                </span>
              ) : otherParticipant?.status === "online" ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Online
                </span>
              ) : otherParticipant?.status === "away" ? (
                <span className="text-amber-500 font-medium">Away</span>
              ) : (
                <span className="text-slate-400 dark:text-[#64748B]">
                  Offline
                </span>
              )}
            </div>
          </div>
        </button>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        {/* Quick simulator test helpers */}
        <div className="hidden lg:flex items-center gap-1 mr-2 px-2 py-1 rounded-xl bg-slate-100 dark:bg-[#1E293B]/70 border border-slate-200 dark:border-[#1E293B] text-xs">
          <span className="text-[11px] font-medium text-slate-500 dark:text-[#94A3B8] mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#3B82F6]" />
            Test:
          </span>
          <button
            id="btn-quick-sim-msg"
            onClick={() => simulateIncomingMessage()}
            className="px-2 py-0.5 rounded-md bg-white dark:bg-[#151921] hover:bg-[#3B82F6]/10 dark:hover:bg-[#3B82F6]/20 text-slate-700 dark:text-[#E2E8F0] hover:text-[#3B82F6] font-medium text-[11px] border border-slate-200 dark:border-[#1E293B] transition-all cursor-pointer shadow-2xs"
            title="Simulate an incoming message in real-time"
          >
            + Incoming Msg
          </button>
          <button
            id="btn-quick-sim-typing"
            onClick={triggerTypingSimulation}
            className="px-2 py-0.5 rounded-md bg-white dark:bg-[#151921] hover:bg-[#3B82F6]/10 dark:hover:bg-[#3B82F6]/20 text-slate-700 dark:text-[#E2E8F0] hover:text-[#3B82F6] font-medium text-[11px] border border-slate-200 dark:border-[#1E293B] transition-all cursor-pointer shadow-2xs"
            title="Simulate contact typing"
          >
            Typing
          </button>
        </div>

        <button
          id="btn-search-in-chat"
          onClick={() => setShowSearchModal(true)}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-[#E2E8F0] hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
          title="Search in this conversation"
        >
          <Search className="w-4.5 h-4.5" />
        </button>

        <button
          id="btn-toggle-info-drawer"
          onClick={() => setShowInfoDrawer(!showInfoDrawer)}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
            showInfoDrawer
              ? "bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30"
              : "text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-[#E2E8F0] hover:bg-slate-100 dark:hover:bg-[#1E293B]"
          }`}
          title="Conversation details and media"
        >
          <Info className="w-4.5 h-4.5" />
        </button>
      </div>
    </div>
  );
};
