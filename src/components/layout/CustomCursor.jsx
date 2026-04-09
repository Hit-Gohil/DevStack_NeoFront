import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const { mode } = useSelector((state) => state.theme);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows immediately
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    // Smooth follow for outer ring
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      gsap.set(cursor, { x: cursorX, y: cursorY });
      requestAnimationFrame(animate);
    };

    // Scale up on interactive elements
    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 2.5, opacity: 0.5, duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    // Add hover effect to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Re-observe for dynamically added elements
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
      newElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          border: '1.5px solid var(--accent)',
          boxShadow: '0 0 15px var(--accent-glow)',
        }}
      />
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="custom-cursor fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'var(--accent)',
          boxShadow: '0 0 10px var(--accent-glow)',
        }}
      />
    </>
  );
};

export default CustomCursor;
