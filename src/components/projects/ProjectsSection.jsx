import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import SectionWrapper from '../common/SectionWrapper';
import ProjectCard from './ProjectCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const { projects } = useSelector((state) => state.profile);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      );

      // Cards stagger
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.project-card-wrap');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, rotateX: -10 },
          {
            opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  const displayProjects = projects.length > 0 ? projects : [
    { id: '1', title: 'Project Alpha', description: 'A stunning web application built with modern technologies.', techStack: ['React', 'Node.js', 'MongoDB'], liveUrl: '', githubUrl: '' },
    { id: '2', title: 'Project Beta', description: 'An innovative mobile-first design with real-time features.', techStack: ['Vue.js', 'Firebase', 'Tailwind'], liveUrl: '', githubUrl: '' },
    { id: '3', title: 'Project Gamma', description: 'A powerful CLI tool for developers to boost productivity.', techStack: ['Python', 'Docker', 'AWS'], liveUrl: '', githubUrl: '' },
  ];

  return (
    <SectionWrapper id="projects">
      <div ref={sectionRef} className="section-padding min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div ref={headingRef} className="mb-16">
            <p className="font-mono text-sm text-[var(--accent)] mb-3 tracking-wider uppercase">// Portfolio</p>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-lumina-text mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="font-body text-lumina-text-secondary text-lg max-w-2xl">
              Each project is a unique piece of development, crafted with attention to detail and modern best practices.
            </p>
          </div>

          {/* Project Grid */}
          <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project, index) => (
              <div key={project.id} className="project-card-wrap" style={{ perspective: '1000px' }}>
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>

          {/* Empty state for when editing */}
          {projects.length === 0 && (
            <p className="text-center text-lumina-text-muted font-body mt-8 text-sm">
              ✨ These are placeholder projects. Open the editor to add your own!
            </p>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
