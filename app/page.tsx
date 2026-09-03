"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CompanyGlance from "@/components/CompanyGlance";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import WorkShowcase from "@/components/WorkShowcase";
import TechnologyConstellation from "@/components/TechnologyConstellation";
import ProcessSection from "@/components/ProcessSection";
import WhyUsSection from "@/components/WhyUsSection";
import TeamShowcase from "@/components/TeamShowcase";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTASection from "@/components/FinalCTASection";
import ProjectStarterModal from "@/components/ProjectStarterModal";
import FloatingActionBar from "@/components/FloatingActionBar";
import Footer from "@/components/Footer";

import ParticleSystemCanvas from "@/components/ParticleSystemCanvas";

export default function Home() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const handleOpenProjectModal = () => {
    setIsProjectModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setIsProjectModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#08090E] text-slate-100 selection:bg-cyan-500/30 selection:text-white relative">
      {/* High-End Ambient Particle Transition Canvas */}
      <ParticleSystemCanvas />

      {/* Glass Top Navbar */}
      <Navbar onOpenProjectModal={handleOpenProjectModal} />

      {/* Section 01: Hero with Interactive Node Ecosystem */}
      <HeroSection onOpenProjectModal={handleOpenProjectModal} />

      {/* Section 02: The Company in One Glance */}
      <CompanyGlance />

      {/* Section 03: Capabilities */}
      <CapabilitiesSection onOpenProjectModal={handleOpenProjectModal} />

      {/* Section 04: The Work (Cinematic Case Studies) */}
      <WorkShowcase onOpenProjectModal={handleOpenProjectModal} />

      {/* Section 05: Technology Constellation */}
      <TechnologyConstellation />

      {/* Section 06: How We Work (Process Timeline) */}
      <ProcessSection />

      {/* Section 07: Why Clients Work With Us */}
      <WhyUsSection />

      {/* Section 08: Team Showcase */}
      <TeamShowcase />

      {/* Section 09: Numbers That Matter (Stats) */}
      <StatsSection />

      {/* Section 10: About */}
      <AboutSection />

      {/* Section 11: Client Proof & Testimonials */}
      <TestimonialsSection />

      {/* Section 12: Final CTA */}
      <FinalCTASection onOpenProjectModal={handleOpenProjectModal} />

      {/* Footer */}
      <Footer />

      {/* Floating Action Bar (Bottom Right) */}
      <FloatingActionBar onOpenProjectModal={handleOpenProjectModal} />

      {/* Project Discovery Wizard Modal */}
      <ProjectStarterModal
        isOpen={isProjectModalOpen}
        onClose={handleCloseProjectModal}
      />
    </main>
  );
}
