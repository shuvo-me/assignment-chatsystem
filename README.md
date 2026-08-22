# Chat System

A production-style chat frontend built with **Next.js 16 (App Router)** and backed by an **external Chat API** through a backend-for-frontend (BFF) layer. It supports phone-based authentication with auto-registration, direct and group conversations, realtime messaging over socket.io, group administration, and emoji reactions — with no database of its own; every request proxies the upstream service.

Full endpoint reference: [`API.md`](./API.md).

---

## Features

- **Auth & auto-registration** — log in with any phone number + display name; new numbers are registered automatically. The JWT is stored in an httpOnly cookie.
- **User directory search** — find registered users by display name to start chats.
- **Direct conversations** — 1-to-1 chats with server-side deduplication per pair.
- **Group conversations** — create groups (minimum 3 members including you), rename, add/remove members, promote admins, leave. Management actions are admin-only and enforced upstream.
- **Realtime messaging** — incoming messages appear live via socket.io; conversation previews update automatically.
- **Optimistic send** — your own messages render instantly from the mutation response; socket echoes are deduplicated by id.
- **Emoji reactions** — WhatsApp-style one-reaction-per-user toggling on any message.
- **Smart message pane** — date dividers, avatar grouping, unread pill while scrolled up, auto-scroll behavior that never yanks you away from history.

## Tech Stack & Why

| Technology | Role | Why it's here |
|---|---|---|
| Next.js 16 App Router | Framework + BFF | Route handlers under `/api/*` proxy the external API, keeping the auth JWT in an **httpOnly cookie** — the token is never readable by browser JS. Also gives file-based routing and this version's `proxy.ts` guard (the replacement for `middleware.ts`). |
| TypeScript | Type safety | The app straddles two API surfaces (upstream shapes vs normalized UI models); types document both and catch drift at compile time. |
| TanStack React Query v5 | Server-state cache | The query cache is the **single source of truth** for conversations and messages. Socket events and mutations write straight into the cache via small helper functions, eliminating duplicate state and the sync bugs it causes. |
| socket.io-client | Realtime | Connects to the socket origin directly with an auth token bridged from the httpOnly cookie via `GET /api/auth/token`. |
| axios | HTTP clients | Two deliberately isolated contexts: a server-side instance (`baseURL = CHAT_API_BASE_URL`) used only inside route handlers, and relative-URL requests (`/api/...`) from client services so everything stays same-origin. |
| Tailwind CSS + lucide-react | UI | Utility-first styling keeps the component layer lean; lucide provides consistent icons. |

### AI-Assisted Development

| Tool | Use cases |
|---|---|
| Google AI Studio | Initial project boilerplate & scaffolding generation — output later restructured heavily during the real-API integration. |
| opencode (terminal coding agent) | End-to-end feature implementation: React Query data-layer migration, group-management flows (create/rename/members/admins), the `/api/*` BFF route handlers, and the bulk of `API.md`. Also ran the `tsc`/ESLint verification loop after every change. |
| Gemini / Google AI | Debugging partner for time-consuming issues — most notably diagnosing the intermittent realtime delivery failure (socket disconnects silently losing events + a never-refetching message cache), fixed with reconnect-driven cache reconciliation and staleness tuning. |

## Getting Started

### Prerequisites

- Node.js 18+
- Access to the external Chat API and its socket server

### Environment

Create `.env.local` in the project root:

```bash
CHAT_API_BASE_URL=<external chat api base url>
NEXT_PUBLIC_SOCKET_URL=<socket.io server origin>
```

### Run

```bash
npm install
npm run dev        # http://localhost:3000
```

Open the app and log in with **any phone number and display name** — unknown numbers are registered automatically. To test realtime delivery, log in as two different users (e.g., a normal window and an incognito window) and open the same conversation on both sides.

### Verification

```bash
npm run lint       # eslint
npx tsc --noEmit   # typecheck (not wired into a script)
```

## Architecture

```
Browser ──fetch──> /api/* route handlers ──axios──> External Chat API
                    (reads httpOnly         (Bearer token,
                     chat_token cookie)      never exposed to JS)

Browser ──socket.io──> Socket server (root origin, auth.token handshake)
```

Key conventions:

- **Query-cache-as-truth**: components derive conversations/messages from React Query hooks; there is no parallel context state. Imperative writers (`applyIncomingMessage`, `bumpConversationPreview`, `patchConversation` in `src/services/chat.service.ts`) mutate the cache directly from socket handlers and post-mutation fixes.
- **Service hook objects**: each domain exposes a dot-notation object of React Query hooks (`chatService.useConversations()`, `useMessages(id)`, `useSendMessage()`, …).
- **Reconnect reconciliation**: events emitted while the socket is disconnected are lost upstream-side, so every reconnection invalidates the message and conversation caches — the active chat refetches immediately, healing any gap without user action. Lifecycle events are logged at `console.debug` level.
- **Upstream quirks are handled centrally**: newest-first history is sorted before caching, empty `lastMessage` objects are guarded, `+` prefixes are stripped from search queries, and upstream error envelopes (`error.message`) are surfaced as flat `{message}` responses.

---

### What I'd improve with more time

- **Automated tests** — Playwright end-to-end flows (login → chat → group admin) and unit tests for the cache helpers; currently the largest risk area given zero coverage.
- **Message pagination** — a load-older UI keyed off cursors, the moment upstream adds paging parameters.
- **Cross-user reactions** — wire the existing local shape to real endpoints when available.
- **Connection-status UX** — surface the socket state already tracked in logs as a subtle "reconnecting…" banner.
- **Virtualized long lists** — conversation/message virtualization for heavy histories.
- **Hardening polish** — environment-variable validation at boot, CI wiring lint+typecheck+build, and retry/backoff policies for upstream blips beyond the current single token-fetch retry.
