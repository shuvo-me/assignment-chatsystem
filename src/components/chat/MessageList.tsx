"use client";

import { ChevronDown, Sparkles } from "lucide-react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useChat } from "../../context/ChatContext";
import { getDateDividerLabel } from "../../utils/dateFormatter";
import { EmptyState } from "../common/EmptyState";
import { MessagesSkeleton } from "../common/SkeletonLoader";
import { MessageItem } from "./MessageItem";

const MessageList: React.FC = () => {
  const {
    messages,
    currentUser,
    activeConversation,
    isLoadingMessages,
    typingUsers,
  } = useChat();

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomAnchorRef = useRef<HTMLDivElement>(null);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [newUnreadCount, setNewUnreadCount] = useState(0);
  const prevMessagesLengthRef = useRef(messages.length);
  const isInitialLoadRef = useRef(true);

  // Scroll listener to check if user has scrolled up
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    // Buffer of 80px from bottom is considered "at bottom"
    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const scrolledUp = distanceToBottom > 80;

    setIsScrolledUp(scrolledUp);
    if (!scrolledUp) {
      setNewUnreadCount(0);
    }
  };

  const scrollToBottom = (smooth = true) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
    setNewUnreadCount(0);
    setIsScrolledUp(false);
  };

  // Reset initial load state when active conversation changes
  useEffect(() => {
    isInitialLoadRef.current = true;
    prevMessagesLengthRef.current = 0;
    setNewUnreadCount(0);
    setIsScrolledUp(false);
  }, [activeConversation?.id]);

  // Handle auto-scroll logic when messages change
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const isFirstLoad = isInitialLoadRef.current;
    const messageAdded = messages.length > prevMessagesLengthRef.current;
    const isMeLastSender =
      messages[messages.length - 1]?.senderId === currentUser.id;

    if (isFirstLoad) {
      // On first load of conversation, jump straight to bottom
      scrollToBottom(false);
      isInitialLoadRef.current = false;
    } else if (messageAdded) {
      if (!isScrolledUp || isMeLastSender) {
        // Auto-scroll if user is at bottom or user just sent the message
        scrollToBottom(true);
      } else {
        // User is scrolled up reading history
        setNewUnreadCount((prev) => prev + 1);
      }
    }

    prevMessagesLengthRef.current = messages.length;
  }, [messages, isScrolledUp, currentUser.id]);

  // Auto-scroll slightly if typing indicator appears and at bottom
  useEffect(() => {
    if (typingUsers.length > 0 && !isScrolledUp) {
      scrollToBottom(true);
    }
  }, [typingUsers, isScrolledUp]);

  if (isLoadingMessages) {
    return <MessagesSkeleton />;
  }

  if (!activeConversation) {
    return <EmptyState type="no-active-chat" />;
  }

  if (messages.length === 0) {
    return <EmptyState type="no-messages" />;
  }

  const isGroup = activeConversation.type === "group";

  return (
    <div className="relative flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-[#0B0E14] transition-colors">
      {/* Scrollable Message History Area */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        id="messages-scroll-container"
        className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-1 custom-scrollbar"
      >
        {/* Conversation beginning banner */}
        <div className="text-center py-4 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 dark:bg-[#1E293B]/60 text-slate-600 dark:text-[#94A3B8] text-[11px] font-medium border border-slate-300/70 dark:border-[#1E293B]/50">
            <Sparkles className="w-3 h-3 text-[#3B82F6]" />
            Beginning of message history
          </span>
        </div>

        {messages.map((message, index) => {
          const isMe = message.senderId === currentUser.id;
          const prevMessage = messages[index - 1];
          const nextMessage = messages[index + 1];

          // Check if date divider is needed
          const showDateDivider =
            !prevMessage ||
            new Date(prevMessage.timestamp).toDateString() !==
              new Date(message.timestamp).toDateString();

          const dateLabel = showDateDivider
            ? getDateDividerLabel(message.timestamp)
            : "";

          // Determine avatar display (show only on last consecutive message of sender)
          const isLastInSeries =
            !nextMessage || nextMessage.senderId !== message.senderId;

          // Find sender details if group chat
          const senderUser = activeConversation.participants.find(
            (p) => p.id === message.senderId,
          );

          return (
            <React.Fragment key={message.id}>
              {showDateDivider && (
                <div className="flex justify-center my-4 select-none">
                  <span className="px-3 py-1 rounded-full bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] text-[11px] font-medium text-slate-600 dark:text-[#94A3B8] shadow-xs">
                    {dateLabel}
                  </span>
                </div>
              )}

              <MessageItem
                message={message}
                isMe={isMe}
                showAvatar={isLastInSeries}
                isGroup={isGroup}
                senderUser={senderUser}
              />
            </React.Fragment>
          );
        })}

        {/* Live typing indicator bubble */}
        {typingUsers.length > 0 && (
          <div className="flex items-center gap-2.5 my-2 animate-in fade-in duration-200">
            <div className="px-4 py-3 rounded-2xl rounded-bl-xs bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] text-slate-600 dark:text-[#94A3B8] shadow-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-bounce" />
              <span className="text-xs font-medium text-slate-800 dark:text-[#E2E8F0] ml-1">
                {typingUsers.join(", ")} is typing...
              </span>
            </div>
          </div>
        )}

        <div ref={bottomAnchorRef} className="h-1" />
      </div>

      {/* Smart Floating "Scroll to Bottom / New Messages" pill */}
      {isScrolledUp && (
        <button
          id="btn-scroll-to-bottom"
          onClick={() => scrollToBottom(true)}
          className="absolute bottom-4 right-6 z-20 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white dark:bg-[#151921] hover:bg-slate-100 dark:hover:bg-[#1E293B] text-slate-800 dark:text-[#E2E8F0] shadow-xl border border-slate-200 dark:border-[#1E293B] text-xs font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-150"
        >
          <ChevronDown className="w-4 h-4 text-[#3B82F6]" />
          <span>
            {newUnreadCount > 0
              ? `${newUnreadCount} new message${newUnreadCount > 1 ? "s" : ""}`
              : "Latest messages"}
          </span>
          {newUnreadCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-ping" />
          )}
        </button>
      )}
    </div>
  );
};

export default MessageList;
