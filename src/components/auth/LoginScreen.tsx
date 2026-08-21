"use client";
import { authService } from "@/services/auth.service";
import { useChat } from "@/context/ChatContext";
import { useTheme } from "@/context/ThemeContext";
import {
  ArrowRight,
  MessageSquare,
  Moon,
  Phone,
  Sun,
  User as UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginScreen: React.FC = () => {
  const { completeLogin } = useChat();
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const loginMutation = authService.useLogin();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
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
      setFormError(null);
      const user = await loginMutation.mutateAsync({
        phone: phone.trim(),
        name: name.trim(),
      });
      completeLogin(user);
      router.replace("/");
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Authentication failed. Please try again.",
      );
    }
  };

  return (
    <div
      id="login-screen"
      className="min-h-screen w-screen flex flex-col bg-slate-50 dark:bg-[#0B0E14] text-slate-900 dark:text-[#E2E8F0] overflow-y-auto selection:bg-[#3B82F6]/30 selection:text-white transition-colors"
    >
      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10 flex-col ">
        <div className="flex items-center gap-3 mx-auto mb:16 lg:mb-20">
          <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-[#2563EB] to-[#60A5FA] flex items-center justify-center text-white shadow-lg shadow-[#3B82F6]/20">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-[#E2E8F0]">
                Chat System
              </span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 flex flex-col gap-8">
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
                  disabled={loginMutation.isPending}
                  className="w-full py-3 px-4 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] active:scale-[0.99] disabled:opacity-60 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#3B82F6]/20 transition-all cursor-pointer"
                >
                  {loginMutation.isPending ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Login to Chat Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="flex items-center gap-2.5 mx-auto">
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginScreen;
