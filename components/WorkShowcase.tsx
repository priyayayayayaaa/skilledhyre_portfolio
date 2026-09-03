"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CASE_STUDIES, CaseStudy } from "@/data/portfolioData";
import { ArrowUpRight, CheckCircle, Layers, Cpu, Zap, X } from "lucide-react";

export default function WorkShowcase() {
  const [activeProject, setActiveProject] = useState<CaseStudy>(CASE_STUDIES[0]);
  const [modalProject, setModalProject] = useState<CaseStudy | null>(null);

  return (
    <section id="work" className="py-28 bg-[#08090E] relative overflow-hidden border-t border-white/5">
      {/* Glow Orbs */}
      <div className="glow-orb-violet -top-20 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-400/20 px-3.5 py-1 rounded-full">
            PORTFOLIO SHOWCASE
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white mt-4 tracking-tight leading-tight">
            DON'T TAKE OUR WORD FOR IT.
            <span className="block text-gradient-cyan">LOOK AT THE WORK.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4">
            Cinematic case studies demonstrating how we transform complex operational challenges into engineered business advantage.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {CASE_STUDIES.map((project, idx) => {
            const isActive = activeProject.id === project.id;
            return (
              <button
                key={project.id}
                onClick={() => setActiveProject(project)}
                className={`px-5 py-3 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold shadow-[0_0_25px_rgba(0,242,254,0.3)]"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                }`}
              >
                <span>0{idx + 1}.</span>
                <span>{project.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Project Storytelling Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Visual Mockup / Hero Image */}
              <div className="lg:col-span-6 relative min-h-[350px] lg:min-h-[500px] overflow-hidden group">
                <img
                  src={activeProject.heroImage}
                  alt={activeProject.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F111A] via-[#0F111A]/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0F111A]" />

                <div className="absolute top-6 left-6 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#08090E]/80 backdrop-blur-md text-cyan-400 border border-cyan-400/30">
                    {activeProject.industry}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-wrap gap-4">
                  {activeProject.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="px-4 py-3 rounded-2xl bg-[#08090E]/85 backdrop-blur-md border border-cyan-400/30 shadow-lg"
                    >
                      <span className="text-xl sm:text-2xl font-display font-black text-cyan-400 block">
                        {m.value}
                      </span>
                      <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Case Study Details */}
              <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-[#0F111A]">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
                    {activeProject.category}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
                    {activeProject.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-400 mb-6">
                    {activeProject.subtitle}
                  </p>

                  {/* Challenge */}
                  <div className="mb-5">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 block mb-1">
                      CHALLENGE
                    </span>
                    <p className="text-slate-200 text-sm leading-snug">
                      {activeProject.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="mb-5">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 block mb-1">
                      SOLUTION
                    </span>
                    <p className="text-slate-200 text-sm leading-snug">
                      {activeProject.solution}
                    </p>
                  </div>

                  {/* Technology Pills */}
                  <div className="mb-8">
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block mb-2">
                      ENGINEERING STACK
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Trigger */}
                <div>
                  <button
                    onClick={() => setModalProject(activeProject)}
                    className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 text-white font-medium text-xs tracking-wider uppercase transition-all duration-300"
                  >
                    <span>Read Deep Case Study</span>
                    <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Case Study Detail Modal Overlay */}
      <AnimatePresence>
        {modalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0F111A] border border-white/20 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl"
            >
              <button
                onClick={() => setModalProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                {modalProject.category} • {modalProject.industry}
              </span>
              <h3 className="text-3xl font-display font-bold text-white mt-1 mb-4">
                {modalProject.title}
              </h3>

              <img
                src={modalProject.heroImage}
                alt={modalProject.title}
                className="w-full h-64 object-cover rounded-2xl mb-6 border border-white/10"
              />

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Background & Operational Challenge</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{modalProject.challenge}</p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Engineered Solution & Architecture</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{modalProject.solution}</p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white mb-3">Key Results & Business Impact</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {modalProject.metrics.map((m) => (
                      <div key={m.label} className="p-4 rounded-xl bg-white/5 border border-cyan-400/30 text-center">
                        <span className="text-2xl font-bold text-cyan-400 block">{m.value}</span>
                        <span className="text-xs font-mono text-slate-400">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
