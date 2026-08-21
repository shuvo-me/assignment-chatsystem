export function formatMessageTime(isoString: string): string {
    try {
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return '';
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
        return '';
    }
}

export function formatConversationTime(isoString?: string): string {
    if (!isoString) return '';
    try {
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return '';

        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();

        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        const isYesterday = date.toDateString() === yesterday.toDateString();

        if (isToday) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        if (isYesterday) {
            return 'Yesterday';
        }

        // Within the same week
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays < 7) {
            return date.toLocaleDateString([], { weekday: 'short' });
        }

        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch (e) {
        return '';
    }
}

export function getDateDividerLabel(isoString: string): string {
    try {
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return '';

        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();

        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        const isYesterday = date.toDateString() === yesterday.toDateString();

        if (isToday) return 'Today';
        if (isYesterday) return 'Yesterday';

        return date.toLocaleDateString([], {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
        });
    } catch (e) {
        return '';
    }
}

export function formatDateWithTime(isoString: string): string {
    try {
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return '';
        return date.toLocaleDateString([], {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch (e) {
        return '';
    }
}
