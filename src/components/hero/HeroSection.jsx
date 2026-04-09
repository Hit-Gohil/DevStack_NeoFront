import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';
import HeroCanvas from './HeroCanvas';
import SectionWrapper from '../common/SectionWrapper';
import MagneticButton from '../common/MagneticButton';
import { SOCIAL_PLATFORMS } from '../../utils/constants';
import { formatUrl } from '../../utils/helpers';

const HeroSection = () => {
  const profile = useSelector((state) => state.profile);
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const socialsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Name letters stagger
      if (nameRef.current) {
        const text = nameRef.current.textContent;
        nameRef.current.innerHTML = '';
        text.split('').forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          nameRef.current.appendChild(span);
        });

        tl.fromTo(
          nameRef.current.querySelectorAll('span'),
          { opacity: 0, y: 60, rotateX: -90, filter: 'blur(10px)' },
          { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.04, ease: 'power3.out' },
          0.3
        );
      }

      // Title
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 30, filter: 'blur(5px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
          1.2
        );
      }

      // Subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          1.6
        );
      }

      // CTA
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' },
          2.0
        );
      }

      // Socials
      if (socialsRef.current) {
        tl.fromTo(
          socialsRef.current.children,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' },
          2.4
        );
      }

      // Scroll indicator
      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          3.0
        );
        // Pulse animation
        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          opacity: 0.3,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: 3.5,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [profile.name, profile.title]);

  const displayName = profile.name || 'Your Name';
  const displayTitle = profile.title || 'Developer & Creator';

  return (
    <SectionWrapper id="hero" className="min-h-screen flex items-center justify-center overflow-hidden">
      <div ref={containerRef} className="relative z-10 w-full min-h-screen flex items-center justify-center">
        {/* 3D Canvas Background */}
        <HeroCanvas />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-primary)] z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-primary)_70%)] z-[1]" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 opacity-0" style={{ animation: 'fade-in 0.8s ease 0.2s forwards' }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-body text-lumina-text-secondary">
              Available for opportunities
            </span>
          </div>

          {/* Name */}
          <h1
            ref={nameRef}
            className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-lumina-text mb-4 tracking-tight"
            style={{ perspective: '500px' }}
          >
            {displayName}
          </h1>

          {/* Title */}
          <p
            ref={titleRef}
            className="font-heading text-xl sm:text-2xl md:text-3xl gradient-text font-semibold mb-6 opacity-0"
          >
            {displayTitle}
          </p>

          {/* Bio snippet */}
          <p
            ref={subtitleRef}
            className="font-body text-lumina-text-secondary text-base sm:text-lg max-w-2xl mx-auto mb-10 opacity-0 leading-relaxed"
          >
            {profile.bio || 'Passionate about creating digital experiences that inspire and delight.'}
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <MagneticButton
              className="btn-primary opacity-0"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              id="hero-cta-projects"
            >
              View My Work
            </MagneticButton>
            <MagneticButton
              className="btn-secondary opacity-0"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              id="hero-cta-contact"
            >
              Get In Touch
            </MagneticButton>
          </div>

          {/* Social Links */}
          <div ref={socialsRef} className="flex items-center justify-center gap-4">
            {profile.github && (
              <a
                href={formatUrl(`https://github.com/${profile.github}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full glass flex items-center justify-center text-lumina-text-secondary hover:text-lumina-text hover:shadow-glow transition-all duration-300 opacity-0"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d={SOCIAL_PLATFORMS.github.icon} />
                </svg>
              </a>
            )}
            {profile.linkedin && (
              <a
                href={formatUrl(`https://linkedin.com/in/${profile.linkedin}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full glass flex items-center justify-center text-lumina-text-secondary hover:text-lumina-text hover:shadow-glow transition-all duration-300 opacity-0"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d={SOCIAL_PLATFORMS.linkedin.icon} />
                </svg>
              </a>
            )}
            {profile.twitter && (
              <a
                href={formatUrl(`https://twitter.com/${profile.twitter}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full glass flex items-center justify-center text-lumina-text-secondary hover:text-lumina-text hover:shadow-glow transition-all duration-300 opacity-0"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d={SOCIAL_PLATFORMS.twitter.icon} />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
        >
          <span className="text-xs font-body text-lumina-text-muted uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-lumina-text-muted flex justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-lumina-text-muted" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
