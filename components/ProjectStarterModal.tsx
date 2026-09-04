"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Sparkles, Send, Loader2, AlertCircle } from "lucide-react";
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

export default function ProjectStarterModal({ isOpen, onClose }: ProjectStarterModalProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleService = (serv: string) => {
    setSelectedServices((prev) =>
      prev.includes(serv) ? prev.filter((s) => s !== serv) : [...prev, serv]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (selectedServices.length === 0) {
      setErrorMessage("Please select at least one capability.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/project-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          capabilities: selectedServices,
          budget: selectedBudget,
          projectDescription: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        const errorText =
          result.message ||
          (result.errors ? Object.values(result.errors).join(" ") : "Submission failed.");
        setErrorMessage(errorText);
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
      setIsSubmitting(false);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (error) {
      console.error("[Project Starter] Submission exception:", error);
      setErrorMessage("Unable to connect to server. Please check your internet connection.");
      setIsSubmitting(false);
    }
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
          disabled={isSubmitting}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
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

            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Services */}
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-3">
                  01. WHAT CAPABILITIES DO YOU NEED? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SERVICES_OPTIONS.map((serv) => {
                    const isSelected = selectedServices.includes(serv);
                    return (
                      <button
                        type="button"
                        key={serv}
                        disabled={isSubmitting}
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

              {/* Step 2: Free-Text Budget Input */}
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">
                  02. ESTIMATED BUDGET
                </label>
                <input
                  type="text"
                  disabled={isSubmitting}
                  placeholder="e.g. $35,000, ₹25 lakh, Flexible, Not decided yet..."
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 font-mono disabled:opacity-50"
                />
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
                    disabled={isSubmitting}
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 disabled:opacity-50"
                  />
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    placeholder="Work Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 disabled:opacity-50"
                  />
                </div>
                <input
                  type="text"
                  disabled={isSubmitting}
                  placeholder="Company / Organization Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 disabled:opacity-50"
                />
                <textarea
                  rows={3}
                  disabled={isSubmitting}
                  placeholder="Briefly describe your business challenge or scope..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,242,254,0.4)] hover:scale-[1.01] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project Scope</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
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
              className="px-6 py-2.5 rounded-full bg-white/10 text-white font-mono text-xs uppercase hover:bg-white/20 transition-colors"
            >
              Close Window
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
