import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTimelineEntry, removeTimelineEntry } from '../../store/profileSlice';
import { TIMELINE_TYPES } from '../../utils/constants';

const TimelineForm = () => {
  const dispatch = useDispatch();
  const { timeline } = useSelector((state) => state.profile);
  const [form, setForm] = useState({
    year: new Date().getFullYear().toString(),
    title: '',
    description: '',
    type: 'project',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    dispatch(addTimelineEntry({ ...form }));
    setForm({ year: new Date().getFullYear().toString(), title: '', description: '', type: 'project' });
  };

  const sortedTimeline = [...timeline].sort((a, b) => b.year - a.year);

  return (
    <div className="space-y-6">
      {/* Existing entries */}
      {timeline.length > 0 && (
        <div className="space-y-3">
          <p className="font-heading font-semibold text-sm text-lumina-text">
            Milestones ({timeline.length})
          </p>
          {sortedTimeline.map((entry) => {
            const typeData = TIMELINE_TYPES.find(t => t.value === entry.type);
            return (
              <div key={entry.id} className="glass rounded-xl px-4 py-3 flex items-start gap-3">
                <span className="text-xl mt-0.5">{typeData?.icon || '📌'}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[var(--accent)]">{entry.year}</span>
                    <span className="text-lumina-text-muted">•</span>
                    <span className="font-body text-sm text-lumina-text truncate">{entry.title}</span>
                  </div>
                  <p className="font-body text-xs text-lumina-text-secondary mt-1 line-clamp-2">
                    {entry.description}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(removeTimelineEntry(entry.id))}
                  className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Add form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="font-heading font-semibold text-sm text-lumina-text">➕ Add Milestone</p>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-body text-lumina-text-secondary mb-2">Year</label>
            <input
              type="text"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              placeholder="2024"
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-body text-lumina-text-secondary mb-2">Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="input-field"
            >
              {TIMELINE_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Milestone title"
          className="input-field"
          required
        />

        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Brief description"
          rows={3}
          className="input-field resize-none"
        />

        <button type="submit" className="btn-primary w-full text-sm">
          Add Milestone
        </button>
      </form>
    </div>
  );
};

export default TimelineForm;
