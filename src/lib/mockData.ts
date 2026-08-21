import { Conversation, Message, User } from '../types/chat';

export const INITIAL_CURRENT_USER: User = {
    id: 'user_me',
    name: 'Alex Mercer',
    phone: '+1 (555) 234-5678',
    status: 'online',
    bio: 'Frontend Architect & UI Crafter ✨',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    color: '#6366f1',
};

export const MOCK_USERS: User[] = [
    INITIAL_CURRENT_USER,
    {
        id: 'user_sarah',
        name: 'Sarah Jenkins',
        phone: '+1 (555) 987-6543',
        status: 'online',
        lastSeen: new Date().toISOString(),
        bio: 'Lead Product Designer @ VibeCraft',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        color: '#ec4899',
    },
    {
        id: 'user_david',
        name: 'David Kim',
        phone: '+1 (555) 345-6789',
        status: 'away',
        lastSeen: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        bio: 'Systems Engineer & TypeScript enthusiast',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        color: '#3b82f6',
    },
    {
        id: 'user_elena',
        name: 'Elena Rostova',
        phone: '+44 20 7946 0912',
        status: 'offline',
        lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        bio: 'Mobile App Developer & Coffee lover ☕',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        color: '#10b981',
    },
    {
        id: 'user_marcus',
        name: 'Marcus Chen',
        phone: '+1 (555) 456-7890',
        status: 'online',
        lastSeen: new Date().toISOString(),
        bio: 'Full Stack Engineer | React & Node',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        color: '#8b5cf6',
    },
    {
        id: 'user_priya',
        name: 'Priya Sharma',
        phone: '+91 98765 43210',
        status: 'online',
        lastSeen: new Date().toISOString(),
        bio: 'UI/UX Researcher & Accessibility advocate',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        color: '#f59e0b',
    },
    {
        id: 'user_maya',
        name: 'Maya Lin',
        phone: '+1 (555) 789-0123',
        status: 'offline',
        lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        bio: 'DevOps & Cloud Infrastructure Engineer',
        avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
        color: '#06b6d4',
    },
];

// Helper to compute timestamps relative to now
const now = Date.now();
const minutesAgo = (m: number) => new Date(now - m * 60 * 1000).toISOString();
const hoursAgo = (h: number) => new Date(now - h * 60 * 60 * 1000).toISOString();
const daysAgo = (d: number) => new Date(now - d * 24 * 60 * 60 * 1000).toISOString();

export const INITIAL_MESSAGES: Record<string, Message[]> = {
    'conv_sarah': [
        {
            id: 'm_sarah_1',
            conversationId: 'conv_sarah',
            senderId: 'user_sarah',
            senderName: 'Sarah Jenkins',
            text: 'Hey Alex! Have you had a chance to review the new design mockups for the dashboard yet?',
            timestamp: daysAgo(1),
            status: 'read',
        },
        {
            id: 'm_sarah_2',
            conversationId: 'conv_sarah',
            senderId: 'user_me',
            senderName: 'Alex Mercer',
            text: 'Yes! Just went through them this morning. The contrast ratios and simplified navigation hierarchy look fantastic.',
            timestamp: daysAgo(1),
            status: 'read',
            reactions: [{ emoji: '🎉', count: 1, users: ['user_sarah'] }],
        },
        {
            id: 'm_sarah_3',
            conversationId: 'conv_sarah',
            senderId: 'user_sarah',
            senderName: 'Sarah Jenkins',
            text: 'Awesome! Did the chat interface specification match what you were planning for the component architecture?',
            timestamp: hoursAgo(3),
            status: 'read',
        },
        {
            id: 'm_sarah_4',
            conversationId: 'conv_sarah',
            senderId: 'user_me',
            senderName: 'Alex Mercer',
            text: 'Completely. I am keeping the state layer modular with dedicated hooks for conversation streaming, auto-scroll management, and smart optimistic updates.',
            timestamp: hoursAgo(2),
            status: 'read',
        },
        {
            id: 'm_sarah_5',
            conversationId: 'conv_sarah',
            senderId: 'user_sarah',
            senderName: 'Sarah Jenkins',
            text: 'Make sure the auto-scroll does not force-scroll if someone is reading older messages higher up! That is one of our top user experience priorities.',
            timestamp: minutesAgo(25),
            status: 'read',
        },
        {
            id: 'm_sarah_6',
            conversationId: 'conv_sarah',
            senderId: 'user_me',
            senderName: 'Alex Mercer',
            text: 'Already handled! It monitors scroll threshold dynamically and shows a floating "New Messages" badge when scrolled up.',
            timestamp: minutesAgo(8),
            status: 'read',
            reactions: [{ emoji: '🚀', count: 1, users: ['user_sarah'] }],
        },
        {
            id: 'm_sarah_7',
            conversationId: 'conv_sarah',
            senderId: 'user_sarah',
            senderName: 'Sarah Jenkins',
            text: 'Super clean! Let me know as soon as the live preview is ready.',
            timestamp: minutesAgo(2),
            status: 'delivered',
        }
    ],

    'conv_group_frontend': [
        {
            id: 'm_group_1',
            conversationId: 'conv_group_frontend',
            senderId: 'user_marcus',
            senderName: 'Marcus Chen',
            text: 'Team, Vite 6 build benchmarks are in. Bundle time dropped by almost 35%!',
            timestamp: hoursAgo(8),
            status: 'read',
            reactions: [{ emoji: '🔥', count: 2, users: ['user_me', 'user_david'] }],
        },
        {
            id: 'm_group_2',
            conversationId: 'conv_group_frontend',
            senderId: 'user_david',
            senderName: 'David Kim',
            text: 'That is huge! Are all the CSS modules and Tailwind v4 plugins compiling cleanly?',
            timestamp: hoursAgo(6),
            status: 'read',
        },
        {
            id: 'm_group_3',
            conversationId: 'conv_group_frontend',
            senderId: 'user_me',
            senderName: 'Alex Mercer',
            text: 'Yup, seamless integration. Everything is configured with pure TypeScript and Zero-slop design standards.',
            timestamp: hoursAgo(4),
            status: 'read',
            replyTo: {
                id: 'm_group_2',
                text: 'That is huge! Are all the CSS modules and Tailwind v4 plugins compiling cleanly?',
                senderName: 'David Kim',
            },
        },
        {
            id: 'm_group_4',
            conversationId: 'conv_group_frontend',
            senderId: 'user_priya',
            senderName: 'Priya Sharma',
            text: 'I ran the axe-core accessibility audit on the new chat dialogs and keyboard navigation passes with a 100/100 score.',
            timestamp: minutesAgo(40),
            status: 'read',
            reactions: [{ emoji: '✨', count: 3, users: ['user_me', 'user_marcus', 'user_david'] }],
        },
        {
            id: 'm_group_5',
            conversationId: 'conv_group_frontend',
            senderId: 'user_marcus',
            senderName: 'Marcus Chen',
            text: 'Let us sync after lunch to do a quick walk-through.',
            timestamp: minutesAgo(12),
            status: 'delivered',
        }
    ],

    'conv_david': [
        {
            id: 'm_david_1',
            conversationId: 'conv_david',
            senderId: 'user_david',
            senderName: 'David Kim',
            text: 'Alex, did you get the Swagger documentation link for the chat endpoints?',
            timestamp: daysAgo(2),
            status: 'read',
        },
        {
            id: 'm_david_2',
            conversationId: 'conv_david',
            senderId: 'user_me',
            senderName: 'Alex Mercer',
            text: 'Yes, got it! Structuring the API interface layer right now with full type coverage.',
            timestamp: daysAgo(2),
            status: 'read',
        },
        {
            id: 'm_david_3',
            conversationId: 'conv_david',
            senderId: 'user_david',
            senderName: 'David Kim',
            text: 'Great. Let me know if you need any backend schema clarifications.',
            timestamp: hoursAgo(18),
            status: 'read',
        }
    ],

    'conv_elena': [
        {
            id: 'm_elena_1',
            conversationId: 'conv_elena',
            senderId: 'user_elena',
            senderName: 'Elena Rostova',
            text: 'Hey Alex! Just pushed the audio waveform visualizer component to our shared repo.',
            timestamp: daysAgo(3),
            status: 'read',
        },
        {
            id: 'm_elena_2',
            conversationId: 'conv_elena',
            senderId: 'user_me',
            senderName: 'Alex Mercer',
            text: 'Looks sleek Elena! I will hook it up to the voice message previews.',
            timestamp: daysAgo(3),
            status: 'read',
            reactions: [{ emoji: '👍', count: 1, users: ['user_elena'] }],
        }
    ]
};

export const INITIAL_CONVERSATIONS: Conversation[] = [
    {
        id: 'conv_sarah',
        type: 'direct',
        name: 'Sarah Jenkins',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        avatarColor: '#ec4899',
        participants: [INITIAL_CURRENT_USER, MOCK_USERS[1]],
        participantIds: [INITIAL_CURRENT_USER.id, 'user_sarah'],
        unreadCount: 1,
        updatedAt: minutesAgo(2),
        createdAt: daysAgo(10),
        isPinned: true,
        topic: 'Product Design & User Interface Sync',
        lastMessage: {
            id: 'm_sarah_7',
            conversationId: 'conv_sarah',
            senderId: 'user_sarah',
            senderName: 'Sarah Jenkins',
            text: 'Super clean! Let me know as soon as the live preview is ready.',
            timestamp: minutesAgo(2),
            status: 'delivered',
        }
    },
    {
        id: 'conv_group_frontend',
        type: 'group',
        name: 'Frontend Engineering Core ⚡',
        avatarColor: '#6366f1',
        participants: [INITIAL_CURRENT_USER, MOCK_USERS[4], MOCK_USERS[2], MOCK_USERS[5]],
        participantIds: [INITIAL_CURRENT_USER.id, 'user_marcus', 'user_david', 'user_priya'],
        unreadCount: 2,
        updatedAt: minutesAgo(12),
        createdAt: daysAgo(30),
        isPinned: true,
        topic: 'Architecture, Component System & Performance',
        createdBy: 'user_me',
        lastMessage: {
            id: 'm_group_5',
            conversationId: 'conv_group_frontend',
            senderId: 'user_marcus',
            senderName: 'Marcus Chen',
            text: 'Let us sync after lunch to do a quick walk-through.',
            timestamp: minutesAgo(12),
            status: 'delivered',
        }
    },
    {
        id: 'conv_david',
        type: 'direct',
        name: 'David Kim',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        avatarColor: '#3b82f6',
        participants: [INITIAL_CURRENT_USER, MOCK_USERS[2]],
        participantIds: [INITIAL_CURRENT_USER.id, 'user_david'],
        unreadCount: 0,
        updatedAt: hoursAgo(18),
        createdAt: daysAgo(14),
        topic: 'API Contract & Database Schemas',
        lastMessage: {
            id: 'm_david_3',
            conversationId: 'conv_david',
            senderId: 'user_david',
            senderName: 'David Kim',
            text: 'Great. Let me know if you need any backend schema clarifications.',
            timestamp: hoursAgo(18),
            status: 'read',
        }
    },
    {
        id: 'conv_elena',
        type: 'direct',
        name: 'Elena Rostova',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        avatarColor: '#10b981',
        participants: [INITIAL_CURRENT_USER, MOCK_USERS[3]],
        participantIds: [INITIAL_CURRENT_USER.id, 'user_elena'],
        unreadCount: 0,
        updatedAt: daysAgo(3),
        createdAt: daysAgo(20),
        topic: 'Mobile & Audio Integrations',
        lastMessage: {
            id: 'm_elena_2',
            conversationId: 'conv_elena',
            senderId: 'user_me',
            senderName: 'Alex Mercer',
            text: 'Looks sleek Elena! I will hook it up to the voice message previews.',
            timestamp: daysAgo(3),
            status: 'read',
        }
    }
];

export const QUICK_SIMULATED_REPLIES = [
    "Got it! That looks super polished and responsive.",
    "Thanks for the update! I tested the phone auth flow and it is very intuitive.",
    "Awesome! The auto-scroll behaves exactly as expected.",
    "Check out this cool new feature we just shipped! 🚀",
    "Sounds great, let me review and confirm back shortly.",
    "Looks spot on! Ready for the next phase."
];
