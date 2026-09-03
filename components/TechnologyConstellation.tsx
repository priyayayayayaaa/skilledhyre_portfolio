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

    let particles = Array.from({ length: 30 }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      radius: 80 + Math.random() * 140,
      speed: 0.002 + Math.random() * 0.003,
      size: Math.random() * 1.8 + 1,
      color: "#00F2FE",
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Central ambient radial glow
      const grad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 220);
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
      className="py-20 sm:py-24 bg-[#08090E] relative overflow-hidden border-t border-white/5 min-h-[90vh] flex flex-col justify-between"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-between">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-3">
            <Layers className="w-3.5 h-3.5 text-cyan-400" /> TECHNOLOGY CONSTELLATION
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight">
            THE TECH BEHIND <span className="text-gradient-cyan">THE WORK</span>.
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-mono mt-3 max-w-lg mx-auto">
            Interactive multi-disciplinary stack architecture spanning AI, Engineering, Data, Cloud & Marketing.
          </p>
        </div>

        {/* Central Interactive Constellation Canvas & Node Map */}
        <div className="relative w-full max-w-5xl mx-auto min-h-[380px] sm:min-h-[440px] flex items-center justify-center my-4">
          
          {/* Background Canvas Layer */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0 opacity-80"
          />

          {/* Central SkilledHyre Labs Core Node */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#0F111A] border-2 border-cyan-400/40 shadow-[0_0_50px_rgba(0,242,254,0.25)] flex flex-col items-center justify-center text-center p-2 cursor-pointer group hover:border-cyan-400 transition-colors"
          >
            <Sparkles className="w-5 h-5 text-cyan-400 mb-1 group-hover:rotate-12 transition-transform" />
            <span className="font-display font-black text-xs sm:text-sm text-white tracking-wider">
              SKILLEDHYRE
            </span>
            <span className="text-[9px] font-mono text-cyan-400 font-bold tracking-widest uppercase">
              LABS
            </span>
          </motion.div>

          {/* 5 Orbiting Category System Nodes */}
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
            {TECH_CATEGORIES.map((cat, idx) => {
              const total = TECH_CATEGORIES.length;
              const angle = (idx * (2 * Math.PI)) / total - Math.PI / 2; // top origin
              const radius = 145; // sm screen radius
              const isSelected = activeCategory === cat;
              const Icon = CATEGORY_ICONS[cat];

              // Calculate percentage positions for responsive layout
              const leftPercent = 50 + Math.cos(angle) * 38;
              const topPercent = 50 + Math.sin(angle) * 38;

              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  onMouseEnter={() => setActiveCategory(cat)}
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className={`absolute pointer-events-auto px-3.5 py-2.5 rounded-2xl border transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg ${
                    isSelected
                      ? "bg-[#0F111A] border-cyan-400 text-white shadow-[0_0_25px_rgba(0,242,254,0.35)] scale-110 z-30"
                      : "bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${isSelected ? "text-cyan-400" : "text-slate-400"}`} />}
                  <span className="text-xs font-mono font-bold tracking-wider uppercase whitespace-nowrap">
                    {cat}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Active Category Technologies Revealed Dynamic Arc Badge Overlay */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 w-full max-w-xl text-center px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="glass-panel p-4 rounded-2xl border border-cyan-400/30 bg-[#0F111A]/95 shadow-2xl backdrop-blur-md"
              >
                <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-widest uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    ACTIVE SYSTEM NODE: {activeCategory}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {CATEGORY_MAP[activeCategory]?.length} Technologies
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  {CATEGORY_MAP[activeCategory]?.map((techName) => (
                    <span
                      key={techName}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-white font-display font-semibold text-xs sm:text-sm hover:border-cyan-400 hover:bg-cyan-500/20 transition-all cursor-default"
                    >
                      {techName}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Compact Technology Summary Index below the Constellation */}
        <div className="pt-8 border-t border-white/10 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {TECH_CATEGORIES.map((cat) => {
              const techs = CATEGORY_MAP[cat] || [];
              const isSelected = activeCategory === cat;

              return (
                <div
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-cyan-500/10 border-cyan-400/40 text-cyan-300"
                      : "bg-white/[0.02] border-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300">
                      {cat}
                    </span>
                  </div>
                  <p className="text-xs font-display text-slate-200 leading-snug line-clamp-2">
                    {techs.join(" • ")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
