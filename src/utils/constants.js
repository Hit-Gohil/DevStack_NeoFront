// Default profile data for new users
export const DEFAULT_PROFILE = {
  name: '',
  title: '',
  bio: '',
  avatar: '',
  github: '',
  linkedin: '',
  twitter: '',
  email: '',
  website: '',
  projects: [],
  skills: [],
  timeline: [],
};

export const DEFAULT_PROJECT = {
  id: '',
  title: '',
  description: '',
  techStack: [],
  liveUrl: '',
  githubUrl: '',
  image: '',
};

export const DEFAULT_SKILL = {
  name: '',
  level: 50,
  category: 'Frontend',
};

export const DEFAULT_TIMELINE_ENTRY = {
  id: '',
  year: new Date().getFullYear().toString(),
  title: '',
  description: '',
  type: 'project', // work, education, project, achievement
};

// Accent color presets
export const ACCENT_COLORS = [
  { name: 'Indigo', class: 'accent-indigo', hex: '#6366f1' },
  { name: 'Violet', class: 'accent-violet', hex: '#8b5cf6' },
  { name: 'Cyan', class: 'accent-cyan', hex: '#06b6d4' },
  { name: 'Emerald', class: 'accent-emerald', hex: '#10b981' },
  { name: 'Rose', class: 'accent-rose', hex: '#f43f5e' },
  { name: 'Amber', class: 'accent-amber', hex: '#f59e0b' },
  { name: 'Blue', class: 'accent-blue', hex: '#3b82f6' },
  { name: 'Fuchsia', class: 'accent-fuchsia', hex: '#d946ef' },
];

// Skill categories
export const SKILL_CATEGORIES = [
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Mobile',
  'Design',
  'Tools',
  'Other',
];

// Timeline entry types
export const TIMELINE_TYPES = [
  { value: 'work', label: 'Work', icon: '💼' },
  { value: 'education', label: 'Education', icon: '🎓' },
  { value: 'project', label: 'Project', icon: '🚀' },
  { value: 'achievement', label: 'Achievement', icon: '🏆' },
];

// Section names for navigation
export const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'contact', label: 'Contact' },
];

// Social platforms with icons (SVG paths)
export const SOCIAL_PLATFORMS = {
  github: {
    label: 'GitHub',
    icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
    baseUrl: 'https://github.com/',
  },
  linkedin: {
    label: 'LinkedIn',
    icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    baseUrl: 'https://linkedin.com/in/',
  },
  twitter: {
    label: 'Twitter/X',
    icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    baseUrl: 'https://twitter.com/',
  },
};

// Generate unique IDs
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
