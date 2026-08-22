"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { chatService as legacyChatService } from "../services/chatService";
import { authService } from "../services/auth.service";
import {
  applyIncomingMessage,
  applyLocalReaction,
  chatService,
  normalizeMessage,
  type ApiMessage,
} from "../services/chat.service";
import { connectSocket, disconnectSocket } from "@/lib/socket";
import type { Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Conversation,
  Message,
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
  sendMessage: (text: string) => Promise<void>;
  toggleReaction: (messageId: string, emoji: string) => void;
  createDirectChat: (recipientId: string) => Promise<Conversation>;
  createGroupChat: (
    name: string,
    participantIds: string[],
    topic?: string,
  ) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);

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

  // Ref so async callbacks always read the fresh active conversation
  const activeConversationRef = useRef<Conversation | null>(null);
  useEffect(() => {
    activeConversationRef.current = activeConversation;
  }, [activeConversation]);

  const logoutMutation = authService.useLogout();
  const meQuery = authService.useMe();
  const queryClient = useQueryClient();
  const router = useRouter();

  const currentUser =
    pendingUser ?? meQuery.data ?? legacyChatService.getCurrentUser();
  const isAuthenticated = Boolean(pendingUser || meQuery.data);

  // Chat data lives in the React Query cache (chatService hooks)
  const conversationsQuery = chatService.useConversations({
    enabled: isAuthenticated,
  });
  const messagesQuery = chatService.useMessages(activeConversation?.id ?? null);
  const sendMessageMutation = chatService.useSendMessage();
  const createDirectChatMutation = chatService.useCreateDirectConversation();

  const conversations = useMemo(
    () => conversationsQuery.data ?? [],
    [conversationsQuery.data],
  );
  const messages = useMemo(
    () => messagesQuery.data ?? [],
    [messagesQuery.data],
  );
  const isLoadingConversations =
    isAuthenticated && conversationsQuery.isPending;
  const isLoadingMessages =
    Boolean(activeConversation) && messagesQuery.isPending;
  const isSendingMessage = sendMessageMutation.isPending;

  // Auto-select the top conversation once the list is available
  useEffect(() => {
    if (!isAuthenticated || conversations.length === 0) return;
    if (!activeConversationRef.current) {
      setActiveConversation(conversations[0]);
    }
  }, [isAuthenticated, conversations]);

  const selectConversation = async (conversationId: string | null) => {
    if (!conversationId) {
      setActiveConversation(null);
      return;
    }

    const conv = conversations.find((c) => c.id === conversationId);
    if (conv) {
      setActiveConversation(conv);
      setReplyingTo(null);
      setTypingUsers([]);
    }
    // History loads automatically via chatService.useMessages(activeId)
  };

  const completeLogin = (user: User) => {
    setPendingUser(user);
    setShowLoginModal(false);
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch {
      // clear local session even if the request fails
    }
    disconnectSocket();
    setPendingUser(null);
    queryClient.resetQueries({ queryKey: ["auth", "me"] });
    queryClient.removeQueries({ queryKey: ["conversations"] });
    queryClient.removeQueries({ queryKey: ["messages"] });
    setActiveConversation(null);
    setShowLoginModal(false);
    router.replace("/login");
  };

  const sendMessage = async (text: string) => {
    const conversation = activeConversationRef.current;
    if (!conversation) return;
    const cleanText = text.trim();
    if (!cleanText) return;

    try {
      const newMsg = await sendMessageMutation.mutateAsync({
        conversationId: conversation.id,
        text: cleanText,
      });
      applyIncomingMessage(queryClient, newMsg);
      setReplyingTo(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send message",
      );
    }
  };

  const toggleReaction = (messageId: string, emoji: string) => {
    const conversation = activeConversationRef.current;
    if (!conversation || !currentUser?.id) return;
    applyLocalReaction(
      queryClient,
      conversation.id,
      messageId,
      currentUser.id,
      emoji,
    );
  };

  const createDirectChat = async (
    recipientId: string,
  ): Promise<Conversation> => {
    try {
      const newId =
        await createDirectChatMutation.mutateAsync(recipientId);
      await queryClient.invalidateQueries({ queryKey: ["conversations"] });
      const list =
        queryClient.getQueryData<Conversation[]>(["conversations"]) ?? [];
      const newConv = list.find((c) => c.id === newId);
      if (newConv) {
        setActiveConversation(newConv);
      }
      setShowNewChatModal(false);
      return (
        newConv ?? {
          id: newId,
          type: "direct",
          name: "",
          participants: [],
          participantIds: [recipientId],
          unreadCount: 0,
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        }
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to start conversation",
      );
      throw err;
    }
  };

  const createGroupChat = async (
    name: string,
    participantIds: string[],
    topic?: string,
  ): Promise<void> => {
    try {
      // still mock-backed until the group round; refresh real list afterwards
      await legacyChatService.createGroupConversation({
        name,
        participantIds,
        topic,
      });
      await queryClient.invalidateQueries({ queryKey: ["conversations"] });
      setShowNewGroupModal(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create group",
      );
      throw err;
    }
  };

  const clearError = () => setError(null);

  // Real-time socket connection: connect while authenticated, rebind on auth change
  useEffect(() => {
    if (!isAuthenticated) return;

    let disposed = false;
    let boundSocket: Socket | null = null;

    const bind = async () => {
      try {
        const res = await axios.get("/api/auth/token");
        if (disposed) return;
        const sock = connectSocket(res.data.token);
        boundSocket = sock;

        sock.on("message:new", (rawMsg: ApiMessage) => {
          applyIncomingMessage(queryClient, normalizeMessage(rawMsg));
        });

        sock.on("conversation:updated", () => {
          queryClient.invalidateQueries({ queryKey: ["conversations"] });
        });
      } catch {
        // token unavailable — stay offline until auth state changes again
      }
    };

    bind();

    return () => {
      disposed = true;
      boundSocket?.off("message:new");
      boundSocket?.off("conversation:updated");
      disconnectSocket();
    };
  }, [isAuthenticated, queryClient]);

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
