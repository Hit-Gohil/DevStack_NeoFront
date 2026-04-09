import React, { useEffect, useRef } from 'react';
import { createMagneticEffect } from '../../utils/animations';

const MagneticButton = ({ children, className = '', onClick, strength = 0.3, ...props }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Disable magnetic on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cleanup = createMagneticEffect(el, strength);
    return cleanup;
  }, [strength]);

  return (
    <button ref={ref} className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default MagneticButton;
