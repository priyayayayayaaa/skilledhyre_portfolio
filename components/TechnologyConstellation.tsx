"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TECHNOLOGIES, TECH_CATEGORIES } from "@/data/portfolioData";
import { Layers } from "lucide-react";

// Micro-contextual descriptions for subtle hover illumination
const TECH_SUBTEXT: Record<string, string> = {
  "Generative AI": "LLMs • Agentic Workflows • Neural Synthesis",
  "Machine Learning": "Predictive Models • Custom Pipelines",
  "LLM & RAG Pipelines": "Vector Databases • Enterprise Context",
  "Predictive Analytics": "Telemetry Scoring • Forecasting",
  "C#": "Enterprise Backends • High Performance",
  ".NET Core": "Microservices • Cloud Native APIs",
  "ASP.NET Core": "Restful Gateways • Scalable Services",
  "React & Next.js": "High-Velocity Frontend • SSR & Hydration",
  TypeScript: "Type-Safe Systems • Enterprise Architecture",
  Python: "AI Services • Data Pipelines & Automation",
  "SQL & PostgreSQL": "ACID Compliance • Relational Data Engines",
  "Azure & AWS Cloud": "Serverless Infrastructure • DevOps Pipelines",
  "Analytics Telemetry": "Real-time Auditing • Event Streaming",
  "Custom ERP Engines": "Automated Workflows • Business Ops",
  "CRM Automation": "Lead Funnel Telemetry • System Integration",
  "API Gateways": "Zero-Trust Mesh • High Concurrency",
  "Technical SEO": "AEO & GEO Optimization • Organic Scale",
  "Performance Marketing": "Conversion Engineering • Paid Acquisition",
  "Funnel Conversion": "UX Telemetry • Lead Optimization",
};

export default function TechnologyConstellation() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Signature Architecture Network Line Background Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const nodes = Array.from({ length: 22 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update & Draw Nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = hoveredTech ? "rgba(0, 242, 254, 0.4)" : "rgba(255, 255, 255, 0.15)";
        ctx.fill();

        // Connect nearby nodes with subtle lines
        for (let j = i + 1; j < nodes.length; j++) {
          const node2 = nodes[j];
          const dx = node.x - node2.x;
          const dy = node.y - node2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 14000) {
            const alpha = (1 - distSq / 14000) * (hoveredTech ? 0.12 : 0.05);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.strokeStyle = hoveredTech ? "#00F2FE" : "rgba(255, 255, 255, 0.1)";
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = alpha;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [hoveredTech]);

  const categoriesToShow =
    selectedCategory === "ALL"
      ? (TECH_CATEGORIES as unknown as string[])
      : [selectedCategory];

  return (
    <section
      id="technology"
      className="py-16 sm:py-24 bg-[#08090E] relative overflow-hidden border-t border-white/5"
    >
      {/* Background Interactive Architecture Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-700"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact Editorial Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-[11px] font-mono tracking-widest uppercase mb-2">
              <Layers className="w-3 h-3 text-cyan-400" /> TECHNOLOGY CONSTELLATION
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-none">
              THE TECH BEHIND <span className="text-cyan-400">THE WORK</span>.
            </h2>
          </div>

          <p className="text-slate-400 text-xs sm:text-sm font-mono max-w-xs text-left sm:text-right shrink-0">
            19+ Enterprise Stack Tools <br />
            <span className="text-cyan-400">Production Ready Architecture</span>
          </p>
        </div>

        {/* Compact Horizontal Category Navigation Bar */}
        <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar mb-10 pb-2 border-b border-white/10">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`pb-2.5 text-xs font-mono tracking-widest uppercase transition-all relative shrink-0 ${
              selectedCategory === "ALL"
                ? "text-cyan-400 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ALL STACKS
            {selectedCategory === "ALL" && (
              <motion.div
                layoutId="compactCategoryUnderline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400"
              />
            )}
          </button>

          {TECH_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`pb-2.5 text-xs font-mono tracking-widest uppercase transition-all relative shrink-0 ${
                  isSelected
                    ? "text-cyan-400 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {cat}
                {isSelected && (
                  <motion.div
                    layoutId="compactCategoryUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Compact Editorial Category Groups */}
        <div className="space-y-10">
          <AnimatePresence mode="wait">
            {categoriesToShow.map((cat) => {
              const categoryTechs = TECHNOLOGIES.filter((t) => t.category === cat);
              if (categoryTechs.length === 0) return null;

              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <h3 className="text-xs font-mono tracking-widest text-cyan-300 uppercase font-bold">
                      {cat}
                    </h3>
                    <div className="h-px bg-white/10 flex-1" />
                  </div>

                  {/* Compact Multi-Column Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                    {categoryTechs.map((tech) => {
                      const isHovered = hoveredTech === tech.name;
                      const subtext = TECH_SUBTEXT[tech.name];

                      return (
                        <div
                          key={tech.name}
                          onMouseEnter={() => setHoveredTech(tech.name)}
                          onMouseLeave={() => setHoveredTech(null)}
                          className={`group py-2.5 px-3 rounded-xl border border-transparent transition-all duration-200 cursor-default flex flex-col justify-center ${
                            isHovered
                              ? "bg-white/[0.04] border-cyan-400/30"
                              : hoveredTech
                              ? "opacity-50"
                              : "opacity-100"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-cyan-400 font-mono text-xs transition-opacity duration-200 ${
                                  isHovered ? "opacity-100" : "opacity-0"
                                }`}
                              >
                                •
                              </span>
                              <span
                                className={`text-base sm:text-lg font-display font-semibold transition-colors duration-200 ${
                                  isHovered ? "text-cyan-300 font-bold" : "text-slate-100"
                                }`}
                              >
                                {tech.name}
                              </span>
                            </div>
                          </div>

                          {/* Micro-Contextual Subtext On Hover */}
                          <AnimatePresence>
                            {isHovered && subtext && (
                              <motion.span
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.15 }}
                                className="text-[10px] font-mono text-cyan-400/80 mt-1 pl-4 block overflow-hidden"
                              >
                                {subtext}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
