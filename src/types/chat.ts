export type UserStatus = 'online' | 'offline' | 'away' | 'busy';

export interface User {
    id: string;
    name: string;
    phone: string;
    avatarUrl?: string;
    status: UserStatus;
    lastSeen?: string;
    bio?: string;
    color?: string;
}

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
export type MessageType = 'text' | 'image' | 'file' | 'audio' | 'system';

export interface Reaction {
    emoji: string;
    count: number;
    users: string[]; // user IDs
}

export interface ReplyReference {
    id: string;
    text: string;
    senderName: string;
}

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    senderName?: string;
    senderAvatar?: string;
    text: string;
    timestamp: string;
    status: MessageStatus;
    type?: MessageType;
    mediaUrl?: string;
    fileName?: string;
    fileSize?: string;
    audioDuration?: number;
    replyTo?: ReplyReference;
    reactions?: Reaction[];
    isEdited?: boolean;
}

export type ConversationType = 'direct' | 'group';

export interface Conversation {
    id: string;
    type: ConversationType;
    name: string;
    avatarUrl?: string;
    avatarColor?: string;
    participants: User[];
    participantIds: string[];
    lastMessage?: Message;
    unreadCount: number;
    updatedAt: string;
    createdAt: string;
    createdBy?: string;
    isPinned?: boolean;
    isMuted?: boolean;
    topic?: string;
}

export interface SendMessagePayload {
    conversationId: string;
    text: string;
    replyTo?: ReplyReference;
    type?: MessageType;
    mediaUrl?: string;
    fileName?: string;
}

export interface CreateDirectConversationPayload {
    recipientId: string;
}

export interface CreateGroupConversationPayload {
    name: string;
    participantIds: string[];
    avatarColor?: string;
    topic?: string;
}

export interface LoginPayload {
    phone: string;
    name: string;
}
