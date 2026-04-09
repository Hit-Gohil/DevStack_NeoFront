import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setProfile, addProject, addSkill, addTimelineEntry } from '../../store/profileSlice';
import { SKILL_CATEGORIES } from '../../utils/constants';
import gsap from 'gsap';

const STEPS = [
  { id: 'welcome', title: 'Welcome to Lumina', subtitle: 'Your cinematic developer showcase' },
  { id: 'basics', title: 'Tell us about you', subtitle: 'The basics' },
  { id: 'socials', title: 'Connect your profiles', subtitle: 'Social links' },
  { id: 'project', title: 'Showcase your work', subtitle: 'Add a project' },
  { id: 'skills', title: 'What do you know?', subtitle: 'Your skills' },
  { id: 'complete', title: 'You\'re all set!', subtitle: 'Your profile is ready' },
];

const OnboardingModal = ({ onComplete }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  const [basics, setBasics] = useState({ name: '', title: '', bio: '' });
  const [socials, setSocials] = useState({ github: '', linkedin: '', email: '' });
  const [project, setProject] = useState({ title: '', description: '', techStack: '' });
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const animateTransition = (callback) => {
    if (!contentRef.current) { callback(); return; }
    gsap.to(contentRef.current, {
      opacity: 0, y: -20, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        callback();
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
        );
      },
    });
  };

  const nextStep = () => {
    if (step === STEPS.length - 1) {
      finishOnboarding();
      return;
    }
    animateTransition(() => setStep(s => s + 1));
  };

  const prevStep = () => {
    if (step > 0) animateTransition(() => setStep(s => s - 1));
  };

  const addQuickSkill = (name, category = 'Frontend') => {
    if (selectedSkills.find(s => s.name === name)) {
      setSelectedSkills(selectedSkills.filter(s => s.name !== name));
    } else {
      setSelectedSkills([...selectedSkills, { name, level: 70, category }]);
    }
  };

  const finishOnboarding = () => {
    // Save basics
    dispatch(setProfile({
      name: basics.name,
      title: basics.title,
      bio: basics.bio,
      github: socials.github,
      linkedin: socials.linkedin,
      email: socials.email,
    }));

    // Save project
    if (project.title) {
      dispatch(addProject({
        title: project.title,
        description: project.description,
        techStack: project.techStack.split(',').map(t => t.trim()).filter(Boolean),
      }));
    }

    // Save skills
    selectedSkills.forEach(skill => dispatch(addSkill(skill)));

    onComplete();
  };

  const quickSkills = [
    { name: 'JavaScript', cat: 'Frontend' }, { name: 'TypeScript', cat: 'Frontend' },
    { name: 'React', cat: 'Frontend' }, { name: 'Vue.js', cat: 'Frontend' },
    { name: 'HTML/CSS', cat: 'Frontend' }, { name: 'Tailwind', cat: 'Frontend' },
    { name: 'Node.js', cat: 'Backend' }, { name: 'Python', cat: 'Backend' },
    { name: 'Java', cat: 'Backend' }, { name: 'C++', cat: 'Backend' },
    { name: 'MongoDB', cat: 'Database' }, { name: 'PostgreSQL', cat: 'Database' },
    { name: 'Docker', cat: 'DevOps' }, { name: 'Git', cat: 'Tools' },
    { name: 'Figma', cat: 'Design' }, { name: 'Flutter', cat: 'Mobile' },
  ];

  const renderStep = () => {
    switch (STEPS[step].id) {
      case 'welcome':
        return (
          <div className="text-center py-8">
            <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] flex items-center justify-center text-white text-4xl font-heading font-bold shadow-glow animate-float">
              L
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-lumina-text mb-4">
              Welcome to <span className="gradient-text">Lumina</span>
            </h2>
            <p className="font-body text-lumina-text-secondary max-w-md mx-auto leading-relaxed">
              Create your cinematic developer portfolio in minutes. Scroll-driven animations, 3D effects, and a stunning presentation — let's make your profile unforgettable.
            </p>
          </div>
        );

      case 'basics':
        return (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-body text-lumina-text-secondary mb-2">What's your name?</label>
              <input
                type="text"
                value={basics.name}
                onChange={(e) => setBasics({ ...basics, name: e.target.value })}
                placeholder="John Doe"
                className="input-field text-lg"
                autoFocus
                id="onboarding-name"
              />
            </div>
            <div>
              <label className="block text-sm font-body text-lumina-text-secondary mb-2">Your title / role</label>
              <input
                type="text"
                value={basics.title}
                onChange={(e) => setBasics({ ...basics, title: e.target.value })}
                placeholder="Full Stack Developer"
                className="input-field"
                id="onboarding-title"
              />
            </div>
            <div>
              <label className="block text-sm font-body text-lumina-text-secondary mb-2">Quick bio</label>
              <textarea
                value={basics.bio}
                onChange={(e) => setBasics({ ...basics, bio: e.target.value })}
                placeholder="Passionate about building things that matter..."
                rows={3}
                className="input-field resize-none"
                id="onboarding-bio"
              />
            </div>
          </div>
        );

      case 'socials':
        return (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-body text-lumina-text-secondary mb-2">GitHub Username</label>
              <input
                type="text"
                value={socials.github}
                onChange={(e) => setSocials({ ...socials, github: e.target.value })}
                placeholder="username"
                className="input-field"
                id="onboarding-github"
              />
            </div>
            <div>
              <label className="block text-sm font-body text-lumina-text-secondary mb-2">LinkedIn Username</label>
              <input
                type="text"
                value={socials.linkedin}
                onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
                placeholder="username"
                className="input-field"
                id="onboarding-linkedin"
              />
            </div>
            <div>
              <label className="block text-sm font-body text-lumina-text-secondary mb-2">Email</label>
              <input
                type="email"
                value={socials.email}
                onChange={(e) => setSocials({ ...socials, email: e.target.value })}
                placeholder="you@example.com"
                className="input-field"
                id="onboarding-email"
              />
            </div>
          </div>
        );

      case 'project':
        return (
          <div className="space-y-5">
            <p className="font-body text-sm text-lumina-text-secondary">
              Add your best project to get started. You can add more later.
            </p>
            <input
              type="text"
              value={project.title}
              onChange={(e) => setProject({ ...project, title: e.target.value })}
              placeholder="Project name"
              className="input-field"
              id="onboarding-project-title"
            />
            <textarea
              value={project.description}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
              placeholder="What does it do?"
              rows={3}
              className="input-field resize-none"
            />
            <input
              type="text"
              value={project.techStack}
              onChange={(e) => setProject({ ...project, techStack: e.target.value })}
              placeholder="Tech stack (React, Node.js, ...)"
              className="input-field"
            />
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-5">
            <p className="font-body text-sm text-lumina-text-secondary">
              Tap the skills you're proficient in:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickSkills.map((skill) => {
                const isSelected = selectedSkills.find(s => s.name === skill.name);
                return (
                  <button
                    key={skill.name}
                    onClick={() => addQuickSkill(skill.name, skill.cat)}
                    className={`px-4 py-2 rounded-full text-sm font-body transition-all duration-300 ${
                      isSelected
                        ? 'text-white shadow-glow'
                        : 'glass text-lumina-text-secondary hover:text-lumina-text'
                    }`}
                    style={isSelected ? {
                      background: `linear-gradient(135deg, var(--accent), var(--accent-hover))`,
                    } : {}}
                  >
                    {skill.name}
                  </button>
                );
              })}
            </div>
            {selectedSkills.length > 0 && (
              <p className="font-mono text-xs text-[var(--accent)]">
                {selectedSkills.length} skills selected
              </p>
            )}
          </div>
        );

      case 'complete':
        return (
          <div className="text-center py-8">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="font-heading font-bold text-3xl text-lumina-text mb-4">
              You're <span className="gradient-text">Ready!</span>
            </h2>
            <p className="font-body text-lumina-text-secondary max-w-md mx-auto">
              Your portfolio is set up. Scroll through to see it come alive. You can always edit everything using the ✏️ button in the top right.
            </p>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]/95 backdrop-blur-xl" />

      {/* Modal */}
      <div className="relative w-full max-w-lg">
        <div className="glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-20 blur-3xl"
            style={{ background: `radial-gradient(circle, var(--accent), transparent)` }} />

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i <= step ? 'flex-[2]' : 'flex-1'
                }`}
                style={{
                  background: i <= step
                    ? `linear-gradient(90deg, var(--accent), var(--accent-hover))`
                    : 'var(--bg-tertiary)',
                }}
              />
            ))}
          </div>

          {/* Step label */}
          <p className="font-mono text-xs text-[var(--accent)] uppercase tracking-wider mb-1">
            {STEPS[step].subtitle}
          </p>

          {/* Content */}
          <div ref={contentRef}>
            {renderStep()}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border-glass)]">
            <div>
              {step > 0 && step < STEPS.length - 1 && (
                <button
                  onClick={prevStep}
                  className="font-body text-sm text-lumina-text-secondary hover:text-lumina-text transition-colors"
                >
                  ← Back
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              {step > 0 && step < STEPS.length - 1 && (
                <button
                  onClick={() => animateTransition(() => setStep(STEPS.length - 1))}
                  className="font-body text-sm text-lumina-text-muted hover:text-lumina-text-secondary transition-colors"
                >
                  Skip
                </button>
              )}
              <button
                onClick={nextStep}
                className="btn-primary text-sm"
                id="onboarding-next"
              >
                {step === 0 ? 'Get Started' : step === STEPS.length - 1 ? 'Launch Portfolio ✨' : 'Continue →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
