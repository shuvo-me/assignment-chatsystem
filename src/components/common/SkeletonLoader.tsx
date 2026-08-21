"use client";

import React from "react";

export const ConversationSkeleton: React.FC = () => {
  return (
    <div className="space-y-2 p-2">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/60 dark:bg-[#1E293B]/40 animate-pulse border border-slate-200 dark:border-[#1E293B]"
        >
          <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#1E293B]" />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-center">
              <div className="h-4 w-28 bg-slate-200 dark:bg-[#1E293B] rounded" />
              <div className="h-3 w-12 bg-slate-200 dark:bg-[#1E293B] rounded" />
            </div>
            <div className="h-3.5 w-44 bg-slate-200 dark:bg-[#1E293B] rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const MessagesSkeleton: React.FC = () => {
  return (
    <div className="flex-1 p-6 space-y-5 overflow-hidden">
      <div className="flex justify-center">
        <div className="h-5 w-24 bg-slate-200 dark:bg-[#1E293B] rounded-full animate-pulse" />
      </div>

      <div className="flex items-end gap-2.5 max-w-[70%]">
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-[#1E293B] animate-pulse" />
        <div className="space-y-1.5 p-4 rounded-2xl rounded-bl-xs bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-[#1E293B] animate-pulse w-64 shadow-xs">
          <div className="h-3.5 bg-slate-200 dark:bg-[#0B0E14] rounded w-full" />
          <div className="h-3.5 bg-slate-200 dark:bg-[#0B0E14] rounded w-4/5" />
          <div className="h-2.5 bg-slate-200 dark:bg-[#0B0E14] rounded w-16 mt-2" />
        </div>
      </div>

      <div className="flex items-end justify-end gap-2.5 ml-auto max-w-[70%]">
        <div className="space-y-1.5 p-4 rounded-2xl rounded-br-xs bg-[#3B82F6]/20 dark:bg-[#3B82F6]/30 animate-pulse w-72">
          <div className="h-3.5 bg-[#3B82F6]/40 dark:bg-[#3B82F6]/50 rounded w-full" />
          <div className="h-3.5 bg-[#3B82F6]/40 dark:bg-[#3B82F6]/50 rounded w-3/5" />
          <div className="h-2.5 bg-[#3B82F6]/40 dark:bg-[#3B82F6]/50 rounded w-14 ml-auto mt-2" />
        </div>
      </div>

      <div className="flex items-end gap-2.5 max-w-[70%]">
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-[#1E293B] animate-pulse" />
        <div className="space-y-1.5 p-4 rounded-2xl rounded-bl-xs bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-[#1E293B] animate-pulse w-80 shadow-xs">
          <div className="h-3.5 bg-slate-200 dark:bg-[#0B0E14] rounded w-full" />
          <div className="h-3.5 bg-slate-200 dark:bg-[#0B0E14] rounded w-5/6" />
          <div className="h-3.5 bg-slate-200 dark:bg-[#0B0E14] rounded w-2/3" />
          <div className="h-2.5 bg-slate-200 dark:bg-[#0B0E14] rounded w-16 mt-2" />
        </div>
      </div>
    </div>
  );
};
