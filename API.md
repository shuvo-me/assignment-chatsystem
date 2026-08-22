# Chat System — API Documentation

REST API consumed by the chat frontend. All routes are same-origin Next.js App Router
handlers (`src/app/api/**`) that act as a backend-for-frontend: they authenticate the
caller with an httpOnly `chat_token` cookie and forward the request to the external
Chat API with an `Authorization: Bearer <token>` header.

```
Browser ──fetch──> /api/* route handlers ──axios──> External Chat API
                    (reads httpOnly        (Bearer token,
                     chat_token cookie)     never exposed to JS)
```

Because the JWT lives in an httpOnly cookie, browser JavaScript cannot read it.
The single exception is `GET /api/auth/token`, used once at startup so the
socket.io client can authenticate.

---

## Conventions

* **Auth:** every route requires the `chat_token` cookie unless stated otherwise.
  Missing cookie → `401 { "message": "You must be signed in to do that." }`.
* **Request bodies:** `Content-Type: application/json`. Malformed JSON → `400`.
* **Errors:** handlers return `{ "message": string }`. When the upstream service
  rejects a request, its `error.message` (or first validation `details[].message`)
  is surfaced verbatim together with the upstream status code.
* **Common statuses:** `400` validation · `401` unauthenticated · `403` forbidden ·
  `502` upstream unreachable · `500` unexpected.

---

## 1. Authentication & Auto-Registration

Logging in with a phone number that does not exist yet registers the account
automatically — there is no separate signup flow.

### POST `/api/auth/login`

* **Headers:** `Content-Type: application/json`

#### Request Body

```json
{
  "phone": "+1234567890",
  "name": "Alex Mercer"
}
```

#### Success Response (`200 OK`)

Sets the `chat_token` httpOnly cookie (7-day expiry) and returns the user:

```json
{
  "user": { "_id": "6a891a35e5d6aac975267b5c", "name": "Alex Mercer", "phone": "+1234567890" }
}
```

#### Error Response (`400 Bad Request`)

```json
{ "message": "Phone number is required." }
```

### POST `/api/auth/logout`

Always succeeds; clears the auth cookie.

```json
{ "ok": true }
```

### GET `/api/auth/me`

Returns the signed-in user, or `401` when the cookie is absent/expired.

### GET `/api/auth/token`

Internal: releases the raw JWT for socket authentication.

```json
{ "token": "<jwt>" }
```

---

## 2. Directory Search

Look up registered users to start conversations.

### GET `/api/users/search?q=<query>`

* **Query Parameters:** `q` — display-name fragment (client sends after trimming,
  minimum 2 characters)

Notes:

* Matching is **case-sensitive** against display names; phone-number queries return `[]`.
* A leading `+` is stripped before forwarding (an unstripped `+` crashes the
  upstream regex). An empty query returns `[]` without hitting upstream.

#### Success Response (`200 OK`)

```json
[
  { "_id": "6a891a36e5d6aac975267b68", "name": "Jane Doe", "phone": "+1987654321" }
]
```

---

## 3. Conversations (1-to-1 & Groups)

### GET `/api/conversations`

List all conversations of the signed-in user.

#### Success Response (`200 OK`)

```json
{
  "data": [
    {
      "_id": "6a891fa0e5d6aac97526b18e",
      "type": "group",
      "name": "Project Team",
      "lastMessage": {},
      "updatedAt": "2026-08-22T04:03:44.704Z",
      "createdBy": "6a891a35e5d6aac975267b5c",
      "admins": ["6a891a35e5d6aac975267b5c"],
      "participants": [
        { "_id": "6a891a35e5d6aac975267b5c", "name": "Alex Mercer", "phone": "+1234567890" }
      ]
    }
  ]
}
```

Quirk: `lastMessage` can be `{}` (fresh conversations) — guard before rendering.

### POST `/api/conversations` — start a direct conversation

Creates (or returns the existing) 1-to-1 conversation. Upstream **deduplicates
per pair**, so repeating a request never creates duplicates.

#### Request Body

```json
{ "userId": "6a891a36e5d6aac975267b68" }
```

#### Success Response (`200 OK`)

Minimal payload — only the id plus participant ids as plain strings. Clients
should refetch the conversation list instead of relying on this shape:

```json
{ "_id": "6a892100e5d6aac97527c1aa", "participants": ["6a89…b5c", "6a89…b68"] }
```

### POST `/api/conversations/group` — create a group

Requires **at least 3 members total**: the creator (implicit) plus ≥ 2 others.
Enforced here *and* upstream.

#### Request Body

```json
{
  "name": "Project Team",
  "participantIds": [
    "6a891a36e5d6aac975267b68",
    "6a891f9ee5d6aac97526b178"
  ]
}
```

#### Success Response (`201 Created`)

Full conversation object; the creator is automatically added as participant
and admin:

```json
{
  "_id": "6a891fa0e5d6aac97526b18e",
  "type": "group",
  "name": "Project Team",
  "createdBy": "6a891a35e5d6aac975267b5c",
  "admins": ["6a891a35e5d6aac975267b5c"],
  "participants": [ { "_id": "…", "name": "Alex Mercer", "phone": "+1234567890" } ]
}
```

#### Error Response (`400 Bad Request` — fewer than 2 participants)

```json
{ "message": "A group needs at least 3 members including you." }
```

### Group management

All four operations return the **full updated conversation object** and are
restricted to group admins (violations surface as upstream `403`s, e.g.
`{ "message": "Only admins can rename the group" }`).

| Method | Endpoint | Body | Purpose |
|---|---|---|---|
| PATCH | `/api/conversations/:id` | `{ "name": "New Name" }` | Rename the group |
| POST | `/api/conversations/:id/participants` | `{ "userIds": ["…"] }` | Add members |
| DELETE | `/api/conversations/:id/participants/:userId` | — | Remove member; passing your **own** id leaves the group |
| POST | `/api/conversations/:id/admins` | `{ "userId": "…" }` | Promote member to admin |

---

## 4. Fetch Message History

### GET `/api/conversations/:conversationId/messages`

#### Success Response (`200 OK`)

⚠️ Messages arrive **newest-first**; the client sorts ascending before rendering.

```json
{
  "messages": [
    {
      "_id": "msg_02",
      "conversation": "conv_99ZQR",
      "sender": "user_01",
      "text": "Thanks Jane! Glad to be here.",
      "createdAt": "2026-08-22T11:12:30Z"
    },
    {
      "_id": "msg_01",
      "conversation": "conv_99ZQR",
      "sender": "user_02",
      "text": "Hey everyone, welcome!",
      "createdAt": "2026-08-22T11:10:00Z"
    }
 ],
  "hasMore": false
}
```

---

## 5. Send a Message

Sender identity comes from the auth token — clients cannot spoof it.

### POST `/api/messages`

#### Request Body

Both fields are required; text is trimmed and blank messages rejected.

```json
{
  "conversationId": "conv_99ZQR",
  "text": "Let's review the assignment notes."
}
```

#### Success Response (`200 OK`)

```json
{
  "_id": "msg_003",
  "conversation": "conv_99ZQR",
  "sender": "6a891a35e5d6aac975267b5c",
  "text": "Let's review the assignment notes.",
  "createdAt": "2026-08-22T11:15:22Z"
}
```

#### Error Response (`400 Bad Request` — blank/missing text)

```json
{ "message": "conversationId and text are required." }
```

---

## Realtime (Socket.IO)

Realtime updates bypass `/api/*` and connect to the socket origin directly
(`NEXT_PUBLIC_SOCKET_URL`, root path — no `/api` prefix).

**Connect:**

```js
const { token } = await fetch("/api/auth/token").then(r => r.json());
const socket = io(SOCKET_URL, { auth: { token } });
```

**Server → client events:**

| Event | Payload | Client handling |
|---|---|---|
| `message:new` | Full message object (same shape as §5 response) | Append to history cache, dedupe by `_id`, update conversation preview |
| `conversation:updated` | None (not useful) | Invalidate/refetch the conversation list |

Client-emitted custom events are ignored by the server — realtime input flows
exclusively through REST (`§5`) and echoes back via `message:new`.

---

## Known Quirks Appendix

* `lastMessage` on fresh conversations is `{}` — always guard before reading `.text`.
* Direct-conversation creation is idempotent per pair (server-side dedup).
* History is newest-first everywhere upstream; sort before display.
* `POST /api/conversations` returns string participant ids, not user objects.
* User search matches names case-sensitively; `+` prefixes must be stripped.
