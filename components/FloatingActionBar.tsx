"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Rocket, MessageSquare, X, Mail } from "lucide-react";

interface FloatingActionBarProps {
  onOpenProjectModal: () => void;
}

export default function FloatingActionBar({ onOpenProjectModal }: FloatingActionBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isQuickContactOpen, setIsQuickContactOpen] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
          >
            {/* Start Project CTA Button */}
            <button
              onClick={onOpenProjectModal}
              className="group relative hidden sm:flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-black font-display font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:shadow-[0_0_35px_rgba(0,242,254,0.7)] hover:scale-105 transition-all"
            >
              <Rocket className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
              <span>Start Project</span>
            </button>

            {/* Quick Contact Toggle */}
            <button
              onClick={() => setIsQuickContactOpen(!isQuickContactOpen)}
              className="p-3.5 rounded-full bg-[#0f111a] border border-cyan-500/40 text-cyan-400 hover:text-white hover:bg-cyan-500/20 shadow-[0_0_20px_rgba(0,242,254,0.2)] transition-all hover:scale-110"
              title="Quick Inquiry"
            >
              {isQuickContactOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
            </button>

            {/* Back To Top Button */}
            <button
              onClick={scrollToTop}
              className="p-3.5 rounded-full bg-[#0f111a] border border-white/15 text-slate-300 hover:text-white hover:border-cyan-400/40 transition-all hover:scale-110"
              title="Back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Inquiry Popover */}
      <AnimatePresence>
        {isQuickContactOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-80 p-6 rounded-3xl bg-[#0f111a] border border-cyan-500/30 shadow-[0_0_40px_rgba(0,242,254,0.2)] space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4" /> DIRECT CONTACT
              </span>
              <button
                onClick={() => setIsQuickContactOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h4 className="text-base font-display font-bold text-white">
              Ready to scale your business with SkilledHyre?
            </h4>
            <p className="text-xs font-mono text-slate-400 leading-relaxed">
              Connect directly with our engineering & growth leaders. We respond in under 2 hours.
            </p>

            <div className="space-y-2 pt-2">
              <a
                href="mailto:contact@skilledhyrelabs.com"
                className="block w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 text-xs font-mono text-cyan-300 text-center transition-colors"
              >
                ✉️ contact@skilledhyrelabs.com
              </a>
              <button
                onClick={() => {
                  setIsQuickContactOpen(false);
                  onOpenProjectModal();
                }}
                className="block w-full py-2.5 px-4 rounded-xl bg-cyan-400 text-black font-bold font-display text-xs text-center hover:bg-cyan-300 transition-colors"
              >
                Launch Project Discovery Wizard →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
