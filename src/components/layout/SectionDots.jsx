import React from 'react';
import { useSelector } from 'react-redux';
import { SECTIONS } from '../../utils/constants';

const SectionDots = () => {
  const { activeSection } = useSelector((state) => state.scene);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4">
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center"
            aria-label={`Go to ${section.label}`}
            id={`dot-${section.id}`}
          >
            {/* Label */}
            <span className="absolute right-8 opacity-0 group-hover:opacity-100 text-xs font-body text-lumina-text-secondary whitespace-nowrap transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              {section.label}
            </span>
            {/* Dot */}
            <div
              className={`rounded-full transition-all duration-500 ${
                isActive
                  ? 'w-3 h-3 shadow-glow'
                  : 'w-2 h-2 opacity-40 group-hover:opacity-80'
              }`}
              style={{
                background: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                boxShadow: isActive ? '0 0 12px var(--accent-glow)' : 'none',
              }}
            />
          </button>
        );
      })}
    </div>
  );
};

export default SectionDots;
