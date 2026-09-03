"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TECHNOLOGIES, TECH_CATEGORIES, TechItem } from "@/data/portfolioData";
import { Cpu, Code, Database, Server, BarChart, Sparkles } from "lucide-react";

const CATEGORY_ICONS = {
  AI: Cpu,
  DEVELOPMENT: Code,
  "DATA & CLOUD": Database,
  "BUSINESS SYSTEMS": Server,
  MARKETING: BarChart,
};

export default function TechnologyConstellation() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const filteredTech =
    selectedCategory === "ALL"
      ? TECHNOLOGIES
      : TECHNOLOGIES.filter((t) => t.category === selectedCategory);

  return (
    <section id="technology" className="py-24 bg-[#08090E] relative overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="glow-orb-cyan top-1/3 right-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-400/20 px-3.5 py-1 rounded-full">
            TECHNOLOGY CONSTELLATION
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white mt-4 tracking-tight">
            THE TECHNOLOGY <span className="text-gradient-cyan">BEHIND THE WORK</span>.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4">
            Our multi-disciplinary engineering stack spans enterprise backends, generative AI, cloud pipelines, and data-driven marketing engines.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
              selectedCategory === "ALL"
                ? "bg-cyan-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(0,242,254,0.4)]"
                : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
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
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-400 to-violet-600 text-white font-bold shadow-[0_0_20px_rgba(0,242,254,0.4)]"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tech Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredTech.map((tech) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-400/40 hover:bg-[#0F111A] transition-all duration-300 group relative overflow-hidden"
              >
                {tech.popular && (
                  <div className="absolute top-3 right-3">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                )}
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">
                  {tech.category}
                </span>
                <h4 className="text-base font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {tech.name}
                </h4>

                {/* Proficiency Bar */}
                <div className="mt-4">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-1">
                    <span>DOMAINS ENGINE</span>
                    <span>{tech.proficiency}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tech.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
