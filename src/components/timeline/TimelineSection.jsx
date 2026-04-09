import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import SectionWrapper from '../common/SectionWrapper';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TIMELINE_TYPES } from '../../utils/constants';

gsap.registerPlugin(ScrollTrigger);

const TimelineSection = () => {
  const { timeline } = useSelector((state) => state.profile);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  const displayTimeline = timeline.length > 0 ? timeline : [
    { id: '1', year: '2021', title: 'Started Coding', description: 'Began my journey with web development fundamentals — HTML, CSS, and JavaScript.', type: 'education' },
    { id: '2', year: '2022', title: 'First Internship', description: 'Joined a startup as a frontend developer intern. Built real products.', type: 'work' },
    { id: '3', year: '2022', title: 'Open Source', description: 'Started contributing to open source projects on GitHub.', type: 'achievement' },
    { id: '4', year: '2023', title: 'Major Project', description: 'Built and launched a full-stack application used by 1000+ users.', type: 'project' },
    { id: '5', year: '2024', title: 'Tech Lead', description: 'Leading a team of developers on production applications.', type: 'work' },
  ];

  const sortedTimeline = [...displayTimeline].sort((a, b) => parseInt(a.year) - parseInt(b.year));

  const getIcon = (type) => {
    const found = TIMELINE_TYPES.find((t) => t.value === type);
    return found ? found.icon : '📌';
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'work': return 'from-blue-500 to-indigo-500';
      case 'education': return 'from-emerald-500 to-teal-500';
      case 'project': return 'from-violet-500 to-purple-500';
      case 'achievement': return 'from-amber-500 to-orange-500';
      default: return 'from-[var(--accent)] to-[var(--accent-hover)]';
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      );

      // Timeline items stagger reveal
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll('.timeline-card');
        gsap.fromTo(
          items,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
          }
        );

        // Animate the connecting line
        const line = containerRef.current.querySelector('.timeline-line-fill');
        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1, duration: 1.5, ease: 'power3.out',
              scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [timeline]);

  return (
    <SectionWrapper id="timeline">
      <div ref={sectionRef} className="section-padding min-h-screen">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <div ref={headingRef} className="mb-16">
            <p className="font-mono text-sm text-[var(--accent)] mb-3 tracking-wider uppercase">// Journey</p>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-lumina-text mb-4">
              My <span className="gradient-text">Timeline</span>
            </h2>
            <p className="font-body text-lumina-text-secondary text-lg max-w-2xl">
              A chronological journey through my career milestones and achievements.
            </p>
          </div>

          {/* Vertical timeline */}
          <div ref={containerRef} className="relative">
            {/* Central line */}
            <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-[var(--bg-tertiary)]">
              <div
                className="timeline-line-fill w-full h-full origin-top"
                style={{
                  background: 'linear-gradient(to bottom, var(--accent), var(--accent-hover))',
                  boxShadow: '0 0 10px var(--accent-glow)',
                }}
              />
            </div>

            {/* Timeline items */}
            <div className="space-y-12">
              {sortedTimeline.map((entry, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={entry.id}
                    className={`timeline-card relative flex items-center gap-8 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Node dot */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                      <div
                        className="w-4 h-4 rounded-full border-[3px] border-[var(--accent)] bg-[var(--bg-primary)] shadow-glow"
                      />
                    </div>

                    {/* Spacer for mobile */}
                    <div className="w-12 md:hidden flex-shrink-0" />

                    {/* Card */}
                    <div className={`flex-1 ${isLeft ? 'md:pr-16' : 'md:pl-16'}`}>
                      <div className={`${isLeft ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'} max-w-md`}>
                        <div className="glass-card rounded-2xl p-6 group hover:shadow-glow transition-all duration-500 hover:-translate-y-1">
                          {/* Year & Type */}
                          <div className="flex items-center gap-3 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-heading font-bold text-white bg-gradient-to-r ${getTypeColor(entry.type)}`}>
                              {entry.year}
                            </span>
                            <span className="text-lg">{getIcon(entry.type)}</span>
                          </div>

                          {/* Content */}
                          <h3 className="font-heading font-bold text-xl text-lumina-text mb-2 group-hover:gradient-text transition-all duration-300">
                            {entry.title}
                          </h3>
                          <p className="font-body text-sm text-lumina-text-secondary leading-relaxed">
                            {entry.description}
                          </p>

                          {/* Type label */}
                          <div className="mt-4 pt-3 border-t border-[var(--border-glass)]">
                            <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
                              {entry.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Spacer for alternating layout on desktop */}
                    <div className="hidden md:block flex-1" />
                  </div>
                );
              })}
            </div>
          </div>

          {timeline.length === 0 && (
            <p className="text-center text-lumina-text-muted font-body text-sm mt-12">
              ✨ Placeholder timeline shown. Open the editor to add your milestones!
            </p>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default TimelineSection;
