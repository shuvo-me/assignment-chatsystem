"use client";
import { useChat } from "@/context/ChatContext";
import { formatDateWithTime } from "@/utils/dateFormatter";
import {
  Clock,
  FileText,
  Hash,
  Phone,
  Pin,
  ShieldCheck,
  Trash2,
  Users,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Avatar } from "../common/Avatar";

const ChatInfoDrawer: React.FC = () => {
  const {
    activeConversation,
    showInfoDrawer,
    setShowInfoDrawer,
    currentUser,
    togglePinConversation,
    toggleMuteConversation,
    deleteConversation,
    selectConversation,
    messages,
  } = useChat();

  const [activeTab, setActiveTab] = useState<
    "details" | "media" | "participants"
  >("details");

  if (!showInfoDrawer || !activeConversation) return null;

  const isGroup = activeConversation.type === "group";
  const otherParticipant = !isGroup
    ? activeConversation.participants.find((p) => p.id !== currentUser.id)
    : null;

  // Extract shared media and files from messages in active conversation
  const imageMessages = messages.filter(
    (m) => m.type === "image" && m.mediaUrl,
  );
  const fileMessages = messages.filter((m) => m.type === "file");

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete this conversation with ${activeConversation.name}?`,
      )
    ) {
      deleteConversation(activeConversation.id);
      setShowInfoDrawer(false);
      selectConversation(null);
    }
  };

  return (
    <div
      id="chat-info-drawer"
      className="w-80 md:w-88 border-l border-slate-200 dark:border-[#1E293B] bg-white dark:bg-[#151921] flex flex-col h-full z-20 flex-shrink-0 animate-in slide-in-from-right-10 duration-200 transition-colors"
    >
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-200 dark:border-[#1E293B] flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-[#E2E8F0]">
          {isGroup ? "Group Information" : "Contact Information"}
        </h3>
        <button
          id="btn-close-info-drawer"
          onClick={() => setShowInfoDrawer(false)}
          className="p-1.5 rounded-lg text-slate-400 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-[#E2E8F0] hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
          title="Close details"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Profile Overview Card */}
      <div className="p-6 text-center border-b border-slate-200 dark:border-[#1E293B] bg-slate-50/50 dark:bg-[#0B0E14]/30">
        <div className="flex justify-center mb-3">
          {isGroup ? (
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-md font-bold text-2xl"
              style={{
                backgroundColor: activeConversation.avatarColor || "#3B82F6",
              }}
            >
              <Users className="w-10 h-10" />
            </div>
          ) : (
            <Avatar
              name={activeConversation.name}
              avatarUrl={
                activeConversation.avatarUrl || otherParticipant?.avatarUrl
              }
              status={otherParticipant?.status}
              color={activeConversation.avatarColor || otherParticipant?.color}
              size="xl"
            />
          )}
        </div>

        <h2 className="text-base font-bold text-slate-800 dark:text-[#E2E8F0]">
          {activeConversation.name}
        </h2>

        {isGroup ? (
          <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-0.5">
            Group • {activeConversation.participants.length} members
          </p>
        ) : (
          <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-0.5 flex items-center justify-center gap-1">
            <Phone className="w-3 h-3 text-[#3B82F6]" />
            <span>{otherParticipant?.phone}</span>
          </p>
        )}

        {activeConversation.topic && (
          <div className="mt-3 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1E293B] border border-slate-200 dark:border-[#1E293B] text-xs text-slate-600 dark:text-[#94A3B8] text-left">
            <span className="font-semibold text-slate-800 dark:text-[#E2E8F0] block text-[10px] uppercase tracking-wider mb-0.5">
              Topic
            </span>
            {activeConversation.topic}
          </div>
        )}

        {/* Quick action triggers */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={() => togglePinConversation(activeConversation.id)}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
              activeConversation.isPinned
                ? "bg-[#3B82F6]/15 border-[#3B82F6]/40 text-[#3B82F6]"
                : "bg-white dark:bg-[#1E293B] border-slate-200 dark:border-[#1E293B] text-slate-700 dark:text-[#E2E8F0] hover:bg-slate-100 dark:hover:bg-[#1E293B]/80"
            }`}
          >
            <Pin className="w-3.5 h-3.5" />
            <span>{activeConversation.isPinned ? "Pinned" : "Pin Chat"}</span>
          </button>

          <button
            onClick={() => toggleMuteConversation(activeConversation.id)}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
              activeConversation.isMuted
                ? "bg-amber-500/15 border-amber-500/40 text-amber-500"
                : "bg-white dark:bg-[#1E293B] border-slate-200 dark:border-[#1E293B] text-slate-700 dark:text-[#E2E8F0] hover:bg-slate-100 dark:hover:bg-[#1E293B]/80"
            }`}
          >
            {activeConversation.isMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>Unmute</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Mute</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-[#1E293B] px-4 bg-white dark:bg-[#151921]">
        <button
          onClick={() => setActiveTab("details")}
          className={`py-2.5 px-3 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
            activeTab === "details"
              ? "border-[#3B82F6] text-[#3B82F6]"
              : "border-transparent text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-[#E2E8F0]"
          }`}
        >
          Details
        </button>

        {isGroup && (
          <button
            onClick={() => setActiveTab("participants")}
            className={`py-2.5 px-3 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === "participants"
                ? "border-[#3B82F6] text-[#3B82F6]"
                : "border-transparent text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-[#E2E8F0]"
            }`}
          >
            Members ({activeConversation.participants.length})
          </button>
        )}

        <button
          onClick={() => setActiveTab("media")}
          className={`py-2.5 px-3 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
            activeTab === "media"
              ? "border-[#3B82F6] text-[#3B82F6]"
              : "border-transparent text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-[#E2E8F0]"
          }`}
        >
          Shared Media ({imageMessages.length + fileMessages.length})
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {activeTab === "details" && (
          <div className="space-y-4 text-xs">
            <div className="space-y-2">
              <span className="font-semibold text-slate-400 dark:text-[#64748B] uppercase tracking-wider text-[10px]">
                Chat Metadata
              </span>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-[#1E293B] space-y-2 text-slate-600 dark:text-[#94A3B8]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-[#3B82F6]" />
                    Conversation ID
                  </span>
                  <span className="font-mono text-[10px] text-slate-800 dark:text-[#E2E8F0]">
                    {activeConversation.id}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                    Created
                  </span>
                  <span className="text-slate-800 dark:text-[#E2E8F0]">
                    {formatDateWithTime(activeConversation.createdAt)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Encryption
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    Standard TLS Mock
                  </span>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="pt-2 border-t border-slate-200 dark:border-[#1E293B]">
              <span className="font-semibold text-rose-500 uppercase tracking-wider text-[10px] block mb-2">
                Danger Zone
              </span>
              <button
                onClick={handleDelete}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Conversation</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === "participants" && isGroup && (
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-semibold text-slate-400 dark:text-[#64748B] uppercase tracking-wider">
                Group Members ({activeConversation.participants.length})
              </span>
            </div>

            <div className="space-y-1.5">
              {activeConversation.participants.map((participant) => {
                const isMe = participant.id === currentUser.id;
                return (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-[#1E293B]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Avatar
                        name={participant.name}
                        avatarUrl={participant.avatarUrl}
                        status={participant.status}
                        color={participant.color}
                        size="sm"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-slate-800 dark:text-[#E2E8F0] truncate">
                            {participant.name}
                          </span>
                          {isMe && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#3B82F6]/20 text-[#3B82F6] font-medium">
                              You
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-[#94A3B8] block truncate">
                          {participant.phone}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] capitalize px-2 py-0.5 rounded-full font-medium ${
                        participant.status === "online"
                          ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
                          : "text-slate-400 dark:text-[#64748B] bg-slate-200 dark:bg-[#151921]"
                      }`}
                    >
                      {participant.status || "offline"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "media" && (
          <div className="space-y-4">
            {/* Images */}
            <div>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-[#64748B] uppercase tracking-wider block mb-2">
                Images ({imageMessages.length})
              </span>
              {imageMessages.length === 0 ? (
                <p className="text-xs text-slate-400 dark:text-[#64748B] italic py-2">
                  No shared images yet.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {imageMessages.map((m) => (
                    <div
                      key={m.id}
                      className="aspect-video rounded-lg overflow-hidden border border-slate-200 dark:border-[#1E293B]"
                    >
                      <img
                        src={m.mediaUrl}
                        alt="Shared media"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Documents */}
            <div>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-[#64748B] uppercase tracking-wider block mb-2">
                Files & Documents ({fileMessages.length})
              </span>
              {fileMessages.length === 0 ? (
                <p className="text-xs text-slate-400 dark:text-[#64748B] italic py-2">
                  No files shared yet.
                </p>
              ) : (
                <div className="space-y-1.5">
                  {fileMessages.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-[#1E293B] text-xs text-slate-800 dark:text-[#E2E8F0]"
                    >
                      <FileText className="w-4 h-4 text-[#3B82F6] flex-shrink-0" />
                      <span className="truncate flex-1">
                        {m.fileName || "Attachment.pdf"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInfoDrawer;
