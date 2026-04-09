import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProject, updateProject, removeProject } from '../../store/profileSlice';

const ProjectForm = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.profile);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '', description: '', techStack: '', liveUrl: '', githubUrl: '', image: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const projectData = {
      ...form,
      techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean),
    };

    if (editingId) {
      dispatch(updateProject({ ...projectData, id: editingId }));
      setEditingId(null);
    } else {
      dispatch(addProject(projectData));
    }

    setForm({ title: '', description: '', techStack: '', liveUrl: '', githubUrl: '', image: '' });
  };

  const startEdit = (project) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      techStack: project.techStack?.join(', ') || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      image: project.image || '',
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ title: '', description: '', techStack: '', liveUrl: '', githubUrl: '', image: '' });
  };

  return (
    <div className="space-y-6">
      {/* Existing projects */}
      {projects.length > 0 && (
        <div className="space-y-3">
          <p className="font-heading font-semibold text-sm text-lumina-text">
            Your Projects ({projects.length})
          </p>
          {projects.map((project) => (
            <div key={project.id} className="glass rounded-xl px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm text-lumina-text truncate">{project.title}</p>
                <p className="font-mono text-xs text-lumina-text-secondary truncate">
                  {project.techStack?.join(', ')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(project)}
                  className="text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => dispatch(removeProject(project.id))}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="font-heading font-semibold text-sm text-lumina-text">
          {editingId ? '✏️ Edit Project' : '➕ Add Project'}
        </p>

        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Project title"
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

        <input
          type="text"
          value={form.techStack}
          onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          placeholder="Tech stack (comma-separated: React, Node.js, ...)"
          className="input-field"
        />

        <input
          type="url"
          value={form.liveUrl}
          onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
          placeholder="Live URL (optional)"
          className="input-field"
        />

        <input
          type="url"
          value={form.githubUrl}
          onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
          placeholder="GitHub URL (optional)"
          className="input-field"
        />

        <input
          type="url"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          placeholder="Project image URL (optional)"
          className="input-field"
        />

        <div className="flex gap-3">
          <button type="submit" className="btn-primary flex-1 text-sm">
            {editingId ? 'Update' : 'Add Project'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="btn-secondary text-sm">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
