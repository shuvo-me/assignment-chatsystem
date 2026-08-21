import {
    INITIAL_CONVERSATIONS,
    INITIAL_CURRENT_USER,
    INITIAL_MESSAGES,
    MOCK_USERS
} from '@/lib/mockData';
import {
    Conversation,
    CreateDirectConversationPayload,
    CreateGroupConversationPayload,
    LoginPayload,
    Message,
    SendMessagePayload,
    User
} from '../types/chat';

class ChatService {
    private users: User[] = [...MOCK_USERS];
    private conversations: Conversation[] = [...INITIAL_CONVERSATIONS];
    private messages: Record<string, Message[]> = { ...INITIAL_MESSAGES };
    private currentUser: User = INITIAL_CURRENT_USER;
    private isAuthenticatedState: boolean = true;

    constructor() {
        // Attempt to load stored state from localStorage if available
        this.loadFromStorage();
    }

    private loadFromStorage() {
        try {
            const savedAuth = localStorage.getItem('chat_authenticated');
            if (savedAuth !== null) {
                this.isAuthenticatedState = savedAuth === 'true';
            }
            const savedUser = localStorage.getItem('chat_current_user');
            if (savedUser) {
                this.currentUser = JSON.parse(savedUser);
            }
            const savedConvs = localStorage.getItem('chat_conversations');
            if (savedConvs) {
                this.conversations = JSON.parse(savedConvs);
            }
            const savedMsgs = localStorage.getItem('chat_messages');
            if (savedMsgs) {
                this.messages = JSON.parse(savedMsgs);
            }
            const savedUsers = localStorage.getItem('chat_all_users');
            if (savedUsers) {
                this.users = JSON.parse(savedUsers);
            }
        } catch (e) {
            console.warn('Could not load chat cache from localStorage:', e);
        }
    }

    private saveToStorage() {
        try {
            localStorage.setItem('chat_authenticated', String(this.isAuthenticatedState));
            localStorage.setItem('chat_current_user', JSON.stringify(this.currentUser));
            localStorage.setItem('chat_conversations', JSON.stringify(this.conversations));
            localStorage.setItem('chat_messages', JSON.stringify(this.messages));
            localStorage.setItem('chat_all_users', JSON.stringify(this.users));
        } catch (e) {
            console.warn('Could not save chat state to localStorage:', e);
        }
    }

    public isAuthenticated(): boolean {
        return this.isAuthenticatedState;
    }

    public getCurrentUser(): User {
        return this.currentUser;
    }

    public async login(payload: LoginPayload): Promise<User> {
        // Artificial latency for authentic network feel
        await new Promise((resolve) => setTimeout(resolve, 350));

        const cleanPhone = payload.phone.trim();
        const cleanName = payload.name.trim();

        if (!cleanPhone || !cleanName) {
            throw new Error('Phone number and display name are required.');
        }

        // Find existing user by phone or create new one
        let existingUser = this.users.find((u) => u.phone.replace(/\D/g, '') === cleanPhone.replace(/\D/g, ''));
        if (existingUser) {
            // Update name if changed
            existingUser.name = cleanName;
            existingUser.status = 'online';
            this.currentUser = existingUser;
        } else {
            const colors = ['#6366f1', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const newUser: User = {
                id: `user_${Date.now()}`,
                name: cleanName,
                phone: cleanPhone,
                status: 'online',
                bio: 'Hey there! I am using Chat App.',
                color: randomColor,
                avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}&backgroundColor=${randomColor.replace('#', '')}`,
            };
            this.users.push(newUser);
            this.currentUser = newUser;
        }

        this.isAuthenticatedState = true;
        this.saveToStorage();
        return this.currentUser;
    }

    public async logout(): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 200));
        this.isAuthenticatedState = false;
        localStorage.setItem('chat_authenticated', 'false');
    }

    public async searchUsers(query: string): Promise<User[]> {
        await new Promise((resolve) => setTimeout(resolve, 150));
        const trimmed = query.toLowerCase().trim();
        if (!trimmed) {
            // return all users except current user
            return this.users.filter((u) => u.id !== this.currentUser.id);
        }
        return this.users.filter(
            (u) =>
                u.id !== this.currentUser.id &&
                (u.name.toLowerCase().includes(trimmed) || u.phone.includes(trimmed))
        );
    }

    public async getConversations(): Promise<Conversation[]> {
        await new Promise((resolve) => setTimeout(resolve, 200));
        return [...this.conversations].sort(
            (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
    }

    public async getMessages(conversationId: string): Promise<Message[]> {
        await new Promise((resolve) => setTimeout(resolve, 200));
        return [...(this.messages[conversationId] || [])];
    }

    public async createDirectConversation(payload: CreateDirectConversationPayload): Promise<Conversation> {
        await new Promise((resolve) => setTimeout(resolve, 250));

        const recipient = this.users.find((u) => u.id === payload.recipientId);
        if (!recipient) {
            throw new Error('Selected contact could not be found.');
        }

        // Check if direct conversation already exists between current user & recipient
        const existing = this.conversations.find(
            (c) =>
                c.type === 'direct' &&
                c.participantIds.includes(this.currentUser.id) &&
                c.participantIds.includes(recipient.id)
        );

        if (existing) {
            return existing;
        }

        const newConvId = `conv_${Date.now()}`;
        const newConv: Conversation = {
            id: newConvId,
            type: 'direct',
            name: recipient.name,
            avatarUrl: recipient.avatarUrl,
            avatarColor: recipient.color || '#6366f1',
            participants: [this.currentUser, recipient],
            participantIds: [this.currentUser.id, recipient.id],
            unreadCount: 0,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            topic: recipient.bio || 'Direct message',
        };

        this.conversations.unshift(newConv);
        this.messages[newConvId] = [];
        this.saveToStorage();
        return newConv;
    }

    public async createGroupConversation(payload: CreateGroupConversationPayload): Promise<Conversation> {
        await new Promise((resolve) => setTimeout(resolve, 300));

        if (!payload.name.trim()) {
            throw new Error('Group name cannot be empty.');
        }

        if (!payload.participantIds || payload.participantIds.length === 0) {
            throw new Error('Please select at least one participant for the group.');
        }

        const participants = [
            this.currentUser,
            ...this.users.filter((u) => payload.participantIds.includes(u.id) && u.id !== this.currentUser.id)
        ];

        const newConvId = `conv_grp_${Date.now()}`;
        const newConv: Conversation = {
            id: newConvId,
            type: 'group',
            name: payload.name.trim(),
            avatarColor: payload.avatarColor || '#8b5cf6',
            participants,
            participantIds: participants.map((p) => p.id),
            unreadCount: 0,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            createdBy: this.currentUser.id,
            topic: payload.topic || 'Group discussion',
        };

        // Add a system welcome message
        const welcomeMsg: Message = {
            id: `msg_init_${Date.now()}`,
            conversationId: newConvId,
            senderId: 'system',
            senderName: 'System',
            text: `${this.currentUser.name} created group "${newConv.name}" with ${participants.length} members.`,
            timestamp: new Date().toISOString(),
            status: 'read',
            type: 'system',
        };

        this.conversations.unshift(newConv);
        this.messages[newConvId] = [welcomeMsg];
        newConv.lastMessage = welcomeMsg;

        this.saveToStorage();
        return newConv;
    }

    public async sendMessage(payload: SendMessagePayload): Promise<Message> {
        const trimmed = payload.text.trim();
        if (!trimmed && !payload.mediaUrl) {
            throw new Error('Empty messages cannot be sent.');
        }

        const conv = this.conversations.find((c) => c.id === payload.conversationId);
        if (!conv) {
            throw new Error('Conversation not found.');
        }

        const newMsg: Message = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            conversationId: payload.conversationId,
            senderId: this.currentUser.id,
            senderName: this.currentUser.name,
            senderAvatar: this.currentUser.avatarUrl,
            text: trimmed,
            timestamp: new Date().toISOString(),
            status: 'sending',
            type: payload.type || 'text',
            mediaUrl: payload.mediaUrl,
            fileName: payload.fileName,
            replyTo: payload.replyTo,
        };

        if (!this.messages[payload.conversationId]) {
            this.messages[payload.conversationId] = [];
        }

        this.messages[payload.conversationId].push(newMsg);
        conv.lastMessage = newMsg;
        conv.updatedAt = newMsg.timestamp;

        this.saveToStorage();

        // Simulate optimistic delivery progression: sending -> sent -> delivered
        setTimeout(() => {
            newMsg.status = 'sent';
            this.saveToStorage();
        }, 400);

        setTimeout(() => {
            newMsg.status = 'delivered';
            this.saveToStorage();
        }, 900);

        return newMsg;
    }

    public async toggleReaction(conversationId: string, messageId: string, emoji: string): Promise<Message | null> {
        const msgList = this.messages[conversationId];
        if (!msgList) return null;

        const message = msgList.find((m) => m.id === messageId);
        if (!message) return null;

        if (!message.reactions) {
            message.reactions = [];
        }

        const existingReactionIndex = message.reactions.findIndex((r) => r.emoji === emoji);
        const userId = this.currentUser.id;

        if (existingReactionIndex > -1) {
            const reaction = message.reactions[existingReactionIndex];
            if (reaction.users.includes(userId)) {
                // remove user reaction
                reaction.users = reaction.users.filter((id) => id !== userId);
                reaction.count -= 1;
                if (reaction.count <= 0) {
                    message.reactions.splice(existingReactionIndex, 1);
                }
            } else {
                // add user reaction
                reaction.users.push(userId);
                reaction.count += 1;
            }
        } else {
            // create new reaction
            message.reactions.push({
                emoji,
                count: 1,
                users: [userId],
            });
        }

        this.saveToStorage();
        return message;
    }

    public markAsRead(conversationId: string): void {
        const conv = this.conversations.find((c) => c.id === conversationId);
        if (conv) {
            conv.unreadCount = 0;
            this.saveToStorage();
        }
    }

    public async simulateIncomingMessage(
        conversationId: string,
        customText?: string,
        senderId?: string
    ): Promise<Message> {
        const conv = this.conversations.find((c) => c.id === conversationId);
        if (!conv) {
            throw new Error('Conversation not found.');
        }

        // Determine sender from other participants
        const otherParticipants = conv.participants.filter((p) => p.id !== this.currentUser.id);
        const sender = senderId
            ? this.users.find((u) => u.id === senderId) || otherParticipants[0]
            : (otherParticipants.length > 0 ? otherParticipants[Math.floor(Math.random() * otherParticipants.length)] : MOCK_USERS[1]);

        const sampleReplies = [
            "Thanks for clarifying! That makes complete sense.",
            "Just checked the latest branch, everything compiles without any errors!",
            "I love how smooth the message reactions and auto-scroll feel.",
            "Are we ready for the client demo later this afternoon?",
            "Let me know if you need any additional assets or test payloads.",
            "Looks really clean and well engineered!",
        ];

        const text = customText || sampleReplies[Math.floor(Math.random() * sampleReplies.length)];

        const incomingMsg: Message = {
            id: `msg_inc_${Date.now()}`,
            conversationId,
            senderId: sender.id,
            senderName: sender.name,
            senderAvatar: sender.avatarUrl,
            text,
            timestamp: new Date().toISOString(),
            status: 'delivered',
        };

        if (!this.messages[conversationId]) {
            this.messages[conversationId] = [];
        }

        this.messages[conversationId].push(incomingMsg);
        conv.lastMessage = incomingMsg;
        conv.updatedAt = incomingMsg.timestamp;

        // If not active, or in background, add unread count
        this.saveToStorage();
        return incomingMsg;
    }

    public resetToDefaults() {
        this.currentUser = INITIAL_CURRENT_USER;
        this.users = [...MOCK_USERS];
        this.conversations = [...INITIAL_CONVERSATIONS];
        this.messages = { ...INITIAL_MESSAGES };
        localStorage.removeItem('chat_current_user');
        localStorage.removeItem('chat_conversations');
        localStorage.removeItem('chat_messages');
        localStorage.removeItem('chat_all_users');
    }
}

export const chatService = new ChatService();
