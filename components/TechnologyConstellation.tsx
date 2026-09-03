"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TECHNOLOGIES, TECH_CATEGORIES, TechItem } from "@/data/portfolioData";
import { 
  Cpu, 
  Code2, 
  Database, 
  Server, 
  BarChart3, 
  Sparkles, 
  Terminal, 
  BrainCircuit, 
  Workflow, 
  Globe2, 
  Cloud, 
  Layers, 
  Search, 
  TrendingUp, 
  Zap 
} from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  AI: Cpu,
  DEVELOPMENT: Code2,
  "DATA & CLOUD": Database,
  "BUSINESS SYSTEMS": Server,
  MARKETING: BarChart3,
};

const TECH_SPECIFIC_ICONS: Record<string, React.ElementType> = {
  "Generative AI": BrainCircuit,
  "Machine Learning": Cpu,
  "LLM & RAG Pipelines": Workflow,
  "Predictive Analytics": TrendingUp,
  "C#": Terminal,
  ".NET Core": Code2,
  "ASP.NET Core": Code2,
  "React & Next.js": Globe2,
  TypeScript: Code2,
  Python: Terminal,
  "SQL & PostgreSQL": Database,
  "Azure & AWS Cloud": Cloud,
  "Analytics Telemetry": BarChart3,
  "Custom ERP Engines": Server,
  "CRM Automation": Workflow,
  "API Gateways": Layers,
  "Technical SEO": Search,
  "Performance Marketing": TrendingUp,
  "Funnel Conversion": Zap,
};

export default function TechnologyConstellation() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const filteredTech = TECHNOLOGIES.filter(
    (t) => selectedCategory === "ALL" || t.category === selectedCategory
  );

  return (
    <section id="technology" className="py-24 bg-[#08090E] relative overflow-hidden border-t border-white/5">
      {/* Subtle Background Glow Orbs */}
      <div className="glow-orb-cyan top-1/3 left-1/4 pointer-events-none opacity-40" />
      <div className="glow-orb-violet bottom-10 right-1/4 pointer-events-none opacity-30" />

      {/* Fine Grid Overlay */}
      <div className="absolute inset-0 grid-pattern radial-mask opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
              <Layers className="w-3.5 h-3.5 text-cyan-400" /> TECHNOLOGY CONSTELLATION
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              THE TECH <span className="text-gradient-cyan">BEHIND THE WORK</span>.
            </h2>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-md">
            <div className="text-left">
              <span className="block text-xs font-mono font-bold text-cyan-400">19+ Core Tools</span>
              <span className="block text-[10px] font-mono text-slate-400">Production Ready Stack</span>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div className="text-left">
              <span className="block text-xs font-mono font-bold text-emerald-400">95% Avg Proficiency</span>
              <span className="block text-[10px] font-mono text-slate-400">Enterprise Verified</span>
            </div>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-4 border-b border-white/5">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              selectedCategory === "ALL"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_20px_rgba(0,242,254,0.2)]"
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
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_20px_rgba(0,242,254,0.2)]"
                    : "bg-white/[0.03] text-slate-400 border border-white/5 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Sleek High-End Technology Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredTech.map((tech) => {
              const TechIcon = TECH_SPECIFIC_ICONS[tech.name] || CATEGORY_ICONS[tech.category] || Code2;

              return (
                <motion.div
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="glass-panel p-5 rounded-3xl border border-white/10 hover:border-cyan-400/50 bg-[#0F111A] hover:bg-[#131624] transition-all duration-300 group flex items-center justify-between gap-4 shadow-lg hover:shadow-[0_0_25px_rgba(0,242,254,0.15)]"
                >
                  {/* Left Icon & Information */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                      <TechIcon className="w-6 h-6 text-cyan-400" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 truncate">
                          {tech.category}
                        </span>
                        {tech.popular && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[9px] font-mono font-bold border border-cyan-400/30 shrink-0">
                            <Sparkles className="w-2.5 h-2.5 text-cyan-400" /> CORE
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-display font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                        {tech.name}
                      </h4>
                    </div>
                  </div>

                  {/* Right Proficiency Badge & Status Pill */}
                  <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
                    <span className="text-xs font-mono font-bold text-cyan-400 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/20">
                      {tech.proficiency}%
                    </span>
                    <div className="w-16 h-1 rounded-full bg-white/10 overflow-hidden">
                      <div
                        style={{ width: `${tech.proficiency}%` }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
