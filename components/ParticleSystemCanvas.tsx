"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  maxAlpha: number;
  phase: number;
}

export default function ParticleSystemCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsAnimationComplete(true);
      return;
    }

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const particleCount = isMobile ? 45 : 110;

    const colors = ["#00F2FE", "#3B82F6", "#8B5CF6", "#06B6D4", "#A855F7"];

    // Mouse coordinates
    let mouse = {
      x: width / 2,
      y: height / 2,
      radius: 120,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initial branding origin point (top center logo position)
    const logoX = width / 2;
    const logoY = 80;

    // Generate Particles
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5);
      const dist = 50 + Math.random() * (width * 0.4);
      const targetX = width * 0.1 + Math.random() * (width * 0.8);
      const targetY = height * 0.15 + Math.random() * (height * 0.7);

      particles.push({
        x: logoX,
        y: logoY,
        originX: logoX,
        originY: logoY,
        targetX,
        targetY,
        vx: Math.cos(angle) * (2 + Math.random() * 4),
        vy: Math.sin(angle) * (2 + Math.random() * 4),
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.1,
        maxAlpha: Math.random() * 0.6 + 0.3,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000; // in seconds

      ctx.clearRect(0, 0, width, height);

      // Phase 1: Disperse & Regroup (0s to 3s)
      const progress = Math.min(elapsed / 2.5, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (progress < 1) {
          // Interpolate from logo origin to targets
          p.x = p.originX + (p.targetX - p.originX) * easeProgress + Math.sin(elapsed * 4 + p.phase) * 8;
          p.y = p.originY + (p.targetY - p.originY) * easeProgress + Math.cos(elapsed * 4 + p.phase) * 8;
          p.alpha = Math.min(p.maxAlpha, easeProgress * p.maxAlpha);
        } else {
          // Ambient organic motion & gentle cursor reaction
          p.phase += 0.02;
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const pushX = (dx / distance) * force * 1.5;
            const pushY = (dy / distance) * force * 1.5;
            p.x -= pushX;
            p.y -= pushY;
          }

          // Gentle drift back
          p.x += (p.targetX - p.x) * 0.02 + Math.sin(p.phase) * 0.5;
          p.y += (p.targetY - p.y) * 0.02 + Math.cos(p.phase) * 0.5;
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Subtle interconnecting lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ldx = p.x - p2.x;
          const ldy = p.y - p2.y;
          const dist2 = ldx * ldx + ldy * ldy;

          if (dist2 < 9000) {
            const lineAlpha = (1 - dist2 / 9000) * 0.15 * p.alpha;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;

      if (elapsed > 2.5 && !isAnimationComplete) {
        setIsAnimationComplete(true);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70 transition-opacity duration-1000"
    />
  );
}
