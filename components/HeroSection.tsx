"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import InteractiveHeroEcosystem from "./InteractiveHeroEcosystem";

interface HeroSectionProps {
  onOpenProjectModal: () => void;
}

export default function HeroSection({ onOpenProjectModal }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-[#08090E] min-h-screen flex items-center">
      {/* Background Glow Orbs */}
      <div className="glow-orb-cyan -top-20 left-1/4 -translate-x-1/2" />
      <div className="glow-orb-violet top-40 right-10" />

      {/* Fine Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern radial-mask opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(0,242,254,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>SKILLEDHYRE LABS</span>
            </div>

            {/* Main Headline - Bold & 100% Visible */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-[1.1] mb-6">
              WE BUILD WHAT{" "}
              <span className="text-gradient-cyan">MOVES BUSINESS</span> FORWARD.
            </h1>

            {/* Statement Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6 font-mono text-xs font-bold tracking-widest text-slate-300">
              {["BUILD", "AUTOMATE", "MARKET", "SCALE"].map((word, idx) => (
                <React.Fragment key={word}>
                  <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-400">
                    • {word}
                  </span>
                  {idx < 3 && <span className="text-slate-600 font-extrabold">•</span>}
                </React.Fragment>
              ))}
            </div>

            {/* Supporting Text */}
            <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed mb-8 max-w-lg">
              We combine AI, software engineering, automation, and digital marketing to build scalable products, automate workflows, and drive growth.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenProjectModal}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white font-semibold text-sm tracking-wider uppercase shadow-[0_0_35px_rgba(0,242,254,0.4)] hover:shadow-[0_0_50px_rgba(0,242,254,0.7)] transition-all duration-300 hover:scale-[1.03]"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToWork}
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white font-medium text-sm tracking-wider transition-all duration-300"
              >
                <span>Explore Our Work</span>
                <ArrowDown className="w-4 h-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Visual Ecosystem Canvas Column */}
          <div className="lg:col-span-6 w-full">
            {mounted ? (
              <InteractiveHeroEcosystem />
            ) : (
              <div className="w-full h-[450px] rounded-3xl glass-panel border border-cyan-500/20 flex items-center justify-center text-xs font-mono text-cyan-400">
                LOADING DIGITAL ECOSYSTEM...
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
