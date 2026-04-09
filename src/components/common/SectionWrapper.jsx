import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveSection } from '../../store/sceneSlice';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionWrapper = ({ id, children, className = '' }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => dispatch(setActiveSection(id)),
      onEnterBack: () => dispatch(setActiveSection(id)),
    });

    return () => trigger.kill();
  }, [id, dispatch]);

  return (
    <section
      id={id}
      ref={ref}
      className={`relative ${className}`}
    >
      {children}
    </section>
  );
};

export default SectionWrapper;
