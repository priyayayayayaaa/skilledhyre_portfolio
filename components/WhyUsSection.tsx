"use client";

import React from "react";
import { motion } from "framer-motion";
import { WHY_US_PILLARS } from "@/data/portfolioData";
import { ShieldCheck, Target, Layers, TrendingUp } from "lucide-react";

const PILLAR_ICONS = {
  "business-first": Target,
  "one-team": Layers,
  "built-to-scale": ShieldCheck,
  "measurable-impact": TrendingUp,
};

export default function WhyUsSection() {
  return (
    <section className="py-24 bg-[#08090E] relative overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="glow-orb-violet bottom-0 left-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-400/20 px-3.5 py-1 rounded-full">
            WHY CLIENTS CHOOSE US
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white mt-4 tracking-tight">
            ENGINEERED FOR <span className="text-gradient-cyan">ADVANTAGE</span>.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4">
            Proof over promises. We align software architecture, artificial intelligence, and growth marketing around measurable outcomes.
          </p>
        </div>

        {/* Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {WHY_US_PILLARS.map((pillar, idx) => {
            const Icon = PILLAR_ICONS[pillar.id as keyof typeof PILLAR_ICONS] || Target;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-cyan-400/40 hover:bg-[#0F111A] transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-md group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 block">PILLAR 0{idx + 1}</span>
                    <h3 className="text-2xl font-display font-bold text-white tracking-wide">
                      {pillar.title}
                    </h3>
                  </div>
                </div>

                <h4 className="text-base font-semibold text-cyan-300 mb-3">
                  "{pillar.highlight}"
                </h4>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
