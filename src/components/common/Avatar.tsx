"use client";

import React from "react";
import { UserStatus } from "../../types/chat";

interface AvatarProps {
  id?: string;
  name: string;
  avatarUrl?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?: UserStatus;
  color?: string;
  isGroup?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  id,
  name,
  avatarUrl,
  size = "md",
  status,
  color = "#6366f1",
  isGroup = false,
}) => {
  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base font-medium",
    xl: "w-16 h-16 text-xl font-semibold",
  };

  const statusSizeClasses = {
    xs: "w-1.5 h-1.5 ring-1",
    sm: "w-2 h-2 ring-1.5",
    md: "w-2.5 h-2.5 ring-2",
    lg: "w-3 h-3 ring-2",
    xl: "w-3.5 h-3.5 ring-2",
  };

  const statusColors = {
    online: "bg-emerald-500",
    away: "bg-amber-500",
    busy: "bg-rose-500",
    offline: "bg-slate-400",
  };

  const getInitials = (str: string) => {
    if (!str) return "?";
    const parts = str.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  return (
    <div
      id={id}
      className="relative inline-flex flex-shrink-0 items-center justify-center"
    >
      {avatarUrl && !isGroup ? (
        <img
          src={avatarUrl}
          alt={name}
          className={`${sizeClasses[size]} rounded-full object-cover shadow-xs border border-slate-200/60 dark:border-slate-700/60`}
          referrerPolicy="no-referrer"
          onError={(e) => {
            // fallback to initials on broken image
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-full flex items-center justify-center text-white font-semibold shadow-xs select-none`}
          style={{ backgroundColor: color }}
        >
          {getInitials(name)}
        </div>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 rounded-full ring-white dark:ring-slate-900 ${statusSizeClasses[size]} ${statusColors[status]}`}
          title={`Status: ${status}`}
        />
      )}
    </div>
  );
};
