import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import SectionWrapper from '../common/SectionWrapper';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateCounter } from '../../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const profile = useSelector((state) => state.profile);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bioRef = useRef(null);
  const statsRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      );

      // Image parallax
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.8, rotateY: -15 },
          {
            opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: imageRef.current, start: 'top 85%' },
          }
        );
      }

      // Bio lines stagger
      if (bioRef.current) {
        const lines = bioRef.current.querySelectorAll('.bio-line');
        gsap.fromTo(
          lines,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: bioRef.current, start: 'top 80%' },
          }
        );
      }

      // Stats counter
      if (statsRef.current) {
        const statElements = statsRef.current.querySelectorAll('.stat-number');
        gsap.fromTo(
          statsRef.current.querySelectorAll('.stat-card'),
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              onEnter: () => {
                statElements.forEach((el) => {
                  const target = parseInt(el.dataset.target, 10);
                  if (!isNaN(target)) animateCounter(el, target);
                });
              },
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [profile]);

  const bioSentences = (profile.bio || 'A passionate developer crafting digital experiences. Always learning, always building. Let me show you what I can create.')
    .split(/(?<=[.!?])\s+/)
    .filter(s => s.trim());

  return (
    <SectionWrapper id="about">
      <div ref={sectionRef} className="section-padding min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          {/* Section heading */}
          <div ref={headingRef} className="mb-16">
            <p className="font-mono text-sm text-[var(--accent)] mb-3 tracking-wider uppercase">// About Me</p>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-lumina-text">
              Who I <span className="gradient-text">Am</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Avatar & decorative */}
            <div ref={imageRef} className="relative" style={{ perspective: '1000px' }}>
              <div className="relative w-full max-w-md mx-auto aspect-square">
                {/* Decorative rings */}
                <div className="absolute inset-0 rounded-3xl border border-[var(--border-glass)] rotate-6 transition-all duration-700 hover:rotate-3" />
                <div className="absolute inset-0 rounded-3xl border border-[var(--accent)] opacity-20 -rotate-3 transition-all duration-700 hover:rotate-0" />
                
                {/* Main card */}
                <div className="relative rounded-3xl overflow-hidden glass-card p-8 h-full flex flex-col items-center justify-center gap-6">
                  {/* Avatar */}
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] flex items-center justify-center text-white text-4xl font-heading font-bold shadow-glow">
                    {profile.avatar ? (
                      <img src={profile.avatar} alt={profile.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      profile.name ? profile.name.charAt(0).toUpperCase() : '?'
                    )}
                  </div>

                  {/* Quick info */}
                  <div className="text-center">
                    <h3 className="font-heading font-bold text-2xl text-lumina-text mb-1">
                      {profile.name || 'Your Name'}
                    </h3>
                    <p className="font-body text-[var(--accent)]">
                      {profile.title || 'Developer'}
                    </p>
                  </div>

                  {/* Social pills */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {profile.github && (
                      <span className="px-3 py-1 rounded-full glass text-xs font-mono text-lumina-text-secondary">
                        @{profile.github}
                      </span>
                    )}
                    {profile.email && (
                      <span className="px-3 py-1 rounded-full glass text-xs font-mono text-lumina-text-secondary">
                        {profile.email}
                      </span>
                    )}
                  </div>

                  {/* Decorative grid pattern */}
                  <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none rounded-3xl" />
                </div>
              </div>
            </div>

            {/* Right: Bio & Stats */}
            <div>
              {/* Bio */}
              <div ref={bioRef} className="mb-12">
                {bioSentences.map((sentence, i) => (
                  <p key={i} className="bio-line font-body text-lg text-lumina-text-secondary leading-relaxed mb-4">
                    {sentence}
                  </p>
                ))}
              </div>

              {/* Stats */}
              <div ref={statsRef} className="grid grid-cols-3 gap-4">
                <div className="stat-card glass-card p-5 text-center rounded-2xl">
                  <span className="stat-number font-heading font-bold text-3xl gradient-text block" data-target={profile.projects?.length || 0}>
                    0
                  </span>
                  <span className="text-sm text-lumina-text-secondary mt-1 block font-body">Projects</span>
                </div>
                <div className="stat-card glass-card p-5 text-center rounded-2xl">
                  <span className="stat-number font-heading font-bold text-3xl gradient-text block" data-target={profile.skills?.length || 0}>
                    0
                  </span>
                  <span className="text-sm text-lumina-text-secondary mt-1 block font-body">Skills</span>
                </div>
                <div className="stat-card glass-card p-5 text-center rounded-2xl">
                  <span className="stat-number font-heading font-bold text-3xl gradient-text block" data-target={profile.timeline?.length || 0}>
                    0
                  </span>
                  <span className="text-sm text-lumina-text-secondary mt-1 block font-body">Milestones</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
