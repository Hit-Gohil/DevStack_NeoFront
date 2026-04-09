import gsap from 'gsap';

// Create a sequenced animation timeline
export const createSequence = (elements, options = {}) => {
  const {
    stagger = 0.1,
    duration = 0.8,
    ease = 'power3.out',
    y = 40,
    delay = 0,
  } = options;

  return gsap.fromTo(
    elements,
    { opacity: 0, y, filter: 'blur(10px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration, ease, stagger, delay }
  );
};

// Letter split animation
export const animateLetters = (element, options = {}) => {
  const {
    duration = 0.6,
    stagger = 0.03,
    ease = 'power3.out',
    delay = 0,
  } = options;

  const text = element.textContent;
  element.innerHTML = '';

  const letters = text.split('').map((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    element.appendChild(span);
    return span;
  });

  return gsap.fromTo(
    letters,
    { opacity: 0, y: 30, rotateX: -90 },
    { opacity: 1, y: 0, rotateX: 0, duration, stagger, ease, delay }
  );
};

// Count up animation
export const animateCounter = (element, target, options = {}) => {
  const { duration = 2, ease = 'power2.out', delay = 0 } = options;
  const obj = { value: 0 };

  return gsap.to(obj, {
    value: target,
    duration,
    ease,
    delay,
    onUpdate: () => {
      element.textContent = Math.round(obj.value);
    },
  });
};

// Magnetic effect for buttons
export const createMagneticEffect = (element, strength = 0.3) => {
  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// 3D tilt effect for cards
export const create3DTilt = (element, options = {}) => {
  const { maxTilt = 10, scale = 1.02, speed = 400 } = options;

  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const tiltX = (maxTilt / 2 - x * maxTilt).toFixed(2);
    const tiltY = (y * maxTilt - maxTilt / 2).toFixed(2);

    element.style.transform = `perspective(${speed}px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(${scale}, ${scale}, ${scale})`;
  };

  const handleMouseLeave = () => {
    element.style.transform = 'perspective(400px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};
