"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COMPANY_STATS, StatItem } from "@/data/portfolioData";

function CounterNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000; // ms
    const incrementTime = 30;
    const steps = duration / incrementTime;
    const stepValue = (end - start) / steps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gradient-cyan">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-[#08090E] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-400/20 px-3.5 py-1 rounded-full">
            MEASURABLE SCALE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mt-4 tracking-tight">
            NUMBERS THAT <span className="text-gradient-cyan">MATTER</span>.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {COMPANY_STATS.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="glass-panel p-6 rounded-2xl border border-white/10 text-center hover:border-cyan-400/40 hover:bg-[#0F111A] transition-all duration-300"
            >
              <CounterNumber value={stat.number} suffix={stat.suffix} />
              <h3 className="text-sm font-display font-bold text-white mt-2">
                {stat.label}
              </h3>
              <p className="text-[11px] font-mono text-slate-400 mt-1 leading-tight">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
