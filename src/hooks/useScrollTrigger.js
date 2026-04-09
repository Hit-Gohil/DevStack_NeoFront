import { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollTrigger = (options = {}) => {
  const ref = useRef(null);
  const triggerRef = useRef(null);
  const animationSpeed = useSelector((state) => state.theme.animationSpeed);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const {
      animation = 'fadeUp',
      start = 'top 85%',
      end = 'bottom 15%',
      scrub = false,
      pin = false,
      markers = false,
      stagger = 0.1,
      onEnter,
      onLeave,
      children,
    } = options;

    const duration = 1 * animationSpeed;
    const ease = 'power3.out';

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
        pin,
        markers,
        onEnter: onEnter,
        onLeave: onLeave,
        toggleActions: scrub ? undefined : 'play none none reverse',
      },
    });

    triggerRef.current = tl;

    if (prefersReducedMotion) {
      // Simple fade for reduced motion
      tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      return () => tl.kill();
    }

    const targets = children ? el.querySelectorAll(children) : [el];

    switch (animation) {
      case 'fadeUp':
        tl.fromTo(targets, 
          { opacity: 0, y: 60 }, 
          { opacity: 1, y: 0, duration, ease, stagger }
        );
        break;
      case 'fadeIn':
        tl.fromTo(targets, 
          { opacity: 0 }, 
          { opacity: 1, duration, ease, stagger }
        );
        break;
      case 'slideLeft':
        tl.fromTo(targets, 
          { opacity: 0, x: 100 }, 
          { opacity: 1, x: 0, duration, ease, stagger }
        );
        break;
      case 'slideRight':
        tl.fromTo(targets, 
          { opacity: 0, x: -100 }, 
          { opacity: 1, x: 0, duration, ease, stagger }
        );
        break;
      case 'scaleIn':
        tl.fromTo(targets, 
          { opacity: 0, scale: 0.8 }, 
          { opacity: 1, scale: 1, duration, ease, stagger }
        );
        break;
      case 'splitText':
        tl.fromTo(targets, 
          { opacity: 0, y: 40, rotateX: -20 }, 
          { opacity: 1, y: 0, rotateX: 0, duration, ease, stagger: stagger || 0.05 }
        );
        break;
      default:
        tl.fromTo(targets, 
          { opacity: 0, y: 60 }, 
          { opacity: 1, y: 0, duration, ease, stagger }
        );
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [animationSpeed]);

  return ref;
};

export default useScrollTrigger;
