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

export async function fetchConversations(): Promise<Conversation[]> {
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

export async function createDirectConversation(
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
