"use client";

import { ArrowUp, ExternalLink, MessageSquare } from "lucide-react";
import React from "react";

interface LandingFooterProps {
  onScrollToTop: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onScrollToTop,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 transition-colors">
      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
        {/* Brand Col */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white font-bold">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-base">
              Chat<span className="text-blue-400">System</span>
            </span>
          </div>

          <p className="text-slate-400 leading-relaxed text-xs">
            Part 1 Step 2 Engineering Implementation & Presentation Showcase.
          </p>

          <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All systems operational (100% Mock & WebSocket Active)</span>
          </div>
        </div>

        {/* Deliverables Col */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
            Deliverables
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>• Passwordless Phone Authentication</li>
            <li>• Direct 1-on-1 & Group Messaging</li>
            <li>• Smart Auto-Scroll Threshold Lock</li>
            <li>• Message Status (0ms, Sent, Read)</li>
            <li>• Full-Text Search & Chronological Filter</li>
          </ul>
        </div>

        {/* Tech Stack Col */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
            Tech Stack
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>• React 19 + TypeScript 5.8</li>
            <li>• Tailwind CSS v4 + Motion</li>
            <li>• Lucide React Icons</li>
            <li>• Swagger API Specification</li>
            <li>• WCAG AA Contrast Tokens</li>
          </ul>
        </div>

        {/* External Resources */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
            Documentation
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <a
                href="https://frontend-task-chatapp.onrender.com/docs/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 flex items-center gap-1 transition-colors"
              >
                <span>Swagger OpenAPI Documentation</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </li>
            <li>
              <button
                onClick={onScrollToTop}
                className="hover:text-blue-400 flex items-center gap-1 transition-colors cursor-pointer text-left"
              >
                <ArrowUp className="w-3 h-3" />
                <span>Back to top</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-slate-800 text-center text-slate-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>Chat System Technical Evaluation Boilerplate &copy; 2026</p>
        <p className="text-[11px] text-slate-400">
          Built with responsive precision & dual-mode theme support
        </p>
      </div>
    </footer>
  );
};
