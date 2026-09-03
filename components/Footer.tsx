"use client";

import React from "react";
import { Sparkles, ArrowUp, Linkedin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#05060A] text-slate-400 py-16 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 p-[1px]">
                <div className="w-full h-full bg-[#08090E] rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-display font-bold text-xl text-white tracking-wider">
                SKILLEDHYRE <span className="text-cyan-400">LABS</span>
              </span>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400 mb-4">
              Build. Automate. Market. Scale.
            </p>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              We help businesses transform ideas and challenges into scalable digital products, intelligent automation systems and measurable growth.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs text-white uppercase tracking-widest mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs">
              {["Work", "Capabilities", "Approach", "Team", "About", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-slate-600 font-mono">•</span>
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs text-white uppercase tracking-widest mb-4">
              SERVICES & SOLUTIONS
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                "AI & Automation",
                "Software Development (.NET / C#)",
                "Web & Mobile Platforms",
                "Digital Marketing & Programmatic SEO",
                "Tech Talent Pods",
              ].map((service) => (
                <li key={service} className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-cyan-400 font-mono">/</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="text-slate-500">
            © {new Date().getFullYear()} SkilledHyre Labs. All rights reserved.
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
