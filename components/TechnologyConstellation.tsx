"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TECHNOLOGIES, TECH_CATEGORIES, TechItem } from "@/data/portfolioData";

export default function TechnologyConstellation() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categoriesToShow =
    selectedCategory === "ALL"
      ? (TECH_CATEGORIES as unknown as string[])
      : [selectedCategory];

  return (
    <section
      id="technology"
      className="py-28 sm:py-36 bg-[#08090E] relative overflow-hidden border-t border-white/5"
    >
      {/* Ultra-subtle ambient glow in background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase block mb-3">
              TECHNOLOGY CONSTELLATION
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight leading-[1.1]">
              THE TECH BEHIND <br className="hidden sm:inline" />
              <span className="text-cyan-400">THE WORK</span>.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-normal mt-4 leading-relaxed max-w-xl">
              Our multi-disciplinary engineering stack spans enterprise backends, generative AI, cloud infrastructure, and data-driven marketing systems.
            </p>
          </motion.div>

          {/* Minimal Metadata */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-left md:text-right shrink-0"
          >
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 block uppercase">
              19+ CORE TOOLS
            </span>
            <span className="text-xs font-mono text-slate-400 block mt-1">
              Production Ready Stack
            </span>
          </motion.div>
        </div>

        {/* Minimal Horizontal Text Navigation Bar */}
        <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto no-scrollbar mb-20 pb-2 border-b border-white/10">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`pb-3 text-xs sm:text-sm font-mono tracking-widest uppercase transition-all relative shrink-0 ${
              selectedCategory === "ALL"
                ? "text-cyan-400 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ALL STACKS
            {selectedCategory === "ALL" && (
              <motion.div
                layoutId="categoryUnderline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400"
              />
            )}
          </button>

          {TECH_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`pb-3 text-xs sm:text-sm font-mono tracking-widest uppercase transition-all relative shrink-0 ${
                  isSelected
                    ? "text-cyan-400 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {cat}
                {isSelected && (
                  <motion.div
                    layoutId="categoryUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Editorial Technology Category Sections */}
        <div className="space-y-20">
          <AnimatePresence mode="wait">
            {categoriesToShow.map((cat) => {
              const categoryTechs = TECHNOLOGIES.filter((t) => t.category === cat);
              if (categoryTechs.length === 0) return null;

              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  {/* Category Title Header */}
                  <div className="flex items-center gap-4">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    <h3 className="text-xs sm:text-sm font-mono tracking-widest text-slate-300 uppercase font-bold">
                      {cat}
                    </h3>
                    <div className="h-px bg-white/10 flex-1" />
                  </div>

                  {/* Editorial Typography Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12 pt-2">
                    {categoryTechs.map((tech) => (
                      <div
                        key={tech.name}
                        className="group flex items-center justify-between py-2 border-b border-white/5 hover:border-cyan-400/40 transition-colors cursor-default"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-sm">
                            •
                          </span>
                          <span className="text-lg sm:text-xl font-display font-semibold text-slate-200 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                            {tech.name}
                          </span>
                        </div>

                        <span className="text-[10px] font-mono tracking-widest text-slate-400 group-hover:text-cyan-400 transition-colors uppercase">
                          ENTERPRISE
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
