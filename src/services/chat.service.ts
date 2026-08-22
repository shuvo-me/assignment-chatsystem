import {
  useMutation,
  useQuery,
  type QueryClient,
} from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import type { Conversation, Message, User } from "@/types/chat";

interface ApiUser {
  _id: string;
  name: string;
  phone: string;
}

interface ApiLastMessage {
  text?: string;
  sender?: string;
  createdAt?: string;
}

interface ApiConversation {
  _id: string;
  type: "direct" | "group";
  lastMessage?: ApiLastMessage;
  updatedAt: string;
  createdAt?: string;
  // direct
  participant?: ApiUser;
  // group
  name?: string;
  createdBy?: string;
  admins?: string[];
  participants?: ApiUser[];
}

export interface ApiMessage {
  _id: string;
  conversation: string;
  sender: string;
  text: string;
  createdAt: string;
}

export function normalizeMessage(apiMsg: ApiMessage): Message {
  return {
    id: apiMsg._id,
    conversationId: apiMsg.conversation,
    senderId: apiMsg.sender,
    text: apiMsg.text,
    timestamp: apiMsg.createdAt,
    status: "sent",
    type: "text",
  };
}

function normalizeParticipant(apiUser: ApiUser): User {
  return {
    id: apiUser._id,
    name: apiUser.name,
    phone: apiUser.phone,
    status: "offline",
  };
}

function normalizeLastMessage(
  lastMessage: ApiLastMessage | undefined,
  conversationId: string,
  fallbackTimestamp: string,
): Message | undefined {
  if (!lastMessage || (!lastMessage.text && !lastMessage.sender)) {
    return undefined;
  }
  return {
    id: `${conversationId}-last`,
    conversationId,
    senderId: lastMessage.sender ?? "",
    text: lastMessage.text ?? "",
    timestamp: lastMessage.createdAt ?? fallbackTimestamp,
    status: "sent",
    type: "text",
  };
}

function normalizeConversation(apiConv: ApiConversation): Conversation {
  const isDirect = apiConv.type === "direct";
  const participants = isDirect
    ? apiConv.participant
      ? [normalizeParticipant(apiConv.participant)]
      : []
    : (apiConv.participants ?? []).map(normalizeParticipant);

  return {
    id: apiConv._id,
    type: apiConv.type,
    name: isDirect ? (apiConv.participant?.name ?? "") : (apiConv.name ?? ""),
    participants,
    participantIds: participants.map((p) => p.id),
    lastMessage: normalizeLastMessage(
      apiConv.lastMessage,
      apiConv._id,
      apiConv.updatedAt,
    ),
    unreadCount: 0,
    updatedAt: apiConv.updatedAt,
    createdAt: apiConv.createdAt ?? apiConv.updatedAt,
    createdBy: apiConv.createdBy,
    admins: apiConv.admins,
  };
}

function toServiceError(err: unknown, fallback: string): Error {
  if (isAxiosError(err)) {
    return new Error(
      err.response?.data?.message ?? fallback,
    );
  }
  return new Error("Something went wrong. Please try again.");
}

async function fetchConversations(): Promise<Conversation[]> {
  try {
    const res = await axios.get("/api/conversations");
    return ((res.data?.data ?? []) as ApiConversation[]).map(
      normalizeConversation,
    );
  } catch (err) {
    throw toServiceError(
      err,
      "Could not load conversations. Please try again.",
    );
  }
}

async function createDirectConversation(
  userId: string,
): Promise<string> {
  try {
    const res = await axios.post("/api/conversations", { userId });
    return res.data._id as string;
  } catch (err) {
    throw toServiceError(
      err,
      "Failed to start conversation. Please try again.",
    );
  }
}

async function fetchMessages(
  conversationId: string,
): Promise<Message[]> {
  try {
    const res = await axios.get(
      `/api/conversations/${conversationId}/messages`,
    );
    // upstream returns newest-first; normalize to oldest-first for rendering
    return ((res.data?.messages ?? []) as ApiMessage[])
      .map(normalizeMessage)
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      );
  } catch (err) {
    throw toServiceError(err, "Could not load messages. Please try again.");
  }
}

async function sendMessageRequest(
  conversationId: string,
  text: string,
): Promise<Message> {
  try {
    const res = await axios.post("/api/messages", { conversationId, text });
    return normalizeMessage(res.data);
  } catch (err) {
    throw toServiceError(err, "Failed to send message. Please try again.");
  }
}

// --- Imperative cache helpers (used by ChatContext + socket handlers) ---

export function bumpConversationPreview(
  queryClient: QueryClient,
  msg: Message,
): void {
  queryClient.setQueryData<Conversation[]>(["conversations"], (prev) => {
    if (!prev) return prev;
    const target = prev.find((c) => c.id === msg.conversationId);
    if (!target) return prev;
    const updated: Conversation = {
      ...target,
      lastMessage: msg,
      updatedAt: msg.timestamp,
    };
    return [updated, ...prev.filter((c) => c.id !== updated.id)];
  });
}

export function applyIncomingMessage(
  queryClient: QueryClient,
  incoming: Message,
): void {
  // Append into the message history cache, deduping self-echoes
  queryClient.setQueryData<Message[]>(
    ["messages", incoming.conversationId],
    (prev) => {
      if (!prev) return prev;
      return prev.some((m) => m.id === incoming.id) ? prev : [...prev, incoming];
    },
  );

  const knownConversations = queryClient.getQueryData<
    Conversation[] | undefined
  >(["conversations"]);

  if (!knownConversations?.some((c) => c.id === incoming.conversationId)) {
    // Conversation we don't have yet (someone started a chat with us)
    queryClient.invalidateQueries({ queryKey: ["conversations"] });
  }

  bumpConversationPreview(queryClient, incoming);
}

export function applyLocalReaction(
  queryClient: QueryClient,
  conversationId: string,
  messageId: string,
  userId: string,
  emoji: string,
): void {
  queryClient.setQueryData<Message[]>(["messages", conversationId], (prev) => {
    if (!prev) return prev;
    return prev.map((m) => {
      if (m.id !== messageId) return m;

      const isToggleOff = (m.reactions ?? []).some(
        (r) => r.emoji === emoji && r.users.includes(userId),
      );

      let reactions = (m.reactions ?? [])
        .map((r) =>
          r.users.includes(userId)
            ? { ...r, users: r.users.filter((u) => u !== userId) }
            : r,
        )
        .filter((r) => r.users.length > 0);

      if (!isToggleOff) {
        const existing = reactions.find((r) => r.emoji === emoji);
        reactions =
          existing !== undefined
            ? reactions.map((r) =>
                r.emoji === emoji ? { ...r, users: [...r.users, userId] } : r,
              )
            : [...reactions, { emoji, count: 1, users: [userId] }];
      }

      return {
        ...m,
        reactions: reactions.map((r) => ({ ...r, count: r.users.length })),
      };
    });
  });
}

// --- Service hooks (authService-style convention) ---

export const chatService = {
  useConversations(opts?: { enabled?: boolean }) {
    return useQuery({
      queryKey: ["conversations"],
      queryFn: fetchConversations,
      enabled: opts?.enabled,
      staleTime: 30 * 1000,
    });
  },

  useMessages(conversationId: string | null) {
    return useQuery({
      queryKey: ["messages", conversationId],
      queryFn: () => fetchMessages(conversationId as string),
      enabled: Boolean(conversationId),
      // socket + send handlers keep this cache fresh; never refetch on remount
      staleTime: Infinity,
    });
  },

  useCreateDirectConversation() {
    return useMutation({
      mutationFn: createDirectConversation,
    });
  },

  useSendMessage() {
    return useMutation({
      mutationFn: ({
        conversationId,
        text,
      }: {
        conversationId: string;
        text: string;
      }) => sendMessageRequest(conversationId, text),
    });
  },
};
