"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Sparkles, Send } from "lucide-react";
import confetti from "canvas-confetti";

interface ProjectStarterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICES_OPTIONS = [
  "AI & Automation",
  "Software Engineering (.NET / C#)",
  "Web & Mobile Platforms",
  "ERP & Business Systems",
  "Digital Marketing & SEO",
  "Dedicated Tech Talent",
];

const BUDGET_RANGES = ["$10k - $25k", "$25k - $50k", "$50k - $100k", "$100k+"];

export default function ProjectStarterModal({ isOpen, onClose }: ProjectStarterModalProps) {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleService = (serv: string) => {
    setSelectedServices((prev) =>
      prev.includes(serv) ? prev.filter((s) => s !== serv) : [...prev, serv]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#0F111A] border border-cyan-500/30 rounded-3xl max-w-2xl w-full p-6 sm:p-10 relative shadow-[0_0_50px_rgba(0,242,254,0.15)] max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-2">
              <Sparkles className="w-4 h-4" />
              <span>START A PROJECT PROTOCOL</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">
              Let's build something exceptional.
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Services */}
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-3">
                  01. WHAT CAPABILITIES DO YOU NEED?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SERVICES_OPTIONS.map((serv) => {
                    const isSelected = selectedServices.includes(serv);
                    return (
                      <button
                        type="button"
                        key={serv}
                        onClick={() => toggleService(serv)}
                        className={`p-3 rounded-xl text-left text-xs font-medium transition-all flex items-center justify-between border ${
                          isSelected
                            ? "bg-cyan-500/10 border-cyan-400 text-cyan-300"
                            : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        <span>{serv}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Budget */}
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-3">
                  02. ESTIMATED BUDGET RANGE
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BUDGET_RANGES.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setSelectedBudget(b)}
                      className={`p-2.5 rounded-xl text-center text-xs font-mono transition-all border ${
                        selectedBudget === b
                          ? "bg-violet-500/20 border-violet-400 text-violet-300 font-bold"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Contact Info */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
                  03. CONTACT DETAILS
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Company / Organization Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                />
                <textarea
                  rows={3}
                  placeholder="Briefly describe your business challenge or scope..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,242,254,0.4)] hover:scale-[1.01] transition-transform"
              >
                <span>Submit Project Scope</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center mx-auto mb-4 border border-cyan-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-display font-bold text-white mb-2">Project Request Received!</h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
              Thank you, <span className="text-cyan-400 font-bold">{formData.name}</span>. A senior strategist from SkilledHyre Labs will review your scope and get back to you within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-white/10 text-white font-mono text-xs uppercase"
            >
              Close Window
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
