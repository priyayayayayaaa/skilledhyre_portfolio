"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TEAM_MEMBERS, TeamMember } from "@/data/portfolioData";
import { Linkedin, Twitter, Sparkles } from "lucide-react";
import TeamMemberModal from "./TeamMemberModal";

const CATEGORIES = ["ALL", ...Array.from(new Set(TEAM_MEMBERS.map((m) => m.category)))];

export default function TeamShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [activeModalMember, setActiveModalMember] = useState<TeamMember | null>(null);

  const filteredMembers =
    selectedCategory === "ALL"
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((m) => m.category === selectedCategory);

  return (
    <section id="team" className="py-24 bg-[#08090E] relative overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="glow-orb-cyan top-1/2 left-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-400/20 px-3.5 py-1 rounded-full">
            OUR PEOPLE
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white mt-4 tracking-tight">
            THE PEOPLE <span className="text-gradient-cyan">BEHIND THE WORK</span>.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4">
            Technology is built by people. Meet the team behind SkilledHyre Labs.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold shadow-[0_0_20px_rgba(0,242,254,0.3)]"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Team Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredMembers.map((member) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveModalMember(member)}
                className="group cursor-pointer glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-400/50 hover:bg-[#0F111A] transition-all duration-500 shadow-lg"
              >
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ${member.imagePosition || "object-top"} ${member.imageScale || "group-hover:scale-105"}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F111A] via-[#0F111A]/20 to-transparent" />

                  <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-xl bg-black/60 backdrop-blur-md text-white hover:text-cyan-400"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="p-6 relative z-10">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                    {member.category} • {member.designation}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {member.name}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {member.specialization.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono group-hover:text-white transition-colors">
                    <span>VIEW PROFILE OVERLAY</span>
                    <span>→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Team Member Modal */}
      <AnimatePresence>
        {activeModalMember && (
          <TeamMemberModal
            member={activeModalMember}
            onClose={() => setActiveModalMember(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
