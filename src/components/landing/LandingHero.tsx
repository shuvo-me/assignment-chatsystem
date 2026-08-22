"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
// import { InteractiveChatSandbox } from "./InteractiveChatSandbox";

interface LandingHeroProps {}

export const LandingHero: React.FC<LandingHeroProps> = ({}) => {
  return (
    <section id="section-hero" className="relative pt-12 pb-20 overflow-hidden">
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-500/15 dark:bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-96 h-48 bg-sky-400/10 dark:bg-sky-500/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header Text */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Bold Display Headline */}
          <h1
            data-aos="fade-down"
            data-aos-duration="800"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
          >
            Enterprise-Grade Chat.{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
              Zero Lag. Pure Flow.
            </span>
          </h1>

          {/* Refined Technical Subheadline */}
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="800"
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            A high-performance real-time messaging engine built with
            passwordless phone identity, optimistic UI updates,
            multi-participant group channels, smart auto-scroll, and live
            network resilience.
          </p>

          {/* Hero Action Buttons */}
          <div
            data-aos="zoom-in"
            data-aos-delay="200"
            className="pt-2 flex items-center justify-center"
          >
            <Link
              id="hero-launch-primary-btn"
              prefetch={false}
              href="/chat"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 active:scale-98 text-white font-semibold text-sm shadow-xl shadow-blue-600/30 transition-all cursor-pointer group"
            >
              <span>Launch Live Chat Application</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
          >
            <div className="p-3 rounded-xl bg-white/70 dark:bg-[#151921]/60 border border-slate-200/80 dark:border-[#1E293B] text-center shadow-xs">
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                0ms
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Optimistic Local Render
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/70 dark:bg-[#151921]/60 border border-slate-200/80 dark:border-[#1E293B] text-center shadow-xs">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                1-Click
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Passwordless Phone Auth
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/70 dark:bg-[#151921]/60 border border-slate-200/80 dark:border-[#1E293B] text-center shadow-xs">
              <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                100%
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Smart Auto-Scroll Lock
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/70 dark:bg-[#151921]/60 border border-slate-200/80 dark:border-[#1E293B] text-center shadow-xs">
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                Dual Mode
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Light & Dark Synchronization
              </div>
            </div>
          </div>
        </div>

        {/* Hero Interactive Micro-Client Demo Section */}
        <div
          id="section-demo"
          data-aos="fade-up"
          data-aos-delay="400"
          className="mt-12 sm:mt-16"
        >
          <div className="text-center mb-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Live Demo • Try Sending a Message Below
            </h2>
          </div>
          {/* <InteractiveChatSandbox /> */}
        </div>
      </div>
    </section>
  );
};
