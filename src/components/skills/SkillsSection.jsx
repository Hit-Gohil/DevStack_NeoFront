import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import SectionWrapper from '../common/SectionWrapper';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { SKILL_CATEGORIES } from '../../utils/constants';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const { skills } = useSelector((state) => state.profile);
  const { accentColor } = useSelector((state) => state.theme);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const chartRef = useRef(null);
  const barsRef = useRef(null);
  const [isChartVisible, setIsChartVisible] = useState(false);

  const colorMap = {
    'accent-indigo': '#6366f1',
    'accent-violet': '#8b5cf6',
    'accent-cyan': '#06b6d4',
    'accent-emerald': '#10b981',
    'accent-rose': '#f43f5e',
    'accent-amber': '#f59e0b',
    'accent-blue': '#3b82f6',
    'accent-fuchsia': '#d946ef',
  };
  const accentHex = colorMap[accentColor] || '#6366f1';

  // Prepare radar chart data from skills by category
  const radarData = SKILL_CATEGORIES.map((category) => {
    const categorySkills = skills.filter((s) => s.category === category);
    const avgLevel =
      categorySkills.length > 0
        ? categorySkills.reduce((sum, s) => sum + s.level, 0) / categorySkills.length
        : 0;
    return { category, level: Math.round(avgLevel), fullMark: 100 };
  }).filter((d) => d.level > 0);

  // Fallback radar data
  const defaultRadarData = [
    { category: 'Frontend', level: 85, fullMark: 100 },
    { category: 'Backend', level: 70, fullMark: 100 },
    { category: 'Database', level: 60, fullMark: 100 },
    { category: 'DevOps', level: 45, fullMark: 100 },
    { category: 'Design', level: 75, fullMark: 100 },
    { category: 'Tools', level: 65, fullMark: 100 },
  ];

  const chartData = radarData.length >= 3 ? radarData : defaultRadarData;

  // Group skills by category for bars
  const groupedSkills = {};
  const displaySkills = skills.length > 0 ? skills : [
    { name: 'React', level: 90, category: 'Frontend' },
    { name: 'JavaScript', level: 85, category: 'Frontend' },
    { name: 'TypeScript', level: 75, category: 'Frontend' },
    { name: 'Node.js', level: 70, category: 'Backend' },
    { name: 'Python', level: 65, category: 'Backend' },
    { name: 'MongoDB', level: 60, category: 'Database' },
    { name: 'Figma', level: 80, category: 'Design' },
    { name: 'Git', level: 85, category: 'Tools' },
  ];

  displaySkills.forEach((skill) => {
    if (!groupedSkills[skill.category]) groupedSkills[skill.category] = [];
    groupedSkills[skill.category].push(skill);
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      );

      if (chartRef.current) {
        gsap.fromTo(
          chartRef.current,
          { opacity: 0, scale: 0.5, rotate: -30 },
          {
            opacity: 1, scale: 1, rotate: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: {
              trigger: chartRef.current,
              start: 'top 80%',
              onEnter: () => setIsChartVisible(true),
            },
          }
        );
      }

      if (barsRef.current) {
        const bars = barsRef.current.querySelectorAll('.skill-bar-wrap');
        gsap.fromTo(
          bars,
          { opacity: 0, x: 60 },
          {
            opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: barsRef.current, start: 'top 80%' },
          }
        );

        // Animate bar widths
        const fillBars = barsRef.current.querySelectorAll('.skill-bar-fill');
        fillBars.forEach((bar) => {
          const target = bar.dataset.level + '%';
          gsap.fromTo(
            bar,
            { width: '0%' },
            {
              width: target, duration: 1.2, ease: 'power3.out',
              scrollTrigger: { trigger: bar, start: 'top 90%' },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [skills]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card px-4 py-2 rounded-xl">
          <p className="font-body text-sm text-lumina-text">{payload[0].payload.category}</p>
          <p className="font-mono text-xs text-[var(--accent)]">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <SectionWrapper id="skills">
      <div ref={sectionRef} className="section-padding min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div ref={headingRef} className="mb-16">
            <p className="font-mono text-sm text-[var(--accent)] mb-3 tracking-wider uppercase">// Expertise</p>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-lumina-text mb-4">
              Skills & <span className="gradient-text">Tools</span>
            </h2>
            <p className="font-body text-lumina-text-secondary text-lg max-w-2xl">
              Technologies and tools I've worked with, visualized by proficiency.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Radar Chart */}
            <div ref={chartRef} className="glass-card rounded-3xl p-8">
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={chartData}>
                  <PolarGrid stroke="var(--border-glass)" />
                  <PolarAngleAxis
                    dataKey="category"
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontFamily: 'Inter' }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                  />
                  <Radar
                    name="Skills"
                    dataKey="level"
                    stroke={accentHex}
                    fill={accentHex}
                    fillOpacity={isChartVisible ? 0.2 : 0}
                    strokeWidth={2}
                    animationBegin={0}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Skill bars by category */}
            <div ref={barsRef} className="space-y-8">
              {Object.entries(groupedSkills).map(([category, catSkills]) => (
                <div key={category} className="skill-bar-wrap">
                  <h3 className="font-heading font-semibold text-sm text-lumina-text-secondary uppercase tracking-wider mb-3">
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {catSkills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                          <span className="font-body text-sm text-lumina-text">{skill.name}</span>
                          <span className="font-mono text-xs text-[var(--accent)]">{skill.level}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                          <div
                            className="skill-bar-fill h-full rounded-full"
                            data-level={skill.level}
                            style={{
                              background: `linear-gradient(90deg, var(--accent), var(--accent-hover))`,
                              width: '0%',
                              boxShadow: '0 0 8px var(--accent-glow)',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {skills.length === 0 && (
                <p className="text-lumina-text-muted font-body text-sm">
                  ✨ Placeholder skills shown. Open the editor to add your own!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
