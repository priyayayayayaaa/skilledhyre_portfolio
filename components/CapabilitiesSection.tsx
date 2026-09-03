"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CAPABILITIES, Capability } from "@/data/portfolioData";
import { ArrowUpRight, Sparkles, Check, ChevronRight } from "lucide-react";

interface CapabilitiesSectionProps {
  onOpenProjectModal: () => void;
}

export default function CapabilitiesSection({ onOpenProjectModal }: CapabilitiesSectionProps) {
  const [selectedCap, setSelectedCap] = useState<Capability>(CAPABILITIES[0]);

  return (
    <section id="capabilities" className="py-24 bg-[#08090E] relative overflow-hidden border-t border-white/5">
      {/* Background Subtle Gradient */}
      <div className="glow-orb-cyan top-1/2 -left-40 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-400/20 px-3 py-1 rounded-full">
            CAPABILITIES
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white mt-4 tracking-tight">
            WHAT WE <span className="text-gradient-cyan">BUILD</span>.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3 max-w-2xl">
            Click or hover over any capability to reveal our engineered stack, core capabilities, and real project outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Large Interactive Typography List */}
          <div className="lg:col-span-7 space-y-3">
            {CAPABILITIES.map((cap, idx) => {
              const isSelected = selectedCap.id === cap.id;
              return (
                <div
                  key={cap.id}
                  onClick={() => setSelectedCap(cap)}
                  onMouseEnter={() => setSelectedCap(cap)}
                  className={`group cursor-pointer p-5 sm:p-6 rounded-2xl transition-all duration-300 border ${
                    isSelected
                      ? "bg-[#0F111A] border-cyan-400/40 shadow-[0_0_30px_rgba(0,242,254,0.12)]"
                      : "bg-white/[0.01] hover:bg-white/[0.03] border-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-slate-500">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className={`font-display font-black text-xl sm:text-2xl lg:text-3xl tracking-tight transition-colors duration-300 ${
                          isSelected
                            ? "text-white scale-[1.02] origin-left"
                            : "text-slate-400 group-hover:text-slate-200"
                        }`}
                      >
                        {cap.title}
                      </h3>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isSelected ? "text-cyan-400 translate-x-1" : "text-slate-600 group-hover:text-slate-400"
                      }`}
                    />
                  </div>

                  {/* Inline preview on mobile when selected */}
                  {isSelected && (
                    <p className="mt-2 text-xs text-slate-400 font-normal lg:hidden">
                      {cap.shortDesc}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Deep-Dive Capability Card */}
          <div className="lg:col-span-5 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCap.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-panel p-8 rounded-3xl border border-cyan-500/30 shadow-[0_0_40px_rgba(0,242,254,0.1)] relative overflow-hidden"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-xs font-mono mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CORE CAPABILITY</span>
                </div>

                <h4 className="text-2xl font-display font-bold text-white mb-3">
                  {selectedCap.title}
                </h4>

                <p className="text-cyan-300 font-medium text-sm mb-4">
                  "{selectedCap.shortDesc}"
                </p>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {selectedCap.fullDesc}
                </p>

                {/* Features List */}
                <div className="mb-6 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-2">
                    WHAT WE DELIVER
                  </span>
                  {selectedCap.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-xs text-slate-200">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies Badges */}
                <div className="mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-2">
                    STACK & ENGINE
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCap.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Example Project Highlight */}
                <div className="p-4 rounded-xl bg-[#08090E] border border-cyan-400/20 mb-6">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                    FEATURED OUTCOME
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-bold text-white">
                      {selectedCap.exampleProject.title}
                    </span>
                    <span className="text-xs font-mono font-extrabold text-cyan-400">
                      {selectedCap.exampleProject.impact}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={onOpenProjectModal}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:scale-[1.02] transition-transform"
                >
                  <span>Explore Capability</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
