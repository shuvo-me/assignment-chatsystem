"use client";

import { AlertCircle, CheckCircle2, X } from "lucide-react";
import React from "react";

interface ToastProps {
  id?: string;
  message: string;
  type?: "error" | "success" | "info";
  onClose: () => void;
  actionText?: string;
  onAction?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type = "error",
  onClose,
  actionText,
  onAction,
}) => {
  return (
    <div
      id={id}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-[#151921] text-slate-800 dark:text-[#E2E8F0] shadow-2xl border border-slate-200 dark:border-[#1E293B] animate-in fade-in slide-in-from-bottom-5 duration-200 max-w-md transition-colors"
    >
      {type === "error" && (
        <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
      )}
      {type === "success" && (
        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
      )}

      <p className="text-sm text-slate-800 dark:text-[#E2E8F0] flex-1 leading-snug">
        {message}
      </p>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="text-xs font-semibold text-[#3B82F6] hover:text-[#2563EB] dark:hover:text-[#60A5FA] px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
        >
          {actionText}
        </button>
      )}

      <button
        onClick={onClose}
        className="p-1 rounded-lg text-slate-400 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-[#E2E8F0] hover:bg-slate-100 dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
        title="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
