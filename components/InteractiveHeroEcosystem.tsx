"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Activity, Zap } from "lucide-react";

const ECOSYSTEM_STAGES = [
  { name: "IDEA", label: "01. CONCEPT", color: "#00F2FE", icon: "💡" },
  { name: "TECHNOLOGY", label: "02. ENGINEERING", color: "#3B82F6", icon: "⚡" },
  { name: "AUTOMATION", label: "03. AI & WORKFLOWS", color: "#8A2BE2", icon: "🤖" },
  { name: "MARKETING", label: "04. ACQUISITION", color: "#F43F5E", icon: "📈" },
  { name: "GROWTH", label: "05. SCALE", color: "#10B981", icon: "🚀" },
];

export default function InteractiveHeroEcosystem() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 520);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 200,
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Node items representing the main flow
    const stageCount = ECOSYSTEM_STAGES.length;
    const stageNodes = ECOSYSTEM_STAGES.map((stage, idx) => {
      const x = (width * (idx + 1)) / (stageCount + 1);
      const y = height / 2 + (idx % 2 === 0 ? -45 : 45);
      return {
        ...stage,
        baseX: x,
        baseY: y,
        x: x,
        y: y,
        vx: 0,
        vy: 0,
        radius: 32,
        pulse: Math.random() * Math.PI * 2,
        glowRadius: 0,
      };
    });

    // Ambient floating light particles
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.6,
      alpha: Math.random() * 0.6 + 0.2,
      color: ECOSYSTEM_STAGES[Math.floor(Math.random() * ECOSYSTEM_STAGES.length)].color,
    }));

    // Data pulses traveling along connections
    const pulses = Array.from({ length: 12 }, () => ({
      stageIndex: Math.floor(Math.random() * (stageCount - 1)),
      progress: Math.random(),
      speed: Math.random() * 0.009 + 0.005,
      size: Math.random() * 5 + 3,
      trail: [] as { x: number; y: number }[],
    }));

    let time = 0;

    const render = () => {
      time += 0.02;
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle dynamic grid lines
      const gridOffset = (mouse.x / width - 0.5) * 15;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.025)";
      ctx.lineWidth = 1;
      for (let x = gridOffset % 50; x < width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Re-calculate node positions based on elastic physics & mouse magnet
      let activeHoveredName: string | null = null;
      stageNodes.forEach((node, idx) => {
        const targetX = (width * (idx + 1)) / (stageCount + 1);
        const targetY = height / 2 + Math.sin(time + idx) * 12 + (idx % 2 === 0 ? -40 : 40);
        node.baseX = targetX;
        node.baseY = targetY;

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          node.vx -= (dx / dist) * force * 2.2;
          node.vy -= (dy / dist) * force * 2.2;
        }

        if (dist < node.radius + 15) {
          activeHoveredName = node.name;
        }

        // Elastic return
        node.vx += (node.baseX - node.x) * 0.04;
        node.vy += (node.baseY - node.y) * 0.04;

        node.vx *= 0.84;
        node.vy *= 0.84;

        node.x += node.vx;
        node.y += node.vy;

        node.pulse += 0.04;
      });

      setHoveredNode(activeHoveredName);

      // Draw Connection Bezier Curves between Stage Nodes with Glowing Energy Waves
      for (let i = 0; i < stageNodes.length - 1; i++) {
        const current = stageNodes[i];
        const next = stageNodes[i + 1];

        const cpX = (current.x + next.x) / 2;
        const cpY = (current.y + next.y) / 2 + (i % 2 === 0 ? 40 : -40);

        // Gradient line
        const grad = ctx.createLinearGradient(current.x, current.y, next.x, next.y);
        grad.addColorStop(0, current.color);
        grad.addColorStop(0.5, "#FFFFFF");
        grad.addColorStop(1, next.color);

        ctx.beginPath();
        ctx.moveTo(current.x, current.y);
        ctx.quadraticCurveTo(cpX, cpY, next.x, next.y);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = 0.5;
        ctx.stroke();

        // Outer glow
        ctx.lineWidth = 8;
        ctx.globalAlpha = 0.12;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }

      // Draw traveling energy pulses along bezier paths
      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.stageIndex = Math.floor(Math.random() * (stageCount - 1));
          pulse.trail = [];
        }

        const from = stageNodes[pulse.stageIndex];
        const to = stageNodes[pulse.stageIndex + 1];

        if (from && to) {
          const cpX = (from.x + to.x) / 2;
          const cpY = (from.y + to.y) / 2 + (pulse.stageIndex % 2 === 0 ? 40 : -40);

          const t = pulse.progress;
          const px = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * cpX + t * t * to.x;
          const py = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * cpY + t * t * to.y;

          pulse.trail.push({ x: px, y: py });
          if (pulse.trail.length > 8) pulse.trail.shift();

          // Draw trail
          for (let k = 0; k < pulse.trail.length; k++) {
            const pt = pulse.trail[k];
            const trailAlpha = (k / pulse.trail.length) * 0.8;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pulse.size * (k / pulse.trail.length), 0, Math.PI * 2);
            ctx.fillStyle = from.color;
            ctx.globalAlpha = trailAlpha;
            ctx.fill();
          }

          // Main pulse head
          ctx.beginPath();
          ctx.arc(px, py, pulse.size, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.shadowColor = from.color;
          ctx.shadowBlur = 18;
          ctx.globalAlpha = 1.0;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw background floating light particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // Draw Main Nodes with Pulsing Rings & Dynamic Labels
      stageNodes.forEach((node) => {
        const pulseSize = Math.sin(node.pulse) * 5;
        const isHovered = activeHoveredName === node.name;

        // Outer Pulsing Glow Aura
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + (isHovered ? 16 : 8) + pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = isHovered ? 0.25 : 0.12;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Outer Ring Border
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + (isHovered ? 4 : 0), 0, Math.PI * 2);
        ctx.fillStyle = "#0F111A";
        ctx.strokeStyle = node.color;
        ctx.lineWidth = isHovered ? 3 : 2;
        ctx.fill();
        ctx.stroke();

        // Inner Core Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node Title Text Below
        ctx.font = "bold 12px sans-serif";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        ctx.fillText(node.name, node.x, node.y + node.radius + 22);

        ctx.font = "10px monospace";
        ctx.fillStyle = "#94A3B8";
        ctx.fillText(node.label, node.x, node.y + node.radius + 36);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-[450px] sm:h-[500px] lg:h-[540px] rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 shadow-[0_0_60px_rgba(0,242,254,0.15)] group">
      {/* Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating Animated Badges Header */}
      <div className="absolute top-6 left-6 flex flex-wrap gap-2 pointer-events-none">
        {["AI ENGINE", "ENTERPRISE C#", "WORKFLOW AUTOMATION", "GROWTH FUNNELS"].map((tag, i) => (
          <motion.span
            key={tag}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
            className="px-3.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#08090E]/80 border border-cyan-400/30 text-cyan-300 backdrop-blur-md shadow-md flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>{tag}</span>
          </motion.span>
        ))}
      </div>

      {/* Dynamic Hover Status Bar */}
      <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>
            STATUS: {hoveredNode ? `ACTIVE INSPECT [${hoveredNode}]` : "ECOSYSTEM OPERATIONAL"}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>REAL-TIME PHYSICS ENGINE</span>
        </div>
      </div>
    </div>
  );
}
