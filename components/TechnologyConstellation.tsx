"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TECHNOLOGIES, TECH_CATEGORIES } from "@/data/portfolioData";
import { Cpu, Code, Database, Server, BarChart, Layers } from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  AI: Cpu,
  DEVELOPMENT: Code,
  "DATA & CLOUD": Database,
  "BUSINESS SYSTEMS": Server,
  MARKETING: BarChart,
};

export default function TechnologyConstellation() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const filteredTech = TECHNOLOGIES.filter(
    (t) => selectedCategory === "ALL" || t.category === selectedCategory
  );

  return (
    <section id="technology" className="py-20 bg-[#08090E] relative overflow-hidden border-t border-white/5">
      {/* Ambient Glow */}
      <div className="glow-orb-cyan top-1/3 right-1/4 pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
            <Layers className="w-3.5 h-3.5 text-cyan-400" /> TECHNOLOGY STACK
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            THE TECH <span className="text-gradient-cyan">BEHIND THE WORK</span>.
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 pb-4 border-b border-white/5">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              selectedCategory === "ALL"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,242,254,0.15)]"
                : "bg-white/[0.03] text-slate-400 border border-white/5 hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            ALL STACKS ({TECHNOLOGIES.length})
          </button>
          {TECH_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat];
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,242,254,0.15)]"
                    : "bg-white/[0.03] text-slate-400 border border-white/5 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Compact Tech Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          <AnimatePresence>
            {filteredTech.map((tech) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/40 hover:bg-[#0F111A] transition-all duration-300 group"
              >
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 truncate">
                    {tech.category}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">
                    {tech.proficiency}%
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-display font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                  {tech.name}
                </h4>

                {/* Progress bar */}
                <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden mt-2.5">
                  <div
                    style={{ width: `${tech.proficiency}%` }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
