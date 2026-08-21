"use client";

import { Check, CheckCheck, Pin, Sparkles, Users, VolumeX } from "lucide-react";
import React from "react";
import { useChat } from "../../context/ChatContext";
import { formatConversationTime } from "../../utils/dateFormatter";
import { Avatar } from "../common/Avatar";
import { EmptyState } from "../common/EmptyState";
import { ConversationSkeleton } from "../common/SkeletonLoader";

const ConversationList: React.FC = () => {
  const {
    conversations,
    activeConversation,
    selectConversation,
    isLoadingConversations,
    activeFilter,
    searchQuery,
    currentUser,
    setShowNewChatModal,
    typingUsers,
  } = useChat();

  if (isLoadingConversations) {
    return <ConversationSkeleton />;
  }

  // Filter conversations
  const filteredConversations = conversations.filter((conv) => {
    // 1. Tab filter
    if (activeFilter === "direct" && conv.type !== "direct") return false;
    if (activeFilter === "group" && conv.type !== "group") return false;
    if (
      activeFilter === "unread" &&
      (!conv.unreadCount || conv.unreadCount === 0)
    )
      return false;

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = conv.name.toLowerCase().includes(q);
      const matchTopic = conv.topic?.toLowerCase().includes(q);
      const matchLastMsg = conv.lastMessage?.text.toLowerCase().includes(q);
      const matchParticipant = conv.participants.some(
        (p) => p.name.toLowerCase().includes(q) || p.phone.includes(q),
      );
      return matchName || matchTopic || matchLastMsg || matchParticipant;
    }

    return true;
  });

  if (filteredConversations.length === 0) {
    if (searchQuery.trim()) {
      return (
        <div className="p-6 text-center">
          <EmptyState type="no-search-results" />
        </div>
      );
    }
    if (activeFilter === "unread") {
      return (
        <div className="p-8 text-center text-slate-500 dark:text-[#94A3B8] text-xs">
          <Sparkles className="w-8 h-8 mx-auto text-[#3B82F6] mb-2" />
          <p className="font-semibold text-slate-800 dark:text-[#E2E8F0]">
            All caught up!
          </p>
          <p className="text-slate-500 dark:text-[#94A3B8] mt-0.5">
            No unread conversations right now.
          </p>
        </div>
      );
    }
    return (
      <EmptyState
        type="no-conversations"
        onAction={() => setShowNewChatModal(true)}
        actionLabel="Start a Conversation"
      />
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
      {filteredConversations.map((conv) => {
        const isSelected = activeConversation?.id === conv.id;
        const otherParticipant =
          conv.type === "direct"
            ? conv.participants.find((p) => p.id !== currentUser.id)
            : null;

        const isMeSender = conv.lastMessage?.senderId === currentUser.id;
        const isTypingHere = isSelected && typingUsers.length > 0;

        return (
          <button
            key={conv.id}
            id={`conversation-item-${conv.id}`}
            onClick={() => selectConversation(conv.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all relative group cursor-pointer border ${
              isSelected
                ? "bg-blue-50/90 dark:bg-[#1E293B] border-l-4 border-l-[#3B82F6] border-y-transparent border-r-transparent shadow-xs"
                : "hover:bg-slate-100/80 dark:hover:bg-[#1E293B]/50 border-transparent"
            }`}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              {conv.type === "group" ? (
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-xs font-bold text-sm"
                  style={{ backgroundColor: conv.avatarColor || "#3B82F6" }}
                >
                  <Users className="w-5 h-5" />
                </div>
              ) : (
                <Avatar
                  name={conv.name}
                  avatarUrl={conv.avatarUrl || otherParticipant?.avatarUrl}
                  status={otherParticipant?.status}
                  color={conv.avatarColor || otherParticipant?.color}
                  size="lg"
                />
              )}
            </div>

            {/* Content Details */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <h3
                    className={`text-sm truncate ${
                      isSelected
                        ? "text-blue-950 dark:text-[#E2E8F0] font-semibold"
                        : "text-slate-800 dark:text-[#E2E8F0] font-medium"
                    }`}
                  >
                    {conv.name}
                  </h3>
                  {conv.isPinned && (
                    <Pin className="w-3 h-3 text-[#3B82F6] fill-[#3B82F6]/20 flex-shrink-0" />
                  )}
                  {conv.isMuted && (
                    <VolumeX className="w-3 h-3 text-slate-400 dark:text-[#64748B] flex-shrink-0" />
                  )}
                </div>

                <span
                  className={`text-[11px] font-medium flex-shrink-0 ${
                    conv.unreadCount > 0
                      ? "text-[#3B82F6] font-semibold"
                      : "text-slate-400 dark:text-[#94A3B8]"
                  }`}
                >
                  {formatConversationTime(
                    conv.lastMessage?.timestamp || conv.updatedAt,
                  )}
                </span>
              </div>

              {/* Message Snippet & Read Receipts */}
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs text-slate-500 dark:text-[#94A3B8] truncate flex items-center gap-1 min-w-0">
                  {isTypingHere ? (
                    <span className="text-[#3B82F6] font-medium italic animate-pulse">
                      {typingUsers.join(", ")} is typing...
                    </span>
                  ) : conv.lastMessage ? (
                    <>
                      {isMeSender && (
                        <span className="flex-shrink-0 text-slate-400 dark:text-[#94A3B8] inline-flex items-center">
                          {conv.lastMessage.status === "read" ? (
                            <CheckCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
                          ) : conv.lastMessage.status === "delivered" ? (
                            <CheckCheck className="w-3.5 h-3.5 text-slate-400 dark:text-[#64748B]" />
                          ) : (
                            <Check className="w-3.5 h-3.5 text-slate-400 dark:text-[#64748B]" />
                          )}
                        </span>
                      )}

                      {conv.type === "group" &&
                        !isMeSender &&
                        conv.lastMessage.senderName && (
                          <span className="font-medium text-slate-700 dark:text-[#CBD5E1] flex-shrink-0">
                            {conv.lastMessage.senderName.split(" ")[0]}:
                          </span>
                        )}

                      <span className="truncate">
                        {conv.lastMessage.type === "image"
                          ? "📷 Image attachment"
                          : conv.lastMessage.text}
                      </span>
                    </>
                  ) : (
                    <span className="text-slate-400 dark:text-[#64748B] italic">
                      No messages yet
                    </span>
                  )}
                </div>

                {/* Unread Badge */}
                {conv.unreadCount > 0 && (
                  <span className="flex-shrink-0 min-w-[20px] h-5 px-1.5 rounded-full bg-[#3B82F6] text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ConversationList;
