import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import SectionWrapper from '../common/SectionWrapper';
import MagneticButton from '../common/MagneticButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SOCIAL_PLATFORMS } from '../../utils/constants';
import { formatUrl } from '../../utils/helpers';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const profile = useSelector((state) => state.profile);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 80, filter: 'blur(10px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      );

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.contact-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
          }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socialCards = [
    {
      platform: 'github',
      value: profile.github,
      href: profile.github ? `https://github.com/${profile.github}` : null,
    },
    {
      platform: 'linkedin',
      value: profile.linkedin,
      href: profile.linkedin ? `https://linkedin.com/in/${profile.linkedin}` : null,
    },
    {
      platform: 'twitter',
      value: profile.twitter,
      href: profile.twitter ? `https://twitter.com/${profile.twitter}` : null,
    },
  ].filter((s) => s.value);

  return (
    <SectionWrapper id="contact">
      <div ref={sectionRef} className="section-padding min-h-screen flex items-center relative">
        {/* Background grid */}
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

        <div className="max-w-4xl mx-auto w-full text-center relative z-10">
          {/* Heading */}
          <div ref={headingRef} className="mb-16">
            <p className="font-mono text-sm text-[var(--accent)] mb-3 tracking-wider uppercase">// Connect</p>
            <h2 className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl text-lumina-text mb-6">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="font-body text-lumina-text-secondary text-lg max-w-xl mx-auto">
              I'm always open to new opportunities, collaborations, or just a friendly chat about tech.
            </p>
          </div>

          {/* Social cards */}
          {socialCards.length > 0 && (
            <div ref={cardsRef} className="flex flex-wrap justify-center gap-4 mb-12">
              {socialCards.map(({ platform, value, href }) => {
                const platformData = SOCIAL_PLATFORMS[platform];
                return (
                  <a
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-card glass-card rounded-2xl px-8 py-6 flex items-center gap-4 group hover:shadow-glow transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{ background: 'rgba(var(--accent-rgb), 0.1)' }}
                    >
                      <svg className="w-6 h-6 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24">
                        <path d={platformData.icon} />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="font-heading font-semibold text-lumina-text text-sm">
                        {platformData.label}
                      </p>
                      <p className="font-mono text-xs text-lumina-text-secondary">
                        @{value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {/* Email CTA */}
          <div ref={ctaRef}>
            {profile.email ? (
              <MagneticButton
                className="btn-primary text-lg px-12 py-4"
                onClick={() => window.open(`mailto:${profile.email}`, '_blank')}
                id="contact-email-cta"
              >
                <span className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Say Hello
                </span>
              </MagneticButton>
            ) : (
              <p className="text-lumina-text-muted font-body text-sm">
                ✨ Add your email in the editor to enable the contact button!
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="mt-24 pt-8 border-t border-[var(--border-glass)]">
            <p className="font-body text-sm text-lumina-text-muted">
              Built with <span className="text-[var(--accent)]">♥</span> using{' '}
              <span className="font-mono text-lumina-text-secondary">Lumina</span>
            </p>
            <p className="font-body text-xs text-lumina-text-muted mt-2">
              {profile.name ? `© ${new Date().getFullYear()} ${profile.name}` : '© 2026 Lumina'}
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
