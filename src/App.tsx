/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProfilesAndContactSection } from './components/ProfilesAndContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ProfileCustomizerModal } from './components/ProfileCustomizerModal';
import {
  initialProfile,
  projectsData,
  skillCategoriesData,
  experienceData,
  educationData,
} from './data/portfolioData';
import { ProfileData } from './types/portfolio';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem('hg_portfolio_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return initialProfile;
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('hg_portfolio_theme');
      if (savedTheme) return savedTheme === 'dark';
    } catch {
      // Ignore
    }
    return true; // Default dark
  });

  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Sync theme class with documentElement
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    try {
      localStorage.setItem('hg_portfolio_theme', isDark ? 'dark' : 'light');
    } catch {
      // Ignore
    }
  }, [isDark]);

  const handleSaveProfile = (updated: ProfileData) => {
    setProfile(updated);
    try {
      localStorage.setItem('hg_portfolio_profile', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 transition-colors duration-200">
      {/* Navigation adhering to Top Bar Contract */}
      <Navbar
        profile={profile}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          profile={profile}
          onOpenContact={scrollToContact}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Biography & Principles Section */}
        <AboutSection
          profile={profile}
          education={educationData}
        />

        {/* Projects Showcase Bento & Case Studies */}
        <ProjectsSection projects={projectsData} />

        {/* Technical Competencies & Stack Section */}
        <SkillsSection skillCategories={skillCategoriesData} />

        {/* Experience Timeline */}
        <ExperienceSection experiences={experienceData} />

        {/* Professional Profiles & Interactive Contact */}
        <ProfilesAndContactSection profile={profile} />
      </main>

      {/* Clean Footer adhering to Anti-Slop Discipline */}
      <Footer profile={profile} />

      {/* Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
        experiences={experienceData}
        education={educationData}
        skillCategories={skillCategoriesData}
      />

      <ProfileCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />
    </div>
  );
}
