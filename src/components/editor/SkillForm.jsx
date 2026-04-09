import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSkill, removeSkill } from '../../store/profileSlice';
import { SKILL_CATEGORIES } from '../../utils/constants';

const SkillForm = () => {
  const dispatch = useDispatch();
  const { skills } = useSelector((state) => state.profile);
  const [form, setForm] = useState({ name: '', level: 70, category: 'Frontend' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (skills.find(s => s.name.toLowerCase() === form.name.toLowerCase())) return;
    dispatch(addSkill({ ...form }));
    setForm({ name: '', level: 70, category: 'Frontend' });
  };

  // Group by category
  const grouped = {};
  skills.forEach((s) => {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(s);
  });

  return (
    <div className="space-y-6">
      {/* Existing skills */}
      {Object.keys(grouped).length > 0 && (
        <div className="space-y-4">
          <p className="font-heading font-semibold text-sm text-lumina-text">
            Your Skills ({skills.length})
          </p>
          {Object.entries(grouped).map(([category, catSkills]) => (
            <div key={category}>
              <p className="font-mono text-xs text-lumina-text-secondary uppercase tracking-wider mb-2">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {catSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group flex items-center gap-2 px-3 py-1.5 rounded-full glass text-sm"
                  >
                    <span className="font-body text-lumina-text">{skill.name}</span>
                    <span className="font-mono text-xs text-[var(--accent)]">{skill.level}%</span>
                    <button
                      onClick={() => dispatch(removeSkill(skill.name))}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all ml-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="font-heading font-semibold text-sm text-lumina-text">➕ Add Skill</p>

        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Skill name (e.g. React)"
          className="input-field"
          required
        />

        <div>
          <label className="flex justify-between text-sm font-body text-lumina-text-secondary mb-2">
            <span>Proficiency Level</span>
            <span className="font-mono text-[var(--accent)]">{form.level}%</span>
          </label>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={form.level}
            onChange={(e) => setForm({ ...form, level: parseInt(e.target.value) })}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(90deg, var(--accent) ${form.level}%, var(--bg-tertiary) ${form.level}%)`,
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-body text-lumina-text-secondary mb-2">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="input-field"
          >
            {SKILL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-primary w-full text-sm">
          Add Skill
        </button>
      </form>
    </div>
  );
};

export default SkillForm;
