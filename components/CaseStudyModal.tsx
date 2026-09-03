"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaseStudy } from "@/data/portfolioData";
import { X, Sparkles, CheckCircle2, ArrowRight, Layers, ShieldCheck, Zap } from "lucide-react";

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenProjectModal: () => void;
}

export default function CaseStudyModal({
  caseStudy,
  isOpen,
  onClose,
  onOpenProjectModal,
}: CaseStudyModalProps) {
  if (!isOpen || !caseStudy) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#0f111a] border border-cyan-500/30 rounded-3xl shadow-[0_0_50px_rgba(0,242,254,0.2)] overflow-hidden z-10 my-8"
        >
          {/* Header Hero Banner with Image & Gradient Overlay */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden">
            <img
              src={caseStudy.heroImage}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f111a] via-[#0f111a]/70 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title & Eyebrow */}
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-3">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> {caseStudy.category.toUpperCase()} • {caseStudy.industry.toUpperCase()}
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
                {caseStudy.title}
              </h2>
              <p className="text-sm font-mono text-cyan-400/90 mt-1">{caseStudy.subtitle}</p>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {/* Impact Metrics Grid */}
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" /> VERIFIED IMPACT & OUTCOMES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {caseStudy.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col items-center text-center hover:border-cyan-400/40 transition-colors"
                  >
                    <span className="text-3xl font-display font-black text-gradient-cyan mb-1">
                      {metric.value}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-3">
                <h4 className="text-sm font-display font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                  <span>⚠️</span> THE BUSINESS CHALLENGE
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                  {caseStudy.challenge}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-400/20 space-y-3">
                <h4 className="text-sm font-display font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> OUR ARCHITECTURAL SOLUTION
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                  {caseStudy.solution}
                </p>
              </div>
            </div>

            {/* Tech Stack Used */}
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" /> TECHNOLOGIES & INFRASTRUCTURE
              </h4>
              <div className="flex flex-wrap gap-2">
                {caseStudy.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-cyan-300 font-mono text-xs font-semibold"
                  >
                    • {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="p-6 bg-white/[0.02] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> SkilledHyre Verified Enterprise Case Study
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-colors w-full sm:w-auto text-center"
              >
                Close Deep Dive
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenProjectModal();
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-display font-bold text-xs hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Build Similar System <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
