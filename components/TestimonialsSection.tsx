"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS, CLIENT_LOGOS, Testimonial } from "@/data/portfolioData";
import { Star, ChevronLeft, ChevronRight, Quote, PlusCircle, CheckCircle2, Building2, Sparkles, Grid, Layers, ExternalLink } from "lucide-react";
import SubmitReviewModal from "./SubmitReviewModal";

const CATEGORIES = ["ALL", "Digital Marketing", "AI & Automation", "Software Engineering", "Tech Talent"] as const;

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
    } else {
      // If not in current category filter, switch to ALL first
      setActiveCategory("ALL");
      const idxInAll = testimonialsList.findIndex((t) => t.id === testimonialId);
      if (idxInAll !== -1) {
        setCurrentIndex(idxInAll);
        setViewMode("carousel");
      }
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
        
        {/* Top Header & Rating Summary */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-mono mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" /> CLIENT REVIEWS & VERIFIED RESULTS
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              TRUSTED BY GROWING BRANDS.
              <span className="block text-gradient-cyan">MEASURED BY REAL IMPACT.</span>
            </h2>
          </div>

          {/* Rating Badge & Add Review Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-left">
                <span className="block text-xs font-mono font-bold text-white">5.0 / 5.0 Rating</span>
                <span className="block text-[10px] font-mono text-slate-400">18+ Verified Client Reviews</span>
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

        {/* Clean & Sleek Client Logos Horizontal Filter Pills */}
        <div className="mb-12">
          <p className="text-center text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">
            ENTERPRISE & CLIENT BRANDS (Select a logo to view their testimonial)
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-5xl mx-auto">
            {CLIENT_LOGOS.map((logo) => {
              const isSelected = current?.companyLogoText === logo.label || 
                                 current?.companyName.toUpperCase() === logo.name.toUpperCase() ||
                                 current?.id === logo.testimonialId;

              return (
                <button
                  key={logo.name}
                  onClick={() => handleLogoClick(logo.testimonialId)}
                  className={`px-3.5 py-2 rounded-2xl border text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2.5 ${
                    isSelected
                      ? "bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,242,254,0.25)] scale-105"
                      : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-cyan-400/40 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {logo.logoUrl ? (
                    <div className="w-6 h-6 rounded-lg bg-white p-0.5 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                      <img src={logo.logoUrl} alt={logo.name} className="w-full h-full object-contain rounded" />
                    </div>
                  ) : (
                    <Building2 className={`w-4 h-4 shrink-0 ${isSelected ? "text-cyan-400" : "text-slate-400"}`} />
                  )}
                  <span>{logo.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter Pills & Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-white/5">
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

          {/* View Mode: Featured vs All */}
          <div className="flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode("carousel")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                viewMode === "carousel" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30" : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Featured Card
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                viewMode === "grid" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30" : "text-slate-400 hover:text-white"
              }`}
            >
              <Grid className="w-3.5 h-3.5" /> Grid View ({filteredTestimonials.length})
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
                  className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/20 relative shadow-2xl space-y-6 bg-[#0F111A]"
                >
                  {/* Top Bar: Company Logo & Rating */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {current.companyLogo ? (
                        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20">
                          <div className="w-7 h-7 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
                            <img src={current.companyLogo} alt={current.companyName} className="w-full h-full object-contain" />
                          </div>
                          <span className="text-cyan-300 font-mono text-sm font-bold tracking-wider">
                            {current.companyName.toUpperCase()}
                          </span>
                        </div>
                      ) : (
                        <div className="px-4 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-mono text-sm font-bold tracking-widest">
                          {current.companyName.toUpperCase()}
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

                  <Quote className="w-10 h-10 text-cyan-400/25" />

                  {/* Quote */}
                  <p className="text-lg sm:text-xl font-display font-medium text-slate-100 leading-relaxed italic">
                    "{current.quote}"
                  </p>

                  {/* Bottom Info: Client Avatar & Outcome Pill */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      {current.avatar && (current.avatar.includes("-client.") || current.avatar.includes("gagandeep")) ? (
                        <img
                          src={current.avatar}
                          alt={current.clientName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400/40 shadow-md"
                        />
                      ) : current.companyLogo || (current.avatar && current.avatar.includes("logo")) ? (
                        <div className="w-12 h-12 rounded-2xl bg-white p-1.5 flex items-center justify-center shrink-0 border border-white/20 shadow-md overflow-hidden">
                          <img
                            src={current.companyLogo || current.avatar}
                            alt={current.companyName}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 font-mono font-bold text-lg flex items-center justify-center border border-cyan-400/40 shrink-0">
                          {current.companyName.charAt(0)}
                        </div>
                      )}
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
                          <span className="text-cyan-400 font-bold">{current.companyName}</span>
                        </p>
                      </div>
                    </div>

                    <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> DELIVERED: {current.metricsResult}
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
                0{safeIndex + 1} / {filteredTestimonials.length < 10 ? `0${filteredTestimonials.length}` : filteredTestimonials.length}
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
                className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-cyan-400/40 transition-colors bg-[#0F111A]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.companyLogo ? (
                        <div className="w-6 h-6 rounded bg-white p-0.5 flex items-center justify-center shrink-0">
                          <img src={item.companyLogo} alt={item.companyName} className="w-full h-full object-contain" />
                        </div>
                      ) : null}
                      <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold">
                        {item.companyName.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs font-display text-slate-200 italic leading-relaxed line-clamp-5">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.avatar && (item.avatar.includes("-client.") || item.avatar.includes("gagandeep")) ? (
                      <img
                        src={item.avatar}
                        alt={item.clientName}
                        className="w-9 h-9 rounded-full object-cover border border-cyan-400/40"
                      />
                    ) : item.companyLogo || (item.avatar && item.avatar.includes("logo")) ? (
                      <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 border border-white/20 overflow-hidden">
                        <img
                          src={item.companyLogo || item.avatar}
                          alt={item.companyName}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center border border-cyan-400/40 shrink-0">
                        {item.companyName.charAt(0)}
                      </div>
                    )}
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
