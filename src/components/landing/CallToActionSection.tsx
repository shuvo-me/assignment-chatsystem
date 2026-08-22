import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import React from "react";

interface CallToActionSectionProps {}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({}) => {
  return (
    <section
      id="section-cta"
      className="py-20 sm:py-28 relative overflow-hidden bg-slate-900 text-white border-t border-slate-800 transition-colors"
    >
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      <div
        data-aos="fade-up"
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center space-y-6"
      >
        {/* Eyebrow / Feature Badge */}
        <div
          data-aos="zoom-in"
          data-aos-delay="100"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ready for Live Interactive Review</span>
        </div>

        {/* Main Headline */}
        <h2
          data-aos="fade-up"
          data-aos-delay="150"
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
        >
          Experience the Real-Time Chat Application Live
        </h2>

        {/* Description Text */}
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed"
        >
          Test direct messages, group creations, emoji reactions, instant
          search, and zero-lag optimistic state updates directly in your
          browser.
        </p>

        {/* Action Button */}
        <div
          data-aos="zoom-in"
          data-aos-delay="250"
          className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
        >
          <button
            id="cta-launch-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 active:scale-98 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-600/30 transition-all cursor-pointer group"
          >
            <span>Launch Live Chat App</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Trust Badges */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400"
        >
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>0ms Optimistic Dispatch</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>OpenAPI / Swagger Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
};
