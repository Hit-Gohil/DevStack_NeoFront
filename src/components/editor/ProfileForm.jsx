import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField } from '../../store/profileSlice';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const handleChange = (field) => (e) => {
    dispatch(updateField({ field, value: e.target.value }));
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-body text-lumina-text-secondary mb-2">Full Name</label>
        <input
          type="text"
          value={profile.name || ''}
          onChange={handleChange('name')}
          placeholder="John Doe"
          className="input-field"
          id="editor-name"
        />
      </div>

      <div>
        <label className="block text-sm font-body text-lumina-text-secondary mb-2">Title / Role</label>
        <input
          type="text"
          value={profile.title || ''}
          onChange={handleChange('title')}
          placeholder="Full Stack Developer"
          className="input-field"
          id="editor-title"
        />
      </div>

      <div>
        <label className="block text-sm font-body text-lumina-text-secondary mb-2">Bio</label>
        <textarea
          value={profile.bio || ''}
          onChange={handleChange('bio')}
          placeholder="Tell your story..."
          rows={4}
          className="input-field resize-none"
          id="editor-bio"
        />
      </div>

      <div>
        <label className="block text-sm font-body text-lumina-text-secondary mb-2">Avatar URL</label>
        <input
          type="url"
          value={profile.avatar || ''}
          onChange={handleChange('avatar')}
          placeholder="https://example.com/avatar.jpg"
          className="input-field"
          id="editor-avatar"
        />
      </div>

      <hr className="border-[var(--border-glass)]" />

      <p className="font-heading font-semibold text-sm text-lumina-text">Social Links</p>

      <div>
        <label className="block text-sm font-body text-lumina-text-secondary mb-2">GitHub Username</label>
        <div className="flex items-center gap-2">
          <span className="text-lumina-text-muted text-sm font-mono">github.com/</span>
          <input
            type="text"
            value={profile.github || ''}
            onChange={handleChange('github')}
            placeholder="username"
            className="input-field flex-1"
            id="editor-github"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-body text-lumina-text-secondary mb-2">LinkedIn Username</label>
        <div className="flex items-center gap-2">
          <span className="text-lumina-text-muted text-sm font-mono">linkedin.com/in/</span>
          <input
            type="text"
            value={profile.linkedin || ''}
            onChange={handleChange('linkedin')}
            placeholder="username"
            className="input-field flex-1"
            id="editor-linkedin"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-body text-lumina-text-secondary mb-2">Twitter/X Username</label>
        <div className="flex items-center gap-2">
          <span className="text-lumina-text-muted text-sm font-mono">twitter.com/</span>
          <input
            type="text"
            value={profile.twitter || ''}
            onChange={handleChange('twitter')}
            placeholder="username"
            className="input-field flex-1"
            id="editor-twitter"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-body text-lumina-text-secondary mb-2">Email</label>
        <input
          type="email"
          value={profile.email || ''}
          onChange={handleChange('email')}
          placeholder="you@example.com"
          className="input-field"
          id="editor-email"
        />
      </div>

      <div>
        <label className="block text-sm font-body text-lumina-text-secondary mb-2">Website</label>
        <input
          type="url"
          value={profile.website || ''}
          onChange={handleChange('website')}
          placeholder="https://yourwebsite.com"
          className="input-field"
          id="editor-website"
        />
      </div>
    </div>
  );
};

export default ProfileForm;
