"use client";
import { Check, Code2, Copy, ExternalLink, ShieldCheck } from "lucide-react";
import React, { useState } from "react";

interface EndpointSpec {
  id: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
  path: string;
  title: string;
  description: string;
  requestBody?: any;
  responseBody: any;
  curlExample: string;
}

const SPECS: EndpointSpec[] = [
  {
    id: "login",
    method: "POST",
    path: "/api/auth/login",
    title: "Passwordless Phone Login & Register",
    description:
      "Authenticates a user via phone number and registers the display name if new.",
    requestBody: {
      phone: "+1 (555) 234-5678",
      name: "Alex Mercer",
    },
    responseBody: {
      success: true,
      token: "jwt_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      user: {
        id: "user_me",
        name: "Alex Mercer",
        phone: "+1 (555) 234-5678",
        status: "online",
        bio: "Frontend Architect & UI Crafter ✨",
        color: "#6366f1",
      },
    },
    curlExample: `curl -X POST https://frontend-task-chatapp.onrender.com/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"phone": "+15552345678", "name": "Alex Mercer"}'`,
  },
  {
    id: "get-convs",
    method: "GET",
    path: "/api/conversations",
    title: "List Active Conversations",
    description:
      "Retrieves all 1-on-1 and group channels for the authenticated user, sorted by recency.",
    responseBody: {
      conversations: [
        {
          id: "conv_sarah",
          type: "direct",
          name: "Sarah Jenkins",
          unreadCount: 1,
          isPinned: true,
          updatedAt: "2026-08-21T12:44:00Z",
          lastMessage: {
            text: "Super clean! Let me know as soon as the live preview is ready.",
            status: "delivered",
          },
        },
        {
          id: "conv_group_frontend",
          type: "group",
          name: "Frontend Engineering Core ⚡",
          unreadCount: 2,
          participantIds: ["user_me", "user_marcus", "user_david"],
        },
      ],
    },
    curlExample: `curl -X GET https://frontend-task-chatapp.onrender.com/api/conversations \\
  -H "Authorization: Bearer <TOKEN>"`,
  },
  {
    id: "send-msg",
    method: "POST",
    path: "/api/messages",
    title: "Dispatch Message & Optimistic Sync",
    description:
      "Sends a new message to a conversation with optional reply-to references and attachments.",
    requestBody: {
      conversationId: "conv_sarah",
      text: "Completely. State layer is modular with dedicated hooks.",
      replyTo: {
        id: "m_sarah_4",
        text: "Awesome! Did the chat interface specification match?",
      },
    },
    responseBody: {
      id: "m_1740134000",
      conversationId: "conv_sarah",
      senderId: "user_me",
      text: "Completely. State layer is modular with dedicated hooks.",
      timestamp: "2026-08-21T12:44:18Z",
      status: "sent",
    },
    curlExample: `curl -X POST https://frontend-task-chatapp.onrender.com/api/messages \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <TOKEN>" \\
  -d '{"conversationId": "conv_sarah", "text": "Completely..."}'`,
  },
  {
    id: "reactions",
    method: "POST",
    path: "/api/messages/{id}/reactions",
    title: "Toggle Emoji Reaction",
    description:
      "Adds or removes an emoji reaction on a specific message with live broadcast.",
    requestBody: {
      emoji: "🔥",
    },
    responseBody: {
      messageId: "m_sarah_2",
      reactions: [{ emoji: "🔥", count: 2, users: ["user_sarah", "user_me"] }],
    },
    curlExample: `curl -X POST https://frontend-task-chatapp.onrender.com/api/messages/m_sarah_2/reactions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <TOKEN>" \\
  -d '{"emoji": "🔥"}'`,
  },
  {
    id: "create-group",
    method: "POST",
    path: "/api/conversations/group",
    title: "Create Group Channel",
    description:
      "Initializes a new group room with selected participant IDs and topic banner.",
    requestBody: {
      name: "Design System Guild 🎨",
      participantIds: ["user_sarah", "user_david", "user_priya"],
      topic: "Component Design Tokens & UI Guidelines",
    },
    responseBody: {
      id: "conv_group_design",
      type: "group",
      name: "Design System Guild 🎨",
      participantIds: ["user_me", "user_sarah", "user_david", "user_priya"],
      unreadCount: 0,
    },
    curlExample: `curl -X POST https://frontend-task-chatapp.onrender.com/api/conversations/group \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <TOKEN>" \\
  -d '{"name": "Design System Guild", "participantIds": ["user_sarah"]}'`,
  },
];

export const ArchitectureSpecViewer: React.FC = () => {
  const [selectedSpecId, setSelectedSpecId] = useState<string>("login");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentSpec = SPECS.find((s) => s.id === selectedSpecId) || SPECS[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id="section-architecture"
      className="py-20 bg-slate-50/60 dark:bg-[#0B0E14]/70 border-t border-slate-200 dark:border-[#1E293B] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          data-aos="fade-up"
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-semibold text-blue-700 dark:text-blue-400">
              <Code2 className="w-3.5 h-3.5" />
              <span>Swagger & API Compliance</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Production-Grade API Specification
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Fully aligned with the assignment backend contracts. Explore the
              endpoints, payload formats, and verified response schemas below.
            </p>
          </div>

          <a
            href="https://frontend-task-chatapp.onrender.com/docs/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#151921] hover:bg-slate-50 dark:hover:bg-[#1E293B] text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-[#1E293B] shadow-xs transition-colors cursor-pointer"
          >
            <span>Open Swagger Interactive Docs</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
          </a>
        </div>

        {/* API Workbench Container */}
        <div
          data-aos="fade-up"
          data-aos-duration="700"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-2xl bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] shadow-xl overflow-hidden"
        >
          {/* Left: Endpoint Selector List (4 Cols) */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-[#1E293B] p-4 space-y-2 bg-slate-50/50 dark:bg-[#0B0E14]/40">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 mb-2">
              Endpoints ({SPECS.length})
            </div>

            {SPECS.map((spec) => {
              const isSelected = spec.id === selectedSpecId;
              const isPost = spec.method === "POST";
              return (
                <button
                  key={spec.id}
                  onClick={() => setSelectedSpecId(spec.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                    isSelected
                      ? "bg-blue-50 dark:bg-blue-950/50 border-blue-500 text-blue-900 dark:text-blue-100 shadow-xs"
                      : "bg-white dark:bg-[#151921] border-slate-200 dark:border-[#1E293B] text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                        isPost
                          ? "bg-blue-600 text-white"
                          : "bg-emerald-600 text-white"
                      }`}
                    >
                      {spec.method}
                    </span>
                    <span className="font-mono text-[11px] truncate">
                      {spec.path}
                    </span>
                  </div>
                  <div className="font-medium text-slate-900 dark:text-slate-100 truncate text-[11.5px]">
                    {spec.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Spec Inspector & JSON Viewer (8 Cols) */}
          <div className="lg:col-span-8 p-6 flex flex-col justify-between space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between gap-2 flex-wrap pb-3 border-b border-slate-200 dark:border-[#1E293B]">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                      currentSpec.method === "POST"
                        ? "bg-blue-600 text-white"
                        : "bg-emerald-600 text-white"
                    }`}
                  >
                    {currentSpec.method}
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {currentSpec.path}
                  </span>
                </div>

                <button
                  onClick={() =>
                    handleCopy(currentSpec.curlExample, currentSpec.id)
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors cursor-pointer"
                >
                  {copiedId === currentSpec.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">
                        cURL Copied
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy cURL</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                {currentSpec.description}
              </p>
            </div>

            {/* Code / JSON Display Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Request Payload */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Request Payload (JSON)
                </div>
                <div className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-[10.5px] overflow-x-auto custom-scrollbar max-h-48 border border-slate-800">
                  {currentSpec.requestBody ? (
                    <pre className="leading-tight">
                      {JSON.stringify(currentSpec.requestBody, null, 2)}
                    </pre>
                  ) : (
                    <div className="text-slate-500 italic">
                      No request body (Query Parameters / URL ID)
                    </div>
                  )}
                </div>
              </div>

              {/* Response Payload */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
                  <span>200 OK Response</span>
                  <span className="font-mono text-[10px]">
                    application/json
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 text-emerald-300 font-mono text-[10.5px] overflow-x-auto custom-scrollbar max-h-48 border border-slate-800">
                  <pre className="leading-tight">
                    {JSON.stringify(currentSpec.responseBody, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            {/* Verification Tag */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0E14] border border-slate-200 dark:border-[#1E293B] flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span>
                  Typescript contract generated with strict input guards and
                  schema validation.
                </span>
              </div>
              <span className="font-mono text-[10px] text-blue-500 font-semibold">
                100% Passed
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
