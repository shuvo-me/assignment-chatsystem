"use client";
import {
  ArrowDownCircle,
  Check,
  CheckCheck,
  Clock,
  Hash,
  Search,
  Smartphone,
  Smile,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import React, { useState } from "react";

export const FeatureBentoGrid: React.FC = () => {
  const [activeReaction, setActiveReaction] = useState<string>("🔥");
  const [reactionCounts, setReactionCounts] = useState<{
    [key: string]: number;
  }>({
    "🔥": 8,
    "❤️": 5,
    "🚀": 4,
    "👍": 6,
    "🎉": 3,
  });
  const [userReacted, setUserReacted] = useState<{ [key: string]: boolean }>({
    "🔥": true,
  });

  const toggleReaction = (emoji: string) => {
    setUserReacted((prev) => {
      const isAlready = !!prev[emoji];
      setReactionCounts((counts) => ({
        ...counts,
        [emoji]: (counts[emoji] || 0) + (isAlready ? -1 : 1),
      }));
      return { ...prev, [emoji]: !isAlready };
    });
    setActiveReaction(emoji);
  };

  return (
    <section
      id="section-features"
      className="py-24 border-t border-slate-200 dark:border-[#1E293B] bg-slate-50/60 dark:bg-[#0B0E14]/60 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Section Header */}
        <div
          data-aos="fade-up"
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-semibold text-blue-700 dark:text-blue-400 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architecture & Feature Showcase</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineered for Precision, Speed, and Polish
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Explore the core architectural pillars powering our real-time
            messaging engine, featuring zero-lag state synchronization, rich
            media, and responsive client UX.
          </p>
        </div>

        {/* Zigzag Feature List */}
        <div className="space-y-24 sm:space-y-32">
          {/* ========================================================================= */}
          {/* FEATURE 1: Text Left | Mockup Right -> Optimistic State Engine */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text Side (Left) */}
            <div
              data-aos="fade-right"
              data-aos-duration="700"
              className="lg:col-span-5 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-400 text-xs font-bold">
                <Zap className="w-3.5 h-3.5" />
                <span>0ms Local Sync</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                Optimistic State Engine with 3-Phase Delivery
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Messages display immediately upon hitting send with zero
                perceived latency. The client tracks lifecycle progression from
                queued timestamp to WebSocket confirmation and double-check read
                delivery.
              </p>

              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>
                    <strong>Instant 0ms UI Rendering:</strong> Immediate
                    optimistic injection into the message timeline.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>
                    <strong>ACK Reconciliation:</strong> Replaces temporary IDs
                    with server-authoritative UUIDs.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>
                    <strong>Resilient Rollback:</strong> Automatically marks
                    failed dispatches with one-click retry triggers.
                  </span>
                </li>
              </ul>
            </div>

            {/* Visual/Screenshot Mockup (Right) */}
            <div
              data-aos="fade-left"
              data-aos-duration="700"
              className="lg:col-span-7"
            >
              <div className="relative rounded-2xl bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] shadow-xl p-5 sm:p-6 overflow-hidden">
                {/* Mockup Window Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#1E293B]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                      JS
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Jordan Smith
                      </div>
                      <div className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Active WebSocket Connection
                      </div>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    P99 &lt; 28ms
                  </div>
                </div>

                {/* Chat Stream with Visual Status Stages */}
                <div className="py-5 space-y-4 font-sans">
                  {/* Incoming message */}
                  <div className="flex items-start gap-2.5 max-w-[85%]">
                    <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-1">
                      JS
                    </div>
                    <div className="p-3 rounded-2xl rounded-tl-sm bg-slate-100 dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 text-xs shadow-xs">
                      Are the optimistic dispatch reconciliations passing the
                      stress benchmarks?
                      <div className="text-[10px] text-slate-400 mt-1">
                        10:42 AM
                      </div>
                    </div>
                  </div>

                  {/* Outgoing 1: Delivered (Double check) */}
                  <div className="flex flex-col items-end">
                    <div className="p-3 rounded-2xl rounded-tr-sm bg-blue-600 text-white text-xs max-w-[85%] shadow-md shadow-blue-600/20">
                      Yes! P99 latency dropped below 30ms with instant
                      optimistic updates on the client timeline.
                      <div className="flex items-center justify-end gap-1 text-[10px] text-blue-100 mt-1">
                        <span>10:42 AM</span>
                        <CheckCheck className="w-3.5 h-3.5 text-cyan-300" />
                      </div>
                    </div>
                  </div>

                  {/* Outgoing 2: Server ACK (Single check) */}
                  <div className="flex flex-col items-end">
                    <div className="p-3 rounded-2xl rounded-tr-sm bg-blue-600 text-white text-xs max-w-[85%] shadow-md shadow-blue-600/20">
                      Even with high jitter, all packet sequence numbers resolve
                      cleanly.
                      <div className="flex items-center justify-end gap-1 text-[10px] text-blue-100 mt-1">
                        <span>10:43 AM</span>
                        <Check className="w-3.5 h-3.5 text-blue-200" />
                      </div>
                    </div>
                  </div>

                  {/* Outgoing 3: Optimistic Pending (Clock) */}
                  <div className="flex flex-col items-end">
                    <div className="p-3 rounded-2xl rounded-tr-sm bg-blue-600/90 text-white text-xs max-w-[85%] border border-blue-400/30">
                      Deploying the updated schema to the staging cluster now.
                      <div className="flex items-center justify-end gap-1 text-[10px] text-blue-200 mt-1">
                        <span>Just now</span>
                        <Clock className="w-3 h-3 text-amber-300 animate-spin" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Indicator Bar */}
                <div className="pt-3 border-t border-slate-100 dark:border-[#1E293B] flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Automatic state resolution active
                  </span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    Optimistic UI Engine
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FEATURE 2: Mockup Left | Text Right -> Passwordless Phone Authentication */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual/Screenshot Mockup (Left on large screens) */}
            <div
              data-aos="fade-right"
              data-aos-duration="700"
              className="lg:col-span-7 order-2 lg:order-1"
            >
              <div className="rounded-2xl bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] shadow-xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E293B]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                      <Smartphone className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Authentication Gateway
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    JWT Session Ready
                  </span>
                </div>

                {/* Simulated Login Interface */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      Phone Number (E.164 Format)
                    </label>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-[#0B0E14] border border-slate-200 dark:border-[#1E293B]">
                      <span className="text-xs font-semibold text-slate-400">
                        +1
                      </span>
                      <input
                        type="text"
                        readOnly
                        value="555-019-8472"
                        aria-label="Sample phone number"
                        className="bg-transparent text-xs font-medium text-slate-900 dark:text-white outline-none w-full"
                      />
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-semibold">
                        Valid
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      Display Name
                    </label>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0B0E14] border border-slate-200 dark:border-[#1E293B]">
                      <input
                        type="text"
                        readOnly
                        value="Elena Rostova (Lead Architect)"
                        aria-label="Sample display name"
                        className="bg-transparent text-xs font-medium text-slate-900 dark:text-white outline-none w-full"
                      />
                    </div>
                  </div>

                  {/* 1-Click Evaluation Persona Quick Chips */}
                  <div className="pt-2 space-y-2">
                    <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>Instant Candidate Personas:</span>
                      <span className="text-blue-500 text-[10px]">
                        1-Click Autofill
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        {
                          name: "Alex Mercer",
                          role: "Staff Eng",
                          color: "bg-blue-600",
                        },
                        {
                          name: "Sarah Chen",
                          role: "Product",
                          color: "bg-emerald-600",
                        },
                        {
                          name: "Marcus Vance",
                          role: "DevOps",
                          color: "bg-purple-600",
                        },
                      ].map((p) => (
                        <div
                          key={p.name}
                          className="p-2 rounded-xl bg-slate-50 dark:bg-[#0B0E14] border border-slate-200 dark:border-[#1E293B] text-left"
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <div
                              className={`w-4 h-4 rounded-full ${p.color} text-white text-[8px] font-bold flex items-center justify-center`}
                            >
                              {p.name[0]}
                            </div>
                            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">
                              {p.name}
                            </span>
                          </div>
                          <span className="text-[9px] text-slate-400">
                            {p.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-[#1E293B] flex items-center justify-between text-[11px] text-slate-500">
                  <span>Tokens cached across sessions</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    Zero Password Overhead
                  </span>
                </div>
              </div>
            </div>

            {/* Text Side (Right on large screens) */}
            <div
              data-aos="fade-left"
              data-aos-duration="700"
              className="lg:col-span-5 space-y-5 order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-400 text-xs font-bold">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Seamless Authentication</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                Passwordless Phone Identity & Rapid Persona Switching
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Log in instantly using just a phone number and display name. The
                authentication layer handles token generation, local profile
                hydration, and multi-persona testing without annoying password
                resets.
              </p>

              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>
                    <strong>E.164 Compliant Validation:</strong> Sanitizes and
                    validates global telephone formats.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>
                    <strong>Pre-Seeded Personas:</strong> 6 rich candidate
                    accounts ready for instant reviewer inspection.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>
                    <strong>Automatic Profile Hydration:</strong> Persists user
                    identity and session tokens safely in localStorage.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FEATURE 3: Text Left | Mockup Right -> Multi-Participant Group Channels */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text Side (Left) */}
            <div
              data-aos="fade-right"
              data-aos-duration="700"
              className="lg:col-span-5 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800/80 text-purple-700 dark:text-purple-400 text-xs font-bold">
                <Users className="w-3.5 h-3.5" />
                <span>Multi-User Architecture</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                Group Channels, Topic Rooms & Member Rosters
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Coordinate teams across multi-participant group channels and
                1-on-1 direct message threads. Features dynamic channel
                creation, topic descriptions, unread counters, and active
                participant sidebars.
              </p>

              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>
                    <strong>Channel Room Routing:</strong> Dedicated rooms with
                    topic summaries and member counts.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>
                    <strong>Live Member Rosters:</strong> Inspect online status
                    and phone identities of room participants.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>
                    <strong>Unread Indicators:</strong> Badge alerts highlight
                    channels with unread activity.
                  </span>
                </li>
              </ul>
            </div>

            {/* Visual/Screenshot Mockup (Right) */}
            <div
              data-aos="fade-left"
              data-aos-duration="700"
              className="lg:col-span-7"
            >
              <div className="rounded-2xl bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] shadow-xl p-5 sm:p-6 space-y-4">
                {/* Channel Header Banner */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E293B]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                      #
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        frontend-engineering
                        <span className="px-1.5 py-0.2 rounded text-[9px] bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                          Public Channel
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Topic: Architecture, WebSocket lifecycle & component
                        specs
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center -space-x-1.5">
                    {["AM", "SC", "JS", "ER"].map((ini, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-slate-700 text-white text-[9px] font-bold border-2 border-white dark:border-[#151921] flex items-center justify-center"
                      >
                        {ini}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Two-column Channel Roster Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  {/* Channels Sidebar Mock */}
                  <div className="sm:col-span-5 p-3 rounded-xl bg-slate-50 dark:bg-[#0B0E14] border border-slate-200 dark:border-[#1E293B] space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Rooms & Groups
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="p-2 rounded-lg bg-blue-600 text-white font-medium flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Hash className="w-3.5 h-3.5" /> frontend
                        </span>
                        <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[9px] font-bold">
                          2
                        </span>
                      </div>
                      <div className="p-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-[#1E293B] text-slate-700 dark:text-slate-300 font-medium flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Hash className="w-3.5 h-3.5 text-slate-400" />{" "}
                          general
                        </span>
                      </div>
                      <div className="p-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-[#1E293B] text-slate-700 dark:text-slate-300 font-medium flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Hash className="w-3.5 h-3.5 text-slate-400" />{" "}
                          releases
                        </span>
                        <span className="px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 text-[9px] font-bold">
                          5
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Participant List Mock */}
                  <div className="sm:col-span-7 p-3 rounded-xl bg-slate-50 dark:bg-[#0B0E14] border border-slate-200 dark:border-[#1E293B] space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                      <span>Online Participants (4)</span>
                      <span className="text-emerald-500 text-[9px]">
                        ● Live
                      </span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      {[
                        {
                          name: "Alex Mercer (You)",
                          status: "Active now",
                          color: "bg-blue-600",
                        },
                        {
                          name: "Sarah Chen",
                          status: "Typing...",
                          color: "bg-emerald-600",
                          isTyping: true,
                        },
                        {
                          name: "Jordan Smith",
                          status: "In conversation",
                          color: "bg-indigo-600",
                        },
                        {
                          name: "Elena Rostova",
                          status: "Active 2m ago",
                          color: "bg-purple-600",
                        },
                      ].map((u, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-1.5 rounded-lg bg-white dark:bg-[#151921] border border-slate-200/60 dark:border-slate-800"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-5 h-5 rounded-full ${u.color} text-white text-[9px] font-bold flex items-center justify-center`}
                            >
                              {u.name[0]}
                            </div>
                            <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                              {u.name}
                            </span>
                          </div>
                          <span
                            className={`text-[10px] ${u.isTyping ? "text-blue-500 font-semibold animate-pulse" : "text-slate-400"}`}
                          >
                            {u.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-[#1E293B] flex items-center justify-between text-[11px] text-slate-500">
                  <span>Custom topics and role management</span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    Team Collaboration
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FEATURE 4: Mockup Left | Text Right -> Intelligent Auto-Scroll Behavior */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual/Screenshot Mockup (Left on large screens) */}
            <div
              data-aos="fade-right"
              data-aos-duration="700"
              className="lg:col-span-7 order-2 lg:order-1"
            >
              <div className="rounded-2xl bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] shadow-xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E293B]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-sky-600 text-white flex items-center justify-center">
                      <ArrowDownCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Smart Scroll Viewport Controller
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
                    Scroll Position Locked
                  </span>
                </div>

                {/* Simulated Scroll Container with Unread Marker & Floating Jump Button */}
                <div className="relative p-4 rounded-xl bg-slate-50 dark:bg-[#0B0E14] border border-slate-200 dark:border-[#1E293B] space-y-3 h-52 overflow-hidden">
                  {/* Previous message */}
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      Sarah Chen:{" "}
                    </span>
                    Reviewing the OpenAPI documentation for error code schemas.
                  </div>

                  {/* Red Unread Divider Line */}
                  <div className="relative flex items-center justify-center my-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-red-400/60"></div>
                    </div>
                    <span className="relative px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 text-[9px] font-bold uppercase tracking-wider">
                      New Messages Below
                    </span>
                  </div>

                  {/* Incoming Unread Message 1 */}
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      Alex Mercer:{" "}
                    </span>
                    Pushed the latest payload validator commits.
                  </div>

                  {/* Floating "New Messages" Pill Button */}
                  <div className="absolute bottom-3 right-4 z-10">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-600/30 cursor-pointer animate-bounce">
                      <ArrowDownCircle className="w-3.5 h-3.5" />
                      <span>3 New Messages</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-[#1E293B] flex items-center justify-between text-[11px] text-slate-500">
                  <span>Threshold observer prevents jitter</span>
                  <span className="font-semibold text-sky-600 dark:text-sky-400">
                    Zero Focus Interruption
                  </span>
                </div>
              </div>
            </div>

            {/* Text Side (Right on large screens) */}
            <div
              data-aos="fade-left"
              data-aos-duration="700"
              className="lg:col-span-5 space-y-5 order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-sky-100 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800/80 text-sky-700 dark:text-sky-400 text-xs font-bold">
                <ArrowDownCircle className="w-3.5 h-3.5" />
                <span>Intelligent Viewport</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                Smart Auto-Scroll Lock with Backlog Counters
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The viewport automatically scrolls to latest messages when you
                are at the bottom. If you scroll up to inspect past
                conversations, it locks position and displays a smooth floating
                pill with unread counts.
              </p>

              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>
                    <strong>Automatic Pinning:</strong> Keeps the latest
                    conversation stream pinned during active chatter.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>
                    <strong>Unread Marker Dividers:</strong> Clear visual
                    partition showing where you left off.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>
                    <strong>1-Click Jump to Bottom:</strong> Floating indicator
                    smoothly slides back down when clicked.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FEATURE 5: Text Left | Mockup Right -> Interactive Emoji Reactions */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text Side (Left) */}
            <div
              data-aos="fade-right"
              data-aos-duration="700"
              className="lg:col-span-5 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-pink-100 dark:bg-pink-950/80 border border-pink-200 dark:border-pink-800/80 text-pink-700 dark:text-pink-400 text-xs font-bold">
                <Smile className="w-3.5 h-3.5" />
                <span>Instant Engagement</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                Interactive Emoji Reactions with Live Aggregate Counters
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Express quick feedback on any message with real-time emoji
                reactions. Users can toggle reactions on and off with instant
                client updates, per-user state tracking, and aggregated totals.
              </p>

              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-pink-100 dark:bg-pink-950/80 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>
                    <strong>Multi-Emoji Tray:</strong> Quick-reaction palette
                    with standard and extended emoji options.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-pink-100 dark:bg-pink-950/80 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>
                    <strong>Per-User Toggle State:</strong> Tapping an active
                    reaction decrements and highlights personal status.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-pink-100 dark:bg-pink-950/80 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>
                    <strong>Optimistic Aggregation:</strong> Instant count
                    calculations across participants without server delays.
                  </span>
                </li>
              </ul>
            </div>

            {/* Visual/Screenshot Mockup (Right) */}
            <div
              data-aos="fade-left"
              data-aos-duration="700"
              className="lg:col-span-7"
            >
              <div className="rounded-2xl bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] shadow-xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E293B]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-pink-600 text-white flex items-center justify-center">
                      <Smile className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Live Reaction Engine Mockup
                    </span>
                  </div>
                  <span className="text-[10px] text-pink-600 dark:text-pink-400 font-semibold">
                    Interactive • Try Clicking Below
                  </span>
                </div>

                {/* Simulated Message Card with Interactive Reaction Tray */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0E14] border border-slate-200 dark:border-[#1E293B] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                        AM
                      </div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        Alex Mercer
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400">11:05 AM</span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                    "The new real-time WebSocket protocol passed all stress
                    benchmarks with 10,000 simulated packets! 🎉"
                  </p>

                  {/* Active Reaction Badges on the Message */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {Object.entries(reactionCounts).map(([emoji, count]) => {
                      const countNum = Number(count);
                      if (countNum <= 0) return null;
                      const isUser = !!userReacted[emoji];
                      return (
                        <button
                          key={emoji}
                          onClick={() => toggleReaction(emoji)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                            isUser
                              ? "bg-blue-100 dark:bg-blue-900/60 border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 scale-105"
                              : "bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          <span>{emoji}</span>
                          <span className="font-bold text-[11px]">
                            {countNum}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick Pick Reaction Palette Tray */}
                  <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      Quick React Tray:
                    </span>
                    <div className="flex items-center gap-1">
                      {["❤️", "👍", "🔥", "🚀", "🎉", "👏", "😂"].map(
                        (emoji) => (
                          <button
                            key={emoji}
                            onClick={() => toggleReaction(emoji)}
                            className={`p-1.5 rounded-lg text-sm transition-transform cursor-pointer hover:scale-125 ${
                              userReacted[emoji]
                                ? "bg-blue-100 dark:bg-blue-900/60 ring-1 ring-blue-500"
                                : "hover:bg-slate-200 dark:hover:bg-[#1E293B]"
                            }`}
                            title={`React with ${emoji}`}
                          >
                            {emoji}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-[#1E293B] flex items-center justify-between text-[11px] text-slate-500">
                  <span>Click any emoji above to toggle live state</span>
                  <span className="font-semibold text-pink-600 dark:text-pink-400">
                    Optimistic UI
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FEATURE 6: Mockup Left | Text Right -> Search & Chronological Partitioning */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual/Screenshot Mockup (Left on large screens) */}
            <div
              data-aos="fade-right"
              data-aos-duration="700"
              className="lg:col-span-7 order-2 lg:order-1"
            >
              <div className="rounded-2xl bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] shadow-xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E293B]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                      <Search className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Full-Text Indexed Search
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    2 Matches Found
                  </span>
                </div>

                {/* Simulated Search Bar & Highlighted Results */}
                <div className="space-y-3">
                  {/* Search Input Bar */}
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-[#0B0E14] border border-blue-500/40 ring-2 ring-blue-500/10">
                    <Search className="w-4 h-4 text-blue-500 shrink-0" />
                    <input
                      type="text"
                      readOnly
                      value="benchmark"
                      aria-label="Sample search query"
                      className="bg-transparent text-xs font-medium text-slate-900 dark:text-white outline-none w-full"
                    />
                    <span className="text-[10px] text-slate-400 font-mono">
                      ESC to clear
                    </span>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-semibold">
                      All Rooms
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 font-medium">
                      # frontend
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 font-medium">
                      Direct Messages
                    </span>
                  </div>

                  {/* Results List with Date Partition Headers */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0E14] border border-slate-200 dark:border-[#1E293B] space-y-2.5">
                    {/* Date Header: Today */}
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Today, August 22
                    </div>

                    {/* Match 1 */}
                    <div className="p-2 rounded-lg bg-white dark:bg-[#151921] border border-slate-200/80 dark:border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          Alex Mercer in # frontend
                        </span>
                        <span>11:05 AM</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                        The new protocol passed all stress{" "}
                        <mark className="bg-yellow-200 dark:bg-yellow-900/80 text-yellow-900 dark:text-yellow-100 px-1 rounded font-semibold">
                          benchmark
                        </mark>{" "}
                        tests with 10,000 packets!
                      </p>
                    </div>

                    {/* Date Header: Yesterday */}
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pt-1">
                      Yesterday, August 21
                    </div>

                    {/* Match 2 */}
                    <div className="p-2 rounded-lg bg-white dark:bg-[#151921] border border-slate-200/80 dark:border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          Sarah Chen in Direct Messages
                        </span>
                        <span>4:18 PM</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                        Can you share the benchmark latency graphs for the P99
                        delivery validation?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-[#1E293B] flex items-center justify-between text-[11px] text-slate-500">
                  <span>Filtered across groups and direct conversations</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    Chronological Partitioning
                  </span>
                </div>
              </div>
            </div>

            {/* Text Side (Right on large screens) */}
            <div
              data-aos="fade-left"
              data-aos-duration="700"
              className="lg:col-span-5 space-y-5 order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                <Search className="w-3.5 h-3.5" />
                <span>Lightning Search</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                Full-Text Search & Chronological Date Partitioning
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Instantly search keywords across all rooms and active
                conversations with zero latency. Results are grouped under clear
                chronological partition labels (Today, Yesterday, Last Week)
                with contextual highlighting.
              </p>

              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>
                    <strong>Sub-Millisecond Filtering:</strong> Real-time
                    substring matching across all conversation logs.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>
                    <strong>Date Range Headers:</strong> Intelligent timestamps
                    grouping messages into neat chronological blocks.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>
                    <strong>Direct Navigation:</strong> Tap any search result to
                    jump directly to its exact place in history.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
