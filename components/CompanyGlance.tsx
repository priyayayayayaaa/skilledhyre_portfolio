"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Code2, Cpu, BarChart3, TrendingUp, CheckCircle2 } from "lucide-react";

const STAGES = [
  {
    id: "think",
    step: "01",
    title: "THINK",
    subtitle: "Strategy + Business Understanding",
    icon: Brain,
    color: "from-sky-400 to-blue-600",
    glow: "#38BDF8",
    description: "We start by analyzing revenue models, market friction, and operational bottlenecks before writing a single line of code.",
    points: ["Operational Bottleneck Audit", "ROI & Feasibility Blueprint", "Technical Roadmap & Specs"],
  },
  {
    id: "build",
    step: "02",
    title: "BUILD",
    subtitle: "Software + Products + Platforms",
    icon: Code2,
    color: "from-indigo-400 to-violet-600",
    glow: "#818CF8",
    description: "Mission-critical architectures engineered with C#, .NET, Python, and Next.js built for resilience, speed, and high availability.",
    points: ["Enterprise Backend APIs", "Modern Cloud Microservices", "Pixel-Perfect Web/Mobile UX"],
  },
  {
    id: "automate",
    step: "03",
    title: "AUTOMATE",
    subtitle: "AI + Workflows + Intelligent Systems",
    icon: Cpu,
    color: "from-purple-400 to-fuchsia-600",
    glow: "#C084FC",
    description: "We deploy custom AI agents, LLM pipelines, and automated workflows to compress manual operational tasks by up to 80%.",
    points: ["Custom LLM & RAG Pipelines", "Autonomous Document Parsing", "Automated Business Workflows"],
  },
  {
    id: "market",
    step: "04",
    title: "MARKET",
    subtitle: "SEO + SMM + Performance + Content",
    icon: BarChart3,
    color: "from-pink-400 to-rose-600",
    glow: "#F472B6",
    description: "High-intent organic search domination, programmatic content hubs, and precision performance ad funnels.",
    points: ["Technical & Programmatic SEO", "Omnichannel Ad Funnels", "High-Converting Content Hubs"],
  },
  {
    id: "scale",
    step: "05",
    title: "SCALE",
    subtitle: "Analytics + Optimization + Growth",
    icon: TrendingUp,
    color: "from-emerald-400 to-teal-600",
    glow: "#34D399",
    description: "Real-time telemetry, continuous CRO optimization, and pre-vetted tech talent pods to sustain exponential momentum.",
    points: ["Live Business Telemetry", "Conversion Rate Optimization", "Dedicated Tech Talent Pods"],
  },
];

export default function CompanyGlance() {
  const [activeStage, setActiveStage] = useState(STAGES[0]);

  return (
    <section id="approach" className="py-24 bg-[#08090E] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-400/20 px-3 py-1 rounded-full">
            THE COMPANY IN ONE GLANCE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mt-4 tracking-tight">
            MORE THAN A <span className="text-gradient-cyan">TECHNOLOGY COMPANY</span>.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4">
            We bring technology, talent and marketing together under one unified ecosystem.
          </p>
        </div>

        {/* Interactive Horizontal Sequence Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
          {STAGES.map((stage) => {
            const Icon = stage.icon;
            const isActive = activeStage.id === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage)}
                className={`relative p-5 rounded-2xl text-left transition-all duration-300 ${
                  isActive
                    ? "bg-[#0F111A] border border-cyan-400/50 shadow-[0_0_25px_rgba(0,242,254,0.15)]"
                    : "bg-white/[0.02] hover:bg-white/[0.05] border border-white/5"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-slate-500">{stage.step}</span>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${stage.color} text-white shadow-md`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-lg text-white tracking-wider">
                  {stage.title}
                </h3>
                <p className="text-[11px] text-slate-400 font-mono mt-1 truncate">
                  {stage.subtitle.split(" ")[0]}
                </p>

                {isActive && (
                  <motion.div
                    layoutId="glanceActiveIndicator"
                    className="absolute -bottom-1 left-4 right-4 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-400/30">
                    STAGE {activeStage.step}
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    {activeStage.title} — {activeStage.subtitle}
                  </h4>
                </div>
                <p className="text-slate-300 text-base leading-relaxed mb-6">
                  {activeStage.description}
                </p>

                <div className="space-y-3">
                  {activeStage.points.map((point) => (
                    <div key={point} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                      <span className="text-sm font-medium text-slate-200">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm p-6 rounded-2xl bg-[#08090E] border border-white/10 text-center relative group">
                  <div
                    className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-gradient-to-br text-white shadow-xl"
                    style={{ backgroundColor: activeStage.glow }}
                  >
                    {React.createElement(activeStage.icon, { className: "w-8 h-8" })}
                  </div>
                  <span className="text-xs font-mono uppercase text-slate-400 tracking-widest block mb-1">
                    EXECUTION PROTOCOL
                  </span>
                  <span className="text-lg font-display font-bold text-white">
                    {activeStage.title} ECOSYSTEM
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
