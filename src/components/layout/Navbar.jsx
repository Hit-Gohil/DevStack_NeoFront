import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMode } from '../../store/themeSlice';
import { toggleEditor } from '../../store/editorSlice';
import { SECTIONS } from '../../utils/constants';
import gsap from 'gsap';

const Navbar = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);
  const { activeSection } = useSelector((state) => state.scene);
  const { isEditing } = useSelector((state) => state.editor);
  const { name } = useSelector((state) => state.profile);
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 3.2 }
      );
    }
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileOpen(false);
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 opacity-0 ${
        isScrolled
          ? 'py-3 glass-strong shadow-glass'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 group"
          id="nav-logo"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] flex items-center justify-center text-white font-heading font-bold text-sm group-hover:shadow-glow transition-all duration-300">
            L
          </div>
          <span className="font-heading font-bold text-lg text-lumina-text hidden sm:block">
            {name || 'Lumina'}
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-4 py-2 rounded-full text-sm font-body transition-all duration-300 ${
                activeSection === section.id
                  ? 'text-white bg-[var(--accent)] shadow-glow'
                  : 'text-lumina-text-secondary hover:text-lumina-text hover:bg-[var(--bg-glass)]'
              }`}
              id={`nav-${section.id}`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleMode())}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-lumina-text-secondary hover:text-lumina-text hover:shadow-glow transition-all duration-300"
            id="theme-toggle"
            aria-label="Toggle theme"
          >
            <div className="relative w-5 h-5">
              {/* Sun */}
              <svg
                className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
                  mode === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {/* Moon */}
              <svg
                className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
                  mode === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
          </button>

          {/* Edit Toggle */}
          <button
            onClick={() => dispatch(toggleEditor())}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isEditing
                ? 'bg-[var(--accent)] text-white shadow-glow'
                : 'glass text-lumina-text-secondary hover:text-lumina-text'
            }`}
            id="edit-toggle"
            aria-label="Toggle editor"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden w-10 h-10 rounded-full glass flex items-center justify-center text-lumina-text-secondary"
            id="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 glass-strong transition-all duration-500 overflow-hidden ${
          isMobileOpen ? 'max-h-96 border-t border-[var(--border-glass)]' : 'max-h-0'
        }`}
      >
        <div className="p-6 flex flex-col gap-2">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-4 py-3 rounded-xl text-left font-body transition-all duration-300 ${
                activeSection === section.id
                  ? 'text-white bg-[var(--accent)]'
                  : 'text-lumina-text-secondary hover:bg-[var(--bg-glass)]'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
