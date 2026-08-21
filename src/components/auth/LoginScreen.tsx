"use client";
import { useChat } from "@/context/ChatContext";
import { useTheme } from "@/context/ThemeContext";
import { MOCK_USERS } from "@/lib/mockData";
import {
  ArrowRight,
  Check,
  ExternalLink,
  Info,
  Lock,
  MessageSquare,
  Moon,
  Phone,
  ShieldCheck,
  Sparkles,
  Sun,
  User as UserIcon,
  Users,
  Zap,
} from "lucide-react";
import React, { useState } from "react";

const LoginScreen: React.FC = () => {
  const { login, currentUser } = useChat();
  const { isDark, toggleTheme } = useTheme();
  const [phone, setPhone] = useState(currentUser?.phone || "+1 (555) 234-5678");
  const [name, setName] = useState(currentUser?.name || "Alex Mercer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setFormError("Please enter a valid phone number");
      return;
    }
    if (!name.trim()) {
      setFormError("Please enter your display name");
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError(null);
      await login({ phone: phone.trim(), name: name.trim() });
    } catch (err: any) {
      setFormError(err.message || "Authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectDemoUser = async (
    demoUser: (typeof MOCK_USERS)[0],
    autoLogin = false,
  ) => {
    setPhone(demoUser.phone);
    setName(demoUser.name);
    setFormError(null);

    if (autoLogin) {
      try {
        setIsSubmitting(true);
        await login({ phone: demoUser.phone, name: demoUser.name });
      } catch (err: any) {
        setFormError(err.message || "Authentication failed.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div
      id="login-screen"
      className="min-h-screen w-screen flex flex-col bg-slate-50 dark:bg-[#0B0E14] text-slate-900 dark:text-[#E2E8F0] overflow-y-auto selection:bg-[#3B82F6]/30 selection:text-white transition-colors"
    >
      {/* Top Header / Brand Bar */}
      <header className="w-full border-b border-slate-200 dark:border-[#1E293B] bg-white/80 dark:bg-[#151921]/70 backdrop-blur-md px-6 py-4 flex items-center justify-between flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#60A5FA] flex items-center justify-center text-white shadow-lg shadow-[#3B82F6]/20">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-[#E2E8F0]">
                Chat System
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#3B82F6] text-[10px] font-semibold">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-[#94A3B8]">
              Part 1 Step 2 — Production UI
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Theme switcher */}
          <button
            id="btn-login-theme-toggle"
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 dark:hover:bg-[#1E293B]/80 text-xs font-medium text-slate-700 dark:text-[#E2E8F0] transition-colors border border-slate-200 dark:border-[#1E293B] cursor-pointer"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          <a
            href="https://frontend-task-chatapp.onrender.com/docs/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 dark:hover:bg-[#1E293B]/80 text-xs font-medium text-slate-700 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#E2E8F0] transition-colors border border-slate-200 dark:border-[#1E293B]"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Swagger API Specs</span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Product Showcase & Overview */}
          <div className="lg:col-span-6 space-y-6 lg:pr-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/25 text-xs font-medium text-[#3B82F6]">
              <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
              <span>Passwordless Phone Authentication</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-[#E2E8F0] leading-tight">
                Connect & collaborate with your team in real time.
              </h1>
              <p className="text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed max-w-lg">
                Sign in with any phone number and display name. Instant access
                with full support for direct chats, group rooms, voice
                recordings, attachments, and emoji reactions.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] flex items-start gap-3 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/15 text-[#3B82F6] flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-semibold text-slate-900 dark:text-[#E2E8F0]">
                    Instant Direct Chats
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-[#94A3B8] mt-0.5">
                    Real-time messaging with typing and delivery indicators
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] flex items-start gap-3 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/15 text-[#3B82F6] flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-semibold text-slate-900 dark:text-[#E2E8F0]">
                    Group Conversations
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-[#94A3B8] mt-0.5">
                    Multi-participant channels with custom badge themes
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] flex items-start gap-3 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/15 text-[#3B82F6] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-semibold text-slate-900 dark:text-[#E2E8F0]">
                    Rich Interactions
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-[#94A3B8] mt-0.5">
                    Reactions, voice memos, media files, and message search
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-[#151921] border border-slate-200 dark:border-[#1E293B] flex items-start gap-3 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/15 text-[#3B82F6] flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-semibold text-slate-900 dark:text-[#E2E8F0]">
                    Local Persistence
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-[#94A3B8] mt-0.5">
                    Safe client state caching across browser sessions
                  </p>
                </div>
              </div>
            </div>

            {/* Note banner */}
            <div className="p-3 rounded-xl bg-white/70 dark:bg-[#151921]/60 border border-slate-200 dark:border-[#1E293B] flex items-center gap-2.5 text-xs text-slate-600 dark:text-[#94A3B8]">
              <Info className="w-4 h-4 text-[#3B82F6] flex-shrink-0" />
              <span>
                For testing, choose one of the pre-seeded team profiles or enter
                custom credentials.
              </span>
            </div>
          </div>

          {/* Right Column: Authentication Card */}
          <div className="lg:col-span-6">
            <div
              id="login-card"
              className="bg-white dark:bg-[#151921] rounded-2xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-[#1E293B] overflow-hidden transition-colors"
            >
              {/* Card Header */}
              <div className="p-6 pb-4 border-b border-slate-200 dark:border-[#1E293B]">
                <h2 className="text-lg font-bold text-slate-900 dark:text-[#E2E8F0]">
                  Sign In / Register
                </h2>
                <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1">
                  Enter your details below. New phone numbers are automatically
                  registered.
                </p>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-5">
                {formError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs font-medium flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Phone Number Field */}
                  <div>
                    <label
                      htmlFor="login-phone-input"
                      className="block text-xs font-semibold text-slate-500 dark:text-[#94A3B8] uppercase tracking-wider mb-1.5"
                    >
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-[#64748B]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        id="login-phone-input"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 234-5678"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#1E293B] bg-slate-50 dark:bg-[#0B0E14] text-slate-900 dark:text-[#E2E8F0] text-sm focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all placeholder:text-slate-400 dark:placeholder:text-[#64748B]"
                        required
                      />
                    </div>
                  </div>

                  {/* Display Name Field */}
                  <div>
                    <label
                      htmlFor="login-name-input"
                      className="block text-xs font-semibold text-slate-500 dark:text-[#94A3B8] uppercase tracking-wider mb-1.5"
                    >
                      Your Display Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-[#64748B]">
                        <UserIcon className="w-4 h-4" />
                      </div>
                      <input
                        id="login-name-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Mercer"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#1E293B] bg-slate-50 dark:bg-[#0B0E14] text-slate-900 dark:text-[#E2E8F0] text-sm focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all placeholder:text-slate-400 dark:placeholder:text-[#64748B]"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="login-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] active:scale-[0.99] disabled:opacity-60 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#3B82F6]/20 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Enter Chat Application</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* 1-Click Demo Profiles */}
                <div className="pt-4 border-t border-slate-200 dark:border-[#1E293B]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-[#94A3B8] font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
                      <span>Quick Sign In with Test Profiles</span>
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-[#64748B]">
                      Click to auto-fill
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                    {MOCK_USERS.map((user) => {
                      const isSelected = phone === user.phone;
                      return (
                        <button
                          key={user.id}
                          type="button"
                          onClick={() => handleSelectDemoUser(user, false)}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer group ${
                            isSelected
                              ? "border-[#3B82F6] bg-blue-50/80 dark:bg-[#3B82F6]/15 text-[#3B82F6]"
                              : "border-slate-200 dark:border-[#1E293B] hover:border-[#3B82F6]/40 bg-slate-50 dark:bg-[#0B0E14] text-slate-800 dark:text-[#E2E8F0]"
                          }`}
                        >
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ backgroundColor: user.color || "#3B82F6" }}
                          >
                            {user.name.charAt(0)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-semibold text-[11px] group-hover:text-[#3B82F6] transition-colors">
                              {user.name}
                            </div>
                            <div className="truncate text-[10px] text-slate-500 dark:text-[#94A3B8]">
                              {user.phone}
                            </div>
                          </div>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-[#3B82F6] flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-3 bg-slate-50 dark:bg-[#0B0E14] border-t border-slate-200 dark:border-[#1E293B] flex items-center justify-between text-[11px] text-slate-500 dark:text-[#94A3B8]">
                <span>No password required</span>
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Mock Server Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 border-t border-slate-200 dark:border-[#1E293B] text-center text-xs text-slate-500 dark:text-[#64748B] flex-shrink-0">
        <p>Chat System Boilerplate &copy; 2026 • Light & Dark Mode Ready</p>
      </footer>
    </div>
  );
};

export default LoginScreen;
