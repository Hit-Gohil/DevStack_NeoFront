import React, { useEffect, useRef } from 'react';
import { create3DTilt } from '../../utils/animations';
import { formatUrl } from '../../utils/helpers';

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const cleanup = create3DTilt(el, { maxTilt: 8, scale: 1.02 });
    return cleanup;
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden transition-all duration-500"
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.3s ease' }}
    >
      {/* Gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent)] via-transparent to-[var(--accent-hover)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]">
        <div className="w-full h-full rounded-2xl bg-[var(--bg-secondary)]" />
      </div>

      <div className="relative glass-card p-6 h-full flex flex-col">
        {/* Project image / placeholder */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden mb-5 bg-[var(--bg-tertiary)]">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="grid-bg absolute inset-0 opacity-40" />
              <span className="font-heading font-bold text-4xl gradient-text relative z-10">
                {project.title?.charAt(0) || '#'}
              </span>
            </div>
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="font-heading font-bold text-xl text-lumina-text mb-2 group-hover:gradient-text transition-all duration-300">
            {project.title || 'Project Title'}
          </h3>
          <p className="font-body text-sm text-lumina-text-secondary mb-4 flex-1 line-clamp-3">
            {project.description || 'A brief description of this project.'}
          </p>

          {/* Tech stack tags */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-mono transition-all duration-300"
                  style={{
                    background: 'rgba(var(--accent-rgb), 0.1)',
                    color: 'var(--accent)',
                    border: '1px solid rgba(var(--accent-rgb), 0.2)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[var(--border-glass)]">
            {project.liveUrl && (
              <a
                href={formatUrl(project.liveUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-body text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={formatUrl(project.githubUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-body text-lumina-text-secondary hover:text-lumina-text transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
