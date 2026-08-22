"use client";
import { ArchitectureSpecViewer } from "@/components/landing/ArchitectureSpecViewer";
import { CallToActionSection } from "@/components/landing/CallToActionSection";
import { FeatureBentoGrid } from "@/components/landing/FeatureBentoGrid";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";

interface LandingPageProps {}

const LandingScreen: React.FC<LandingPageProps> = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: false,
      offset: 60,
      delay: 50,
    });
    AOS.refresh();
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      id="landing-page"
      className="min-h-screen w-screen flex flex-col bg-white dark:bg-[#0B0E14] text-slate-900 dark:text-slate-100 transition-colors selection:bg-blue-500/30 selection:text-white"
    >
      {/* Top Fixed / Sticky Navigation Bar */}
      <LandingNavbar onScrollToSection={handleScrollToSection} />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Interactive Live Sandbox & Protocol Streamer */}
        <LandingHero />

        {/* 2. Bento Grid: Architectural Features */}
        <FeatureBentoGrid />

        {/* 3. OpenAPI / Swagger Spec Interactive Explorer */}
        <ArchitectureSpecViewer />

        {/* 4. Standalone Call To Action Section */}
        <CallToActionSection />
      </main>

      {/* Footer */}
      <LandingFooter onScrollToTop={handleScrollToTop} />
    </div>
  );
};

export default LandingScreen;
