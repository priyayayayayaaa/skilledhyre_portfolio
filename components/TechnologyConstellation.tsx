"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TECHNOLOGIES, TECH_CATEGORIES, TechItem } from "@/data/portfolioData";
import { Cpu, Code, Database, Server, BarChart, Sparkles, Search, Layers } from "lucide-react";

const CATEGORY_ICONS = {
  AI: Cpu,
  DEVELOPMENT: Code,
  "DATA & CLOUD": Database,
  "BUSINESS SYSTEMS": Server,
  MARKETING: BarChart,
};

export default function TechnologyConstellation() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTech = TECHNOLOGIES.filter((t) => {
    const matchesCategory = selectedCategory === "ALL" || t.category === selectedCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="technology" className="py-24 bg-[#08090E] relative overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="glow-orb-cyan top-1/3 right-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4">
            <Layers className="w-3.5 h-3.5 text-cyan-400" /> TECHNOLOGY CONSTELLATION
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight">
            THE TECHNOLOGY <span className="text-gradient-cyan">BEHIND THE WORK</span>.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4">
            Our multi-disciplinary engineering stack spans enterprise backends, generative AI, cloud pipelines, and data-driven marketing engines.
          </p>
        </div>

        {/* Search Bar & Category Controls */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tech stack (e.g. Next.js, C#, Generative AI, SEO)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-cyan-400 focus:bg-white/[0.06] text-white text-xs font-mono placeholder:text-slate-500 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
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
                  <div className="absolute top-3 right-3" title="Enterprise Core Flagship">
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
                    <span>ENGINEERING PROFICIENCY</span>
                    <span className="text-cyan-400 font-bold">{tech.proficiency}%</span>
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

        {filteredTech.length === 0 && (
          <div className="text-center py-12 text-slate-400 font-mono text-xs">
            No technologies found matching "{searchQuery}". Try searching another keyword.
          </div>
        )}
      </div>
    </section>
  );
}
