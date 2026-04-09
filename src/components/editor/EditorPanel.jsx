import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleEditor } from '../../store/editorSlice';
import ProfileForm from './ProfileForm';
import ProjectForm from './ProjectForm';
import SkillForm from './SkillForm';
import TimelineForm from './TimelineForm';
import ThemeControls from './ThemeControls';

const TABS = [
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'timeline', label: 'Timeline', icon: '📅' },
  { id: 'theme', label: 'Theme', icon: '🎨' },
];

const EditorPanel = () => {
  const dispatch = useDispatch();
  const { isEditing } = useSelector((state) => state.editor);
  const [activeTab, setActiveTab] = useState('profile');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return <ProfileForm />;
      case 'projects': return <ProjectForm />;
      case 'skills': return <SkillForm />;
      case 'timeline': return <TimelineForm />;
      case 'theme': return <ThemeControls />;
      default: return null;
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] transition-opacity duration-500 ${
          isEditing ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => dispatch(toggleEditor())}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] z-[80] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isEditing ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col" style={{ background: 'var(--bg-secondary)' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-glass)]">
            <div>
              <h2 className="font-heading font-bold text-xl text-lumina-text">Edit Profile</h2>
              <p className="font-body text-xs text-lumina-text-secondary mt-1">Changes save automatically</p>
            </div>
            <button
              onClick={() => dispatch(toggleEditor())}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-lumina-text-secondary hover:text-lumina-text transition-all duration-300"
              id="editor-close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-4 py-3 border-b border-[var(--border-glass)] overflow-x-auto hide-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-body whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[var(--accent)] text-white shadow-glow'
                    : 'text-lumina-text-secondary hover:bg-[var(--bg-glass)]'
                }`}
                id={`editor-tab-${tab.id}`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorPanel;
