"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, CheckCircle, Sparkles, ShieldCheck } from "lucide-react";
import { Testimonial } from "@/data/portfolioData";
import confetti from "canvas-confetti";

interface SubmitReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (newReview: Testimonial) => void;
}

export default function SubmitReviewModal({
  isOpen,
  onClose,
  onSubmitReview,
}: SubmitReviewModalProps) {
  const [formData, setFormData] = useState({
    clientName: "",
    clientTitle: "",
    companyName: "",
    companyLogoText: "",
    category: "AI & Automation" as Testimonial["category"],
    rating: 5,
    metricsResult: "",
    quote: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleRatingSelect = (selectedRating: number) => {
    setFormData((prev) => ({ ...prev, rating: selectedRating }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.quote) return;

    const newReview: Testimonial = {
      id: `test-custom-${Date.now()}`,
      clientName: formData.clientName,
      clientTitle: formData.clientTitle || "Verified Client",
      companyName: formData.companyName || "Enterprise Partner",
      companyLogoText: formData.companyLogoText || formData.companyName.toUpperCase() || "CLIENT LOGO",
      category: formData.category,
      rating: formData.rating,
      metricsResult: formData.metricsResult || "High Impact",
      quote: formData.quote,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        formData.clientName
      )}&backgroundColor=00f2fe,8a2be2`,
      verified: true,
      date: "Just Now",
    };

    onSubmitReview(newReview);
    setIsSubmitted(true);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#00F2FE", "#8A2BE2", "#3B82F6"],
    });

    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
          className="relative w-full max-w-4xl bg-[#0f111a] border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center space-y-4"
            >
              <div className="w-16 h-16 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto border border-cyan-400/40">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white">
                Thank You for Your Review!
              </h3>
              <p className="text-sm font-mono text-slate-400 max-w-md mx-auto">
                Your testimonial with company logo has been added to our verified client showcase.
              </p>
            </motion.div>
          ) : (
            <div>
              {/* Header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-mono mb-3">
                  <Sparkles className="w-3.5 h-3.5" /> CLIENT TESTIMONIAL PORTAL
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  Add Your Client Review & Logo
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Share your experience, verified metrics, and company logo to display on our client wall.
                </p>
              </div>

              {/* Form & Live Preview Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Robert Hayes"
                      value={formData.clientName}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, clientName: e.target.value }))
                      }
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400/60 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                        Title / Role
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. COO / VP Product"
                        value={formData.clientTitle}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, clientTitle: e.target.value }))
                        }
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400/60 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Logistics"
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            companyName: e.target.value,
                            companyLogoText: e.target.value.toUpperCase(),
                          }))
                        }
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400/60 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Service Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: e.target.value as Testimonial["category"],
                        }))
                      }
                      className="w-full bg-[#161926] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400/60"
                    >
                      <option value="AI & Automation">AI & Automation</option>
                      <option value="Software Engineering">Software Engineering</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Tech Talent">Tech Talent</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                        Rating
                      </label>
                      <div className="flex items-center gap-1.5 pt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => handleRatingSelect(star)}
                            className="focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                star <= formData.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-600"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                        Key Outcome Metric
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 60% ↓ Ops Cost"
                        value={formData.metricsResult}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, metricsResult: e.target.value }))
                        }
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400/60 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Testimonial Quote *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="SkilledHyre Labs didn't just build software—they automated our core operations..."
                      value={formData.quote}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, quote: e.target.value }))
                      }
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400/60 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-display font-bold text-sm hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all transform active:scale-95"
                  >
                    Submit Client Testimonial
                  </button>
                </form>

                {/* Live Card Preview */}
                <div className="flex flex-col justify-center">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" /> LIVE CARD PREVIEW
                  </span>

                  <div className="glass-panel p-6 rounded-2xl border border-cyan-400/30 relative shadow-xl space-y-4">
                    {/* Company Logo Badge Header */}
                    <div className="flex items-center justify-between">
                      <div className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-mono text-xs font-bold tracking-wider">
                        {formData.companyLogoText || "COMPANY LOGO"}
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: formData.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-display text-slate-100 italic leading-relaxed">
                      "{formData.quote || "Your client review quote will render here in real time..."}"
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center font-bold text-cyan-400 text-xs">
                          {formData.clientName ? formData.clientName.charAt(0) : "C"}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-white">
                            {formData.clientName || "Client Name"}
                          </h4>
                          <p className="text-[10px] font-mono text-slate-400">
                            {formData.clientTitle || "Title"} •{" "}
                            <span className="text-cyan-400">
                              {formData.companyName || "Company"}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="text-[10px] font-mono px-2 py-1 rounded bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
                        {formData.metricsResult || "Verified Impact"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
