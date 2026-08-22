"use client";
import {
  FileText,
  Image as ImageIcon,
  Paperclip,
  Send,
  Smile,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useChat } from "../../context/ChatContext";

const EMOJI_LIST = [
  "😀",
  "😂",
  "😍",
  "🔥",
  "👍",
  "🙏",
  "🎉",
  "🚀",
  "💯",
  "✨",
  "👏",
  "❤️",
  "🤔",
  "😎",
  "🙌",
  "👀",
];

const MessageInput: React.FC = () => {
  const {
    sendMessage,
    isSendingMessage,
    activeConversation,
  } = useChat();

  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachment, setAttachment] = useState<{
    type: "image" | "file";
    url?: string;
    name?: string;
  } | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  // Auto-focus when active conversation changes
  useEffect(() => {
    if (activeConversation && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [activeConversation?.id]);

  // Click outside to close emoji picker
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isMessageEmpty = text.trim().length === 0 && !attachment;

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isMessageEmpty || isSendingMessage) return;

    const messageText = text.trim();

    // Clear state immediately
    setText("");
    setAttachment(null);
    setShowEmojiPicker(false);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    await sendMessage(messageText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // Auto-grow textarea up to max-height
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleInsertEmoji = (emoji: string) => {
    setText((prev) => prev + emoji);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleSimulateAttachment = (type: "image" | "file") => {
    if (type === "image") {
      setAttachment({
        type: "image",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
        name: "design_spec_preview.png",
      });
    } else {
      setAttachment({
        type: "file",
        name: "Technical_Documentation_v2.pdf",
      });
    }
  };

  if (!activeConversation) return null;

  return (
    <div className="p-3 bg-white dark:bg-[#151921] border-t border-slate-200 dark:border-[#1E293B] relative flex-shrink-0 transition-colors">
      {/* Attachment Preview Chip */}
      {attachment && (
        <div className="flex items-center gap-2 px-3 py-1.5 mb-2 bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-[#1E293B] rounded-xl text-xs text-slate-800 dark:text-[#E2E8F0] w-fit animate-in fade-in duration-100">
          {attachment.type === "image" ? (
            <ImageIcon className="w-4 h-4 text-[#3B82F6]" />
          ) : (
            <FileText className="w-4 h-4 text-[#3B82F6]" />
          )}
          <span className="font-medium truncate max-w-[180px]">
            {attachment.name}
          </span>
          <button
            onClick={() => setAttachment(null)}
            className="p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-[#151921] text-slate-400 hover:text-slate-700 dark:text-[#94A3B8] dark:hover:text-[#E2E8F0]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Input container */}
      <div className="relative flex items-end gap-2 bg-slate-100 dark:bg-[#1E293B] border border-transparent rounded-2xl p-1.5 focus-within:ring-1 focus-within:ring-[#3B82F6] focus-within:border-[#3B82F6] transition-all shadow-xs">
        {/* Left icon buttons: Emoji & Attachment */}
        <div className="flex items-center gap-0.5 pb-1 pl-1">
          {/* Emoji Picker toggle */}
          <div className="relative" ref={emojiPickerRef}>
            <button
              id="btn-toggle-emoji-picker"
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-1.5 rounded-xl text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-[#E2E8F0] hover:bg-slate-200 dark:hover:bg-[#151921] transition-colors cursor-pointer"
              title="Insert Emoji"
            >
              <Smile className="w-5 h-5" />
            </button>

            {showEmojiPicker && (
              <div className="absolute bottom-full left-0 mb-3 w-64 bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] shadow-2xl rounded-2xl p-3 z-40 animate-in fade-in zoom-in-95 duration-100">
                <div className="text-[11px] font-semibold text-slate-400 dark:text-[#64748B] uppercase tracking-wider mb-2">
                  Frequently Used
                </div>
                <div className="grid grid-cols-6 gap-1">
                  {EMOJI_LIST.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => handleInsertEmoji(emoji)}
                      className="p-1.5 text-lg hover:scale-125 transition-transform text-center rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E293B] cursor-pointer"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Attachment button */}
          <button
            id="btn-attach-media"
            type="button"
            onClick={() => handleSimulateAttachment("image")}
            className="p-1.5 rounded-xl text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-[#E2E8F0] hover:bg-slate-200 dark:hover:bg-[#151921] transition-colors cursor-pointer"
            title="Attach sample image"
          >
            <Paperclip className="w-5 h-5" />
          </button>
        </div>

        {/* Text Input area */}
        <textarea
          id="chat-message-textarea"
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder={`Message ${activeConversation.name}...`}
          rows={1}
          className="flex-1 max-h-32 min-h-[38px] py-2 px-1 text-sm bg-transparent border-0 resize-none focus:outline-none text-slate-900 dark:text-[#E2E8F0] placeholder:text-slate-400 dark:placeholder:text-[#94A3B8] custom-scrollbar leading-relaxed"
        />

        {/* Send Button */}
        <button
          id="btn-send-message"
          type="button"
          disabled={isMessageEmpty || isSendingMessage}
          onClick={() => handleSend()}
          className={`p-2.5 rounded-xl flex items-center justify-center transition-all flex-shrink-0 cursor-pointer ${
            isMessageEmpty
              ? "bg-slate-200 dark:bg-[#151921] text-slate-400 dark:text-[#64748B] cursor-not-allowed border border-slate-300/60 dark:border-[#1E293B]"
              : "bg-[#3B82F6] hover:bg-[#2563EB] active:scale-95 text-white shadow-xs"
          }`}
          title={
            isMessageEmpty ? "Type a message to send" : "Send message (Enter)"
          }
        >
          {isSendingMessage ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4 stroke-[2.25]" />
          )}
        </button>
      </div>

      <div className="flex items-center justify-between px-2 pt-1.5 text-[10px] text-slate-400 dark:text-[#64748B]">
        <span>
          Press{" "}
          <kbd className="font-mono bg-slate-200 dark:bg-[#1E293B] px-1 py-0.5 rounded border border-slate-300 dark:border-[#1E293B] text-slate-600 dark:text-[#94A3B8]">
            Enter
          </kbd>{" "}
          to send,{" "}
          <kbd className="font-mono bg-slate-200 dark:bg-[#1E293B] px-1 py-0.5 rounded border border-slate-300 dark:border-[#1E293B] text-slate-600 dark:text-[#94A3B8]">
            Shift + Enter
          </kbd>{" "}
          for newline
        </span>
        <span>Ready for Backend API</span>
      </div>
    </div>
  );
};

export default MessageInput;
