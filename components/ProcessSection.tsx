"use client";

import React from "react";
import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/data/portfolioData";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-[#08090E] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-400/20 px-3.5 py-1 rounded-full">
            OUR EXECUTION ENGINE
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white mt-4 tracking-tight">
            FROM PROBLEM TO <span className="text-gradient-cyan">PROGRESS</span>.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4">
            A disciplined 5-step methodology designed to eliminate risk, maintain sprint speed, and deliver predictable ROI.
          </p>
        </div>

        {/* Process Timeline Grid */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400/20 via-blue-500/40 to-violet-500/20 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {PROCESS_STEPS.map((stepItem, idx) => (
              <motion.div
                key={stepItem.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-400/50 hover:bg-[#0F111A] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-display font-black text-gradient-cyan">
                      {stepItem.step}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {stepItem.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400/80 mb-3">
                    {stepItem.subtitle}
                  </p>
                  <p className="text-slate-300 text-xs leading-relaxed mb-6">
                    {stepItem.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                    KEY DELIVERABLES
                  </span>
                  {stepItem.deliverables.map((del) => (
                    <div key={del} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{del}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
