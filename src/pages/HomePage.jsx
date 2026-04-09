import React from 'react';
import HeroSection from '../components/hero/HeroSection';
import AboutSection from '../components/about/AboutSection';
import ProjectsSection from '../components/projects/ProjectsSection';
import SkillsSection from '../components/skills/SkillsSection';
import TimelineSection from '../components/timeline/TimelineSection';
import ContactSection from '../components/contact/ContactSection';

const HomePage = () => {
  return (
    <main className="relative">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <TimelineSection />
      <ContactSection />
    </main>
  );
};

export default HomePage;
