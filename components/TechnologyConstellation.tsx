"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TECHNOLOGIES, TECH_CATEGORIES } from "@/data/portfolioData";
import { Sparkles, Layers, Cpu, Code2, Database, Server, BarChart3 } from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  AI: Cpu,
  DEVELOPMENT: Code2,
  "DATA & CLOUD": Database,
  "BUSINESS SYSTEMS": Server,
  MARKETING: BarChart3,
};

const CATEGORY_MAP: Record<string, string[]> = {
  AI: ["Generative AI", "Machine Learning", "LLM & RAG Pipelines", "Predictive Analytics"],
  DEVELOPMENT: ["C#", ".NET Core", "ASP.NET Core", "React & Next.js", "TypeScript", "Python"],
  "DATA & CLOUD": ["SQL & PostgreSQL", "Azure & AWS Cloud", "Analytics Telemetry"],
  "BUSINESS SYSTEMS": ["Custom ERP Engines", "CRM Automation", "API Gateways"],
  MARKETING: ["Technical SEO", "Performance Marketing", "Funnel Conversion"],
};

export default function TechnologyConstellation() {
  const [activeCategory, setActiveCategory] = useState<string>("AI");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas Constellation Particle Orbit Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const centerX = width / 2;
    const centerY = height / 2;

    let particles = Array.from({ length: 35 }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      radius: 70 + Math.random() * 150,
      speed: 0.002 + Math.random() * 0.003,
      size: Math.random() * 1.8 + 1,
      color: "#00F2FE",
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Central ambient radial glow
      const grad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 240);
      grad.addColorStop(0, "rgba(0, 242, 254, 0.08)");
      grad.addColorStop(0.5, "rgba(59, 130, 246, 0.03)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Orbit particles & subtle line connections
      particles.forEach((p) => {
        p.angle += p.speed;
        const px = centerX + Math.cos(p.angle) * p.radius;
        const py = centerY + Math.sin(p.angle) * p.radius;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 242, 254, 0.5)";
        ctx.fill();

        // Connect to center node
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(px, py);
        ctx.strokeStyle = "rgba(0, 242, 254, 0.06)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="technology"
      className="py-20 sm:py-24 bg-[#08090E] relative overflow-hidden border-t border-white/5"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-6">
        
        {/* Top Header Block */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-2">
            <Layers className="w-3.5 h-3.5 text-cyan-400" /> TECHNOLOGY CONSTELLATION
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight">
            THE TECH BEHIND <span className="text-gradient-cyan">THE WORK</span>.
          </h2>
        </div>

        {/* Clean Top Category Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
          {TECH_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            const Icon = CATEGORY_ICONS[cat];

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                onMouseEnter={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-2xl border text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-[#0F111A] border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,242,254,0.3)] scale-105"
                    : "bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {Icon && <Icon className={`w-4 h-4 ${isSelected ? "text-cyan-400" : "text-slate-400"}`} />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Central Interactive Constellation Visualization Container */}
        <div className="relative w-full max-w-5xl mx-auto min-h-[320px] sm:min-h-[380px] flex flex-col items-center justify-center p-6 glass-panel rounded-3xl border border-white/10 bg-[#0F111A]/80 shadow-2xl overflow-hidden">
          
          {/* Background Canvas Layer */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0 opacity-80"
          />

          {/* Central SkilledHyre Labs Core Badge */}
          <div className="relative z-10 mb-6 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-500/10 border-2 border-cyan-400/50 shadow-[0_0_35px_rgba(0,242,254,0.3)] flex flex-col items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="font-display font-black text-sm sm:text-base text-white tracking-widest block uppercase">
              SKILLEDHYRE LABS
            </span>
            <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-widest uppercase block mt-0.5">
              ACTIVE NODE: {activeCategory}
            </span>
          </div>

          {/* Active Category Technologies Revealed */}
          <div className="relative z-10 w-full max-w-3xl text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="flex flex-wrap items-center justify-center gap-3"
              >
                {CATEGORY_MAP[activeCategory]?.map((techName) => (
                  <div
                    key={techName}
                    className="px-4 py-2.5 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 text-white font-display font-bold text-sm sm:text-base shadow-[0_0_15px_rgba(0,242,254,0.15)] hover:border-cyan-400 hover:bg-cyan-500/25 transition-all cursor-default"
                  >
                    {techName}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Clear Technology Summary Index Grid (All 19 Techs Visible) */}
        <div className="pt-8 border-t border-white/10">
          <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase mb-4 text-center">
            COMPLETE ENTERPRISE STACK DIRECTORY
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TECH_CATEGORIES.map((cat) => {
              const techs = CATEGORY_MAP[cat] || [];
              const isSelected = activeCategory === cat;

              return (
                <div
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  onMouseEnter={() => setActiveCategory(cat)}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-cyan-500/15 border-cyan-400/60 shadow-[0_0_20px_rgba(0,242,254,0.15)]"
                      : "bg-white/[0.02] border-white/10 hover:border-cyan-400/30 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-white/10">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                      {cat}
                    </span>
                  </div>

                  <ul className="space-y-1.5">
                    {techs.map((tech) => (
                      <li key={tech} className="text-xs font-display font-semibold text-slate-200 hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                        <span className="text-cyan-400 text-[10px]">•</span>
                        <span>{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
