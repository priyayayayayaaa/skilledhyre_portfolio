"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS, Testimonial } from "@/data/portfolioData";
import { Star, Quote, PlusCircle, CheckCircle2, Sparkles, X } from "lucide-react";
import SubmitReviewModal from "./SubmitReviewModal";

const CATEGORIES = ["ALL", "Digital Marketing", "AI & Automation", "Software Engineering", "Tech Talent"] as const;

export default function TestimonialsSection() {
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(TESTIMONIALS);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Testimonial | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const filteredTestimonials = testimonialsList.filter((item) =>
    activeCategory === "ALL" ? true : item.category === activeCategory
  );

  const handleAddReview = (newReview: Testimonial) => {
    setTestimonialsList((prev) => [newReview, ...prev]);
    setActiveCategory("ALL");
  };

  const handleCardClick = (item: Testimonial) => {
    setIsPaused(true);
    setSelectedReview(item);
  };

  return (
    <section id="testimonials" className="py-24 bg-[#08090E] relative overflow-hidden border-t border-white/5">
      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header & Rating Summary */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
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

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-start gap-2 mb-8 pb-4 border-b border-white/5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
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

        {/* Ultra-Slow Smooth Right-to-Left Floating Marquee */}
        <div 
          className="relative w-full overflow-hidden py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (!selectedReview) setIsPaused(false);
          }}
        >
          {/* Edge Gradient Mask */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#08090E] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#08090E] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: isPaused ? undefined : ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 90, // Ultra-slow smooth glide
              repeat: Infinity,
            }}
          >
            {[...filteredTestimonials, ...filteredTestimonials].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => handleCardClick(item)}
                className="w-[340px] sm:w-[380px] shrink-0 glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between bg-[#0F111A] shadow-xl hover:border-cyan-400/50 transition-all hover:scale-[1.02] cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.companyLogo ? (
                        <div className="w-6 h-6 rounded bg-white p-0.5 flex items-center justify-center shrink-0 border border-white/20">
                          <img src={item.companyLogo} alt={item.companyName} className="w-full h-full object-contain" />
                        </div>
                      ) : null}
                      <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold truncate max-w-[140px]">
                        {item.companyName.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs font-display text-slate-200 italic leading-relaxed line-clamp-4 group-hover:text-white transition-colors">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 mt-6 flex items-center justify-between gap-2">
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
                    <div className="truncate">
                      <h4 className="font-bold text-xs text-white truncate">{item.clientName}</h4>
                      <p className="text-[10px] font-mono text-slate-400 truncate">{item.clientTitle}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-cyan-300 font-bold shrink-0">
                    {item.metricsResult}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Selected Review Detail Modal */}
      <AnimatePresence>
        {selectedReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-400/40 max-w-2xl w-full relative shadow-2xl bg-[#0F111A] space-y-6"
            >
              <button
                onClick={() => {
                  setSelectedReview(null);
                  setIsPaused(false);
                }}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {selectedReview.companyLogo ? (
                    <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center border border-white/20 shadow-sm">
                      <img src={selectedReview.companyLogo} alt={selectedReview.companyName} className="w-full h-full object-contain" />
                    </div>
                  ) : null}
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {selectedReview.companyName}
                    </h3>
                    <span className="text-xs font-mono text-cyan-400">{selectedReview.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {Array.from({ length: selectedReview.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <Quote className="w-8 h-8 text-cyan-400/30" />

              <p className="text-base sm:text-lg font-display text-slate-100 italic leading-relaxed">
                "{selectedReview.quote}"
              </p>

              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {selectedReview.avatar && (selectedReview.avatar.includes("-client.") || selectedReview.avatar.includes("gagandeep")) ? (
                    <img
                      src={selectedReview.avatar}
                      alt={selectedReview.clientName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400/40 shadow-md"
                    />
                  ) : selectedReview.companyLogo || (selectedReview.avatar && selectedReview.avatar.includes("logo")) ? (
                    <div className="w-12 h-12 rounded-2xl bg-white p-1.5 flex items-center justify-center shrink-0 border border-white/20 shadow-md overflow-hidden">
                      <img
                        src={selectedReview.companyLogo || selectedReview.avatar}
                        alt={selectedReview.companyName}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 font-mono font-bold text-lg flex items-center justify-center border border-cyan-400/40 shrink-0">
                      {selectedReview.companyName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                      {selectedReview.clientName}
                      {selectedReview.verified && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                          ✓ Verified Client
                        </span>
                      )}
                    </h4>
                    <p className="text-xs font-mono text-slate-400">
                      {selectedReview.clientTitle} • <span className="text-cyan-400 font-bold">{selectedReview.companyName}</span>
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> DELIVERED: {selectedReview.metricsResult}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Submit Review Modal */}
      <SubmitReviewModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitReview={handleAddReview}
      />
    </section>
  );
}
