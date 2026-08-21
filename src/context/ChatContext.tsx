"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { chatService } from "../services/chatService";
import { authService } from "../services/auth.service";
import { useQueryClient } from "@tanstack/react-query";
import {
  Conversation,
  Message,
  MessageType,
  User,
} from "../types/chat";

interface ChatContextType {
  currentUser: User;
  isAuthenticated: boolean;
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];
  isLoadingConversations: boolean;
  isLoadingMessages: boolean;
  isSendingMessage: boolean;
  activeFilter: "all" | "direct" | "group" | "unread";
  searchQuery: string;
  replyingTo: Message | null;
  typingUsers: string[]; // List of user names typing in active conversation
  showInfoDrawer: boolean;
  showNewChatModal: boolean;
  showNewGroupModal: boolean;
  showSearchModal: boolean;
  showLoginModal: boolean;
  error: string | null;

  // Actions
  setActiveFilter: (filter: "all" | "direct" | "group" | "unread") => void;
  setSearchQuery: (query: string) => void;
  setReplyingTo: (msg: Message | null) => void;
  setShowInfoDrawer: (show: boolean) => void;
  setShowNewChatModal: (show: boolean) => void;
  setShowNewGroupModal: (show: boolean) => void;
  setShowSearchModal: (show: boolean) => void;
  setShowLoginModal: (show: boolean) => void;
  clearError: () => void;

  completeLogin: (user: User) => void;
  logout: () => Promise<void>;
  selectConversation: (conversationId: string | null) => Promise<void>;
  sendMessage: (
    text: string,
    type?: MessageType,
    mediaUrl?: string,
    fileName?: string,
  ) => Promise<void>;
  toggleReaction: (messageId: string, emoji: string) => Promise<void>;
  createDirectChat: (recipientId: string) => Promise<Conversation>;
  createGroupChat: (
    name: string,
    participantIds: string[],
    topic?: string,
  ) => Promise<Conversation>;

  // Real-time Simulation helpers
  simulateIncomingMessage: (customText?: string) => Promise<void>;
  triggerTypingSimulation: () => void;
  resetAllData: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const [isLoadingConversations, setIsLoadingConversations] =
    useState<boolean>(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  const [activeFilter, setActiveFilter] = useState<
    "all" | "direct" | "group" | "unread"
  >("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  const [showInfoDrawer, setShowInfoDrawer] = useState<boolean>(false);
  const [showNewChatModal, setShowNewChatModal] = useState<boolean>(false);
  const [showNewGroupModal, setShowNewGroupModal] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const logoutMutation = authService.useLogout();
  const meQuery = authService.useMe();
  const queryClient = useQueryClient();

  const currentUser = pendingUser ?? meQuery.data ?? chatService.getCurrentUser();
  const isAuthenticated = Boolean(pendingUser || meQuery.data);

  // Load conversations initially
  const refreshConversations = useCallback(async () => {
    try {
      setIsLoadingConversations(true);
      const list = await chatService.getConversations();
      setConversations(list);

      // If we don't have an active conversation and screen is desktop, select first conversation
      if (list.length > 0 && !activeConversation) {
        // select top conversation
        const first = list[0];
        setActiveConversation(first);
        const msgs = await chatService.getMessages(first.id);
        setMessages(msgs);
        chatService.markAsRead(first.id);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load conversations");
    } finally {
      setIsLoadingConversations(false);
    }
  }, [activeConversation]);

  useEffect(() => {
    refreshConversations();
  }, []);

  const selectConversation = async (conversationId: string | null) => {
    if (!conversationId) {
      setActiveConversation(null);
      setMessages([]);
      return;
    }

    try {
      setIsLoadingMessages(true);
      const conv = conversations.find((c) => c.id === conversationId);
      if (conv) {
        setActiveConversation(conv);
        chatService.markAsRead(conversationId);
        // update local badge
        setConversations((prev) =>
          prev.map((c) =>
            c.id === conversationId ? { ...c, unreadCount: 0 } : c,
          ),
        );
      }

      const msgs = await chatService.getMessages(conversationId);
      setMessages(msgs);
      setReplyingTo(null);
      setTypingUsers([]);
    } catch (err: any) {
      setError(err.message || "Failed to load messages");
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const completeLogin = (user: User) => {
    setPendingUser(user);
    setShowLoginModal(false);
    refreshConversations();
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch {
      // clear local session even if the request fails
    }
    setPendingUser(null);
    queryClient.resetQueries({ queryKey: ["auth", "me"] });
    setActiveConversation(null);
    setMessages([]);
    setShowLoginModal(false);
  };

  const sendMessage = async (
    text: string,
    type?: MessageType,
    mediaUrl?: string,
    fileName?: string,
  ) => {
    if (!activeConversation) return;
    const cleanText = text.trim();
    if (!cleanText && !mediaUrl) return;

    try {
      setIsSendingMessage(true);
      const newMsg = await chatService.sendMessage({
        conversationId: activeConversation.id,
        text: cleanText,
        type,
        mediaUrl,
        fileName,
        replyTo: replyingTo
          ? {
              id: replyingTo.id,
              text: replyingTo.text,
              senderName: replyingTo.senderName || "Unknown",
            }
          : undefined,
      });

      setMessages((prev) => [...prev, newMsg]);
      setReplyingTo(null);

      // Refresh list to update ordering and lastMessage
      const updatedList = await chatService.getConversations();
      setConversations(updatedList);

      // Simulate a quick auto-response after 2.5 seconds if direct chat to showcase real-time feel
      if (activeConversation.type === "direct" && Math.random() > 0.4) {
        setTimeout(() => {
          triggerTypingSimulation();
          setTimeout(async () => {
            if (activeConversation) {
              await simulateIncomingMessage();
            }
          }, 2000);
        }, 1200);
      }
    } catch (err: any) {
      setError(err.message || "Failed to send message");
    } finally {
      setIsSendingMessage(false);
    }
  };

  const toggleReaction = async (messageId: string, emoji: string) => {
    if (!activeConversation) return;
    try {
      const updatedMsg = await chatService.toggleReaction(
        activeConversation.id,
        messageId,
        emoji,
      );
      if (updatedMsg) {
        setMessages((prev) =>
          prev.map((m) => (m.id === messageId ? { ...updatedMsg } : m)),
        );
      }
    } catch (err: any) {
      setError(err.message || "Failed to update reaction");
    }
  };

  const createDirectChat = async (
    recipientId: string,
  ): Promise<Conversation> => {
    try {
      const newConv = await chatService.createDirectConversation({
        recipientId,
      });
      const list = await chatService.getConversations();
      setConversations(list);
      await selectConversation(newConv.id);
      setShowNewChatModal(false);
      return newConv;
    } catch (err: any) {
      setError(err.message || "Failed to start conversation");
      throw err;
    }
  };

  const createGroupChat = async (
    name: string,
    participantIds: string[],
    topic?: string,
  ): Promise<Conversation> => {
    try {
      const newConv = await chatService.createGroupConversation({
        name,
        participantIds,
        topic,
      });
      const list = await chatService.getConversations();
      setConversations(list);
      await selectConversation(newConv.id);
      setShowNewGroupModal(false);
      return newConv;
    } catch (err: any) {
      setError(err.message || "Failed to create group");
      throw err;
    }
  };

  const simulateIncomingMessage = async (customText?: string) => {
    if (!activeConversation) return;
    try {
      const newMsg = await chatService.simulateIncomingMessage(
        activeConversation.id,
        customText,
      );
      setMessages((prev) => [...prev, newMsg]);
      const list = await chatService.getConversations();
      setConversations(list);
      setTypingUsers([]);
    } catch (err: any) {
      setError(err.message || "Simulation error");
    }
  };

  const triggerTypingSimulation = () => {
    if (!activeConversation) return;
    const otherMember = activeConversation.participants.find(
      (p) => p.id !== currentUser.id,
    );
    const typingName = otherMember ? otherMember.name.split(" ")[0] : "Someone";
    setTypingUsers([typingName]);

    setTimeout(() => {
      setTypingUsers([]);
    }, 3500);
  };

  const resetAllData = () => {
    chatService.resetToDefaults();
    setPendingUser(null);
    setActiveConversation(null);
    setMessages([]);
    setReplyingTo(null);
    refreshConversations();
  };

  const clearError = () => setError(null);

  return (
    <ChatContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        conversations,
        activeConversation,
        messages,
        isLoadingConversations,
        isLoadingMessages,
        isSendingMessage,
        activeFilter,
        searchQuery,
        replyingTo,
        typingUsers,
        showInfoDrawer,
        showNewChatModal,
        showNewGroupModal,
        showSearchModal,
        showLoginModal,
        error,
        setActiveFilter,
        setSearchQuery,
        setReplyingTo,
        setShowInfoDrawer,
        setShowNewChatModal,
        setShowNewGroupModal,
        setShowSearchModal,
        setShowLoginModal,
        clearError,
        completeLogin,
        logout,
        selectConversation,
        sendMessage,
        toggleReaction,
        createDirectChat,
        createGroupChat,
        simulateIncomingMessage,
        triggerTypingSimulation,
        resetAllData,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
