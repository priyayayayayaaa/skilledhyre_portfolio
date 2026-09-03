"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS, CLIENT_LOGOS, Testimonial } from "@/data/portfolioData";
import { Star, ChevronLeft, ChevronRight, Quote, PlusCircle, CheckCircle2, Building2, Sparkles, Grid, Layers } from "lucide-react";
import SubmitReviewModal from "./SubmitReviewModal";

const CATEGORIES = ["ALL", "AI & Automation", "Software Engineering", "Digital Marketing", "Tech Talent"] as const;

export default function TestimonialsSection() {
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(TESTIMONIALS);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");

  const filteredTestimonials = testimonialsList.filter((item) =>
    activeCategory === "ALL" ? true : item.category === activeCategory
  );

  const safeIndex = currentIndex % (filteredTestimonials.length || 1);
  const current = filteredTestimonials[safeIndex] || filteredTestimonials[0] || testimonialsList[0];

  const handlePrev = () => {
    setCurrentIndex((idx) => (idx === 0 ? filteredTestimonials.length - 1 : idx - 1));
  };

  const handleNext = () => {
    setCurrentIndex((idx) => (idx === filteredTestimonials.length - 1 ? 0 : idx + 1));
  };

  const handleLogoClick = (testimonialId: string) => {
    const foundIdx = filteredTestimonials.findIndex((t) => t.id === testimonialId);
    if (foundIdx !== -1) {
      setCurrentIndex(foundIdx);
      setViewMode("carousel");
    }
  };

  const handleAddReview = (newReview: Testimonial) => {
    setTestimonialsList((prev) => [newReview, ...prev]);
    setActiveCategory("ALL");
    setCurrentIndex(0);
  };

  return (
    <section id="testimonials" className="py-24 bg-[#08090E] relative overflow-hidden border-t border-white/5">
      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header Badge & Action Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-mono mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" /> CLIENT VERIFICATION & LOGOS
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              BUILT WITH OUR CLIENTS.
              <span className="block text-gradient-cyan">MEASURED BY REAL RESULTS.</span>
            </h2>
          </div>

          {/* Action & Rating Summary */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-left">
                <span className="block text-xs font-mono font-bold text-white">4.9 / 5.0 Rating</span>
                <span className="block text-[10px] font-mono text-slate-400">45+ Verified Client Reviews</span>
              </div>
            </div>

            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-display font-bold text-xs sm:text-sm hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4" /> Add Your Review
            </button>
          </div>
        </div>

        {/* Client Logos Wall with Interactive Click */}
        <div className="mb-14">
          <p className="text-center text-xs font-mono text-slate-400 uppercase tracking-widest mb-6">
            ENTERPRISE PARTNERS & CLIENT LOGOS (Click a logo to view their testimonial)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {CLIENT_LOGOS.map((logo) => {
              const isSelected = current?.companyLogoText === logo.label || current?.companyName.toUpperCase().includes(logo.name.toUpperCase());
              return (
                <button
                  key={logo.name}
                  onClick={() => handleLogoClick(logo.testimonialId)}
                  className={`group relative p-4 rounded-2xl border text-center transition-all duration-300 ${
                    isSelected
                      ? "bg-cyan-500/15 border-cyan-400 shadow-[0_0_20px_rgba(0,242,254,0.2)]"
                      : "bg-white/[0.02] border-white/5 hover:border-cyan-400/30 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    {logo.logoUrl ? (
                      <img src={logo.logoUrl} alt={logo.name} className="w-6 h-6 object-contain rounded-md" />
                    ) : (
                      <Building2 className={`w-5 h-5 transition-colors ${isSelected ? "text-cyan-400" : "text-slate-500 group-hover:text-cyan-400"}`} />
                    )}
                    <span className={`font-mono text-xs font-bold tracking-wider block transition-colors ${isSelected ? "text-cyan-300" : "text-slate-300 group-hover:text-white"}`}>
                      {logo.label}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 truncate max-w-full">
                      {logo.industry}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filters & View Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-white/5">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,242,254,0.15)]"
                    : "bg-white/[0.03] text-slate-400 border border-white/5 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Toggle View Mode: Carousel vs Grid */}
          <div className="flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode("carousel")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                viewMode === "carousel" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30" : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Featured
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                viewMode === "grid" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30" : "text-slate-400 hover:text-white"
              }`}
            >
              <Grid className="w-3.5 h-3.5" /> All Reviews ({filteredTestimonials.length})
            </button>
          </div>
        </div>

        {/* Carousel View Mode */}
        {viewMode === "carousel" && (
          <div className="max-w-4xl mx-auto relative">
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative shadow-2xl space-y-6"
                >
                  {/* Top Bar: Company Logo & Rating */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {current.companyLogo ? (
                        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30">
                          <img src={current.companyLogo} alt={current.companyName} className="w-6 h-6 object-contain rounded-md" />
                          <span className="text-cyan-400 font-mono text-sm font-bold tracking-widest">
                            {current.companyLogoText || current.companyName.toUpperCase()}
                          </span>
                        </div>
                      ) : (
                        <div className="px-4 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-mono text-sm font-bold tracking-widest">
                          {current.companyLogoText || current.companyName.toUpperCase()}
                        </div>
                      )}
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-mono">
                        {current.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: current.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <Quote className="w-10 h-10 text-cyan-400/20" />

                  {/* Quote */}
                  <p className="text-xl sm:text-2xl font-display font-medium text-white leading-relaxed">
                    "{current.quote}"
                  </p>

                  {/* Bottom Info: Client Avatar & Outcome Pill */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <img
                        src={current.avatar}
                        alt={current.clientName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400/40 shadow-md"
                      />
                      <div>
                        <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
                          {current.clientName}
                          {current.verified && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                              ✓ Verified Client
                            </span>
                          )}
                        </h4>
                        <p className="text-xs font-mono text-slate-400">
                          {current.clientTitle} •{" "}
                          <span className="text-cyan-400">{current.companyName}</span>
                        </p>
                      </div>
                    </div>

                    <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono font-bold flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" /> KEY OUTCOME: {current.metricsResult}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono text-slate-400">
                0{safeIndex + 1} / 0{filteredTestimonials.length}
              </span>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Grid View Mode */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-cyan-400/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-mono text-xs font-bold">
                      {item.companyLogoText || item.companyName.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm font-display text-slate-200 italic leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.clientName}
                      className="w-9 h-9 rounded-full object-cover border border-cyan-400/40"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-white">{item.clientName}</h4>
                      <p className="text-[10px] font-mono text-slate-400">{item.clientTitle}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-cyan-300 font-bold">
                    {item.metricsResult}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Review Modal */}
      <SubmitReviewModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitReview={handleAddReview}
      />
    </section>
  );
}
