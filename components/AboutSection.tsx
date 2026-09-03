"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Sparkles } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#08090E] relative overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="glow-orb-cyan top-1/2 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-400/20 px-3.5 py-1 rounded-full">
              ABOUT SKILLEDHYRE LABS
            </span>

            <h2 className="text-3xl sm:text-5xl font-display font-black text-white mt-4 tracking-tight leading-tight">
              WE BUILD <span className="text-gradient-cyan">DIGITAL ADVANTAGE</span>.
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mt-6 mb-8">
              SkilledHyre Labs brings together technology, AI, automation, digital marketing and technical talent to help businesses solve complex problems and create sustainable growth.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-400/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">OUR MISSION</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Build technology that creates measurable business value and compounding competitive advantage.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-violet-400/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-violet-400/10 border border-violet-400/30 flex items-center justify-center text-violet-400 mb-4">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">OUR VISION</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Become the technology and growth partner businesses rely on to build what comes next.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Workflow Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-500/20 relative overflow-hidden text-center shadow-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-6">
                <Sparkles className="w-4 h-4" />
                <span>UNIFIED ECOSYSTEM PLATFORM</span>
              </div>

              <div className="space-y-4 max-w-md mx-auto">
                <div className="p-4 rounded-xl bg-[#08090E] border border-white/10 flex items-center justify-between text-xs font-mono text-slate-200">
                  <span>INPUT: BUSINESS CHALLENGE</span>
                  <span className="text-cyan-400">RAW DATA →</span>
                </div>

                <div className="h-8 w-[2px] bg-gradient-to-b from-cyan-400 to-violet-500 mx-auto" />

                <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-violet-500/20 border border-cyan-400/40 text-center">
                  <span className="text-sm font-display font-bold text-white block">
                    SKILLEDHYRE LABS ENGINE
                  </span>
                  <span className="text-[11px] font-mono text-cyan-300">
                    Software • AI • Marketing • Talent
                  </span>
                </div>

                <div className="h-8 w-[2px] bg-gradient-to-b from-violet-500 to-emerald-400 mx-auto" />

                <div className="p-4 rounded-xl bg-[#08090E] border border-emerald-400/30 flex items-center justify-between text-xs font-mono text-slate-200">
                  <span>OUTPUT: MEASURABLE ADVANTAGE</span>
                  <span className="text-emerald-400">★ SCALED GROWTH</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
