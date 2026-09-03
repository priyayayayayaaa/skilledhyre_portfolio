"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";

interface FinalCTASectionProps {
  onOpenProjectModal: () => void;
}

const FLOW_NODES = ["AI", "SOFTWARE", "AUTOMATION", "MARKETING", "GROWTH"];

export default function FinalCTASection({ onOpenProjectModal }: FinalCTASectionProps) {
  return (
    <section id="contact" className="py-28 bg-[#08090E] relative overflow-hidden border-t border-white/5">
      {/* Background Glow Orbs */}
      <div className="glow-orb-cyan top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern radial-mask opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Animated Digital Network Sequence Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {FLOW_NODES.map((node, i) => (
            <React.Fragment key={node}>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold tracking-widest">
                {node}
              </span>
              {i < FLOW_NODES.length - 1 && (
                <span className="text-slate-600 font-mono font-bold text-xs">→</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Main Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6">
          HAVE A BUSINESS PROBLEM{" "}
          <span className="text-gradient-cyan">WORTH SOLVING?</span>
        </h2>

        {/* Supporting text */}
        <p className="text-slate-300 text-lg sm:text-xl font-normal max-w-xl mx-auto mb-10 leading-relaxed">
          Let's turn it into technology, automation and growth.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenProjectModal}
            className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white font-bold text-sm tracking-wider uppercase shadow-[0_0_35px_rgba(0,242,254,0.4)] hover:shadow-[0_0_50px_rgba(0,242,254,0.6)] transition-all duration-300 hover:scale-105"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenProjectModal}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white font-medium text-sm tracking-wider transition-all duration-300"
          >
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>Talk to Our Team</span>
          </button>
        </div>
      </div>
    </section>
  );
}
