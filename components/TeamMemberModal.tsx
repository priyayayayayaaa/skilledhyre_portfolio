"use client";

import React from "react";
import { motion } from "framer-motion";
import { TeamMember } from "@/data/portfolioData";
import { X, Linkedin, Twitter, Award, Sparkles } from "lucide-react";

interface TeamMemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export default function TeamMemberModal({ member, onClose }: TeamMemberModalProps) {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-[#0B0D14] border border-white/10 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-[0_0_50px_rgba(0,0,0,0.8)] max-h-[88vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
          <img
            src={member.avatar}
            alt={member.name}
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-2 ring-cyan-500/30 border border-white/10 shadow-2xl shrink-0 ${member.imagePosition || "object-top"}`}
          />
          <div className="text-center sm:text-left flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-semibold tracking-widest text-cyan-400 uppercase bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                {member.category}
              </span>
              {member.experience && (
                <span className="text-[10px] font-mono text-slate-300 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10 flex items-center gap-1">
                  <Award className="w-3 h-3 text-cyan-400" />
                  {member.experience}
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              {member.name}
            </h3>

            <p className="text-sm font-medium text-slate-300 mt-0.5">
              {member.designation}
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-2.5 mt-3">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-cyan-300 bg-white/5 hover:bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all"
              >
                <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                <span>LinkedIn Profile</span>
              </a>
              {member.twitter && (
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-400 border border-white/10 transition-all"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Executive Bio */}
        <div className="text-slate-300 text-sm leading-relaxed border-t border-white/5 pt-4 mb-5">
          {member.about}
        </div>

        {/* Leadership Vision Quote Block */}
        {member.leadershipVision && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-500/5 via-cyan-500/[0.02] to-transparent border-l-2 border-cyan-400">
            <span className="text-[10px] font-mono font-semibold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3 h-3" /> LEADERSHIP VISION
            </span>
            <p className="text-slate-200 text-sm italic font-serif leading-relaxed">
              "{member.leadershipVision}"
            </p>
          </div>
        )}

        {/* Role & Responsibility */}
        <div className="mb-6">
          <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">
            ROLE & STRATEGY
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            {member.roleDescription}
          </p>
        </div>

        {/* Core Expertise */}
        <div className="mb-6">
          <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-2.5">
            CORE EXPERTISE
          </h4>
          <div className="flex flex-wrap gap-2">
            {member.specialization.map((spec) => (
              <span
                key={spec}
                className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-mono"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Key Contributions */}
        <div>
          <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-2.5">
            KEY CONTRIBUTIONS
          </h4>
          <div className="space-y-2">
            {member.keyContributions.map((kc) => (
              <div key={kc} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(0,242,254,0.6)]" />
                <span>{kc}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
