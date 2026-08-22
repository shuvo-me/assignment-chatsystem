"use client";

import { useChat } from "@/context/ChatContext";
import { Message, User } from "@/types/chat";
import { formatMessageTime } from "@/utils/dateFormatter";
import {
  Check,
  CheckCheck,
  Check as CheckIcon,
  Copy,
  CornerDownRight,
  FileText,
  Reply,
  Smile,
} from "lucide-react";
import React, { useState } from "react";
import { Avatar } from "../common/Avatar";

interface MessageItemProps {
  message: Message;
  isMe: boolean;
  showAvatar?: boolean;
  isGroup?: boolean;
  senderUser?: User;
}

const QUICK_EMOJIS = ["👍", "❤️", "🔥", "🚀", "🎉", "👏", "😂"];

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  isMe,
  showAvatar = true,
  isGroup = false,
  senderUser,
}) => {
  const { setReplyingTo, toggleReaction, currentUser } = useChat();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReactionClick = (emoji: string) => {
    toggleReaction(message.id, emoji);
    setShowEmojiPicker(false);
  };

  if (message.type === "system") {
    return (
      <div className="flex justify-center my-3">
        <span className="px-3 py-1 rounded-full bg-slate-200/80 dark:bg-[#151921] border border-slate-300/60 dark:border-[#1E293B] text-[11px] font-medium text-slate-600 dark:text-[#94A3B8] shadow-xs">
          {message.text}
        </span>
      </div>
    );
  }

  return (
    <div
      id={`message-bubble-${message.id}`}
      className={`group relative flex items-end gap-2.5 my-1.5 transition-all ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      {/* Left Avatar for receiver in group or 1-on-1 */}
      {!isMe && (
        <div className="flex-shrink-0 w-8 h-8 mb-1">
          {showAvatar ? (
            <Avatar
              name={senderUser?.name || "User"}
              avatarUrl={message.senderAvatar || senderUser?.avatarUrl}
              color={senderUser?.color || "#3B82F6"}
              size="sm"
            />
          ) : (
            <div className="w-8 h-8" />
          )}
        </div>
      )}

      {/* Message Container */}
      <div
        className={`relative max-w-[82%] sm:max-w-[72%] md:max-w-[65%] flex flex-col ${isMe ? "items-end" : "items-start"}`}
      >
        {/* Group Sender Name */}
        {!isMe && isGroup && showAvatar && (
          <span
            className="text-[11px] font-semibold mb-1 px-1 select-none"
            style={{ color: senderUser?.color || "#3B82F6" }}
          >
            {message.senderName || "Member"}
          </span>
        )}

        {/* Bubble */}
        <div
          className={`relative px-4 py-2.5 rounded-2xl shadow-xs transition-shadow ${
            isMe
              ? "bg-[#3B82F6] text-white rounded-br-xs"
              : "bg-white border border-slate-200/90 dark:border-[#1E293B] dark:bg-[#151921] text-slate-800 dark:text-[#E2E8F0] rounded-bl-xs"
          }`}
        >
          {/* Reply Quote preview */}
          {message.replyTo && (
            <div
              className={`mb-2 p-2 rounded-xl text-xs flex items-start gap-2 border-l-2 ${
                isMe
                  ? "bg-blue-700/50 border-white/70 text-blue-50"
                  : "bg-slate-100 dark:bg-[#1E293B] border-[#3B82F6] text-slate-800 dark:text-[#E2E8F0]"
              }`}
            >
              <CornerDownRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 opacity-70" />
              <div className="min-w-0 flex-1">
                <span className="font-semibold block text-[11px] opacity-90 truncate">
                  {message.replyTo.senderName}
                </span>
                <span className="line-clamp-2 text-[11px] opacity-80">
                  {message.replyTo.text}
                </span>
              </div>
            </div>
          )}

          {/* Media Attachment if any */}
          {message.type === "image" && message.mediaUrl && (
            <div className="mb-2 rounded-xl overflow-hidden border border-black/10 dark:border-black/20">
              <img
                src={message.mediaUrl}
                alt="Attachment"
                className="max-h-60 w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* File Attachment if any */}
          {message.type === "file" && (
            <div
              className={`flex items-center gap-2.5 p-2.5 mb-2 rounded-xl border ${
                isMe
                  ? "bg-blue-700/60 border-blue-400/40 text-white"
                  : "bg-slate-100 border-slate-200 text-slate-800 dark:bg-[#1E293B] dark:border-[#1E293B] dark:text-[#E2E8F0]"
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/20 flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <div className="text-xs min-w-0">
                <p className="font-medium truncate">
                  {message.fileName || "document.pdf"}
                </p>
                <p className="text-[10px] opacity-75">
                  {message.fileSize || "1.2 MB"}
                </p>
              </div>
            </div>
          )}

          {/* Text Content */}
          <p className="text-sm whitespace-pre-wrap break-words leading-relaxed font-normal">
            {message.text}
          </p>

          {/* Timestamp and Delivery Checks */}
          <div
            className={`flex items-center justify-end gap-1 mt-1 text-[10px] select-none ${
              isMe ? "text-blue-100" : "text-slate-400 dark:text-[#94A3B8]"
            }`}
          >
            <span>{formatMessageTime(message.timestamp)}</span>
            {isMe && (
              <span className="inline-flex items-center">
                {message.status === "read" ? (
                  <CheckCheck className="w-3.5 h-3.5 text-white" />
                ) : message.status === "delivered" ? (
                  <CheckCheck className="w-3.5 h-3.5 text-blue-200" />
                ) : message.status === "sent" ? (
                  <Check className="w-3.5 h-3.5 text-blue-200" />
                ) : (
                  <span className="w-2 h-2 rounded-full border border-white border-t-transparent animate-spin" />
                )}
              </span>
            )}
          </div>
        </div>

        {/* Reactions Badges */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1 z-1">
            {message.reactions.map((r, i) => {
              const hasReacted = r.users.includes(currentUser.id);
              return (
                <button
                  key={i}
                  onClick={() => toggleReaction(message.id, r.emoji)}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border shadow-xs transition-all cursor-pointer ${
                    hasReacted
                      ? "bg-[#3B82F6]/15 border-[#3B82F6] text-[#3B82F6] font-semibold scale-105"
                      : "bg-white dark:bg-[#151921] border-slate-200 dark:border-[#1E293B] text-slate-600 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-[#1E293B]"
                  }`}
                  title={`${r.count} reaction${r.count > 1 ? "s" : ""}`}
                >
                  <span>{r.emoji}</span>
                  <span className="text-[10px]">{r.count}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Hover Action Bar */}
        <div
          className={`absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center gap-0.5 bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] shadow-xl rounded-xl p-1 z-20 ${
            isMe ? "right-full mr-2" : "left-full ml-2"
          }`}
        >
          {/* Reaction Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-1 rounded-lg text-slate-500 dark:text-[#94A3B8] hover:text-[#3B82F6] hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
              title="Add reaction"
            >
              <Smile className="w-3.5 h-3.5" />
            </button>

            {showEmojiPicker && (
              <div
                className={`absolute bottom-full mb-1 flex items-center gap-1 bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] shadow-2xl rounded-full p-1.5 z-30 animate-in fade-in zoom-in-90 duration-100 ${
                  isMe ? "right-0" : "left-0"
                }`}
              >
                {QUICK_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleReactionClick(emoji)}
                    className="p-1.5 hover:scale-125 transition-transform text-sm cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reply */}
          <button
            onClick={() => setReplyingTo(message)}
            className="p-1 rounded-lg text-slate-500 dark:text-[#94A3B8] hover:text-[#3B82F6] hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
            title="Reply"
          >
            <Reply className="w-3.5 h-3.5" />
          </button>

          {/* Copy Text */}
          <button
            onClick={handleCopy}
            className="p-1 rounded-lg text-slate-500 dark:text-[#94A3B8] hover:text-[#3B82F6] hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
            title={copied ? "Copied!" : "Copy text"}
          >
            {copied ? (
              <CheckIcon className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
