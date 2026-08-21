"use client";

import { useChat } from "@/context/ChatContext";
import { EmptyState } from "../common/EmptyState";
import { Toast } from "../common/Toast";
import { NewChatModal } from "../sidebar/NewChatModal";
import { NewGroupModal } from "../sidebar/NewGroupModal";
import { ChatHeader } from "./ChatHeader";
import ChatInfoDrawer from "./ChatInfoDrawer";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import MessageSearchModal from "./MessageSearchModal";

export default function ChatScreen() {
  const {
    isAuthenticated,
    activeConversation,
    selectConversation,
    showNewChatModal,
    setShowNewChatModal,
    showNewGroupModal,
    setShowNewGroupModal,
    error,
    clearError,
  } = useChat();
  return (
    <>
      {/* Center Chat Panel */}
      <section
        aria-label="Active Conversation"
        className={`flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-[#0B0E14] relative transition-all ${
          !activeConversation ? "hidden md:flex" : "flex"
        }`}
      >
        {activeConversation ? (
          <>
            <ChatHeader onBackMobile={() => selectConversation(null)} />
            <MessageList />
            <MessageInput />
          </>
        ) : (
          <EmptyState
            type="no-active-chat"
            onAction={() => setShowNewChatModal(true)}
            actionLabel="Start a Conversation"
          />
        )}
      </section>

      {/* Right Info Drawer */}
      <ChatInfoDrawer />

      {/* Modals & Dialogs */}
      <NewChatModal
        isOpen={showNewChatModal}
        onClose={() => setShowNewChatModal(false)}
      />

      <NewGroupModal
        isOpen={showNewGroupModal}
        onClose={() => setShowNewGroupModal(false)}
      />

      <MessageSearchModal />

      {/* Error Toast */}
      {error && <Toast message={error} type="error" onClose={clearError} />}
    </>
  );
}
