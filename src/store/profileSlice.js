import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_PROFILE, generateId } from '../utils/constants';

const initialState = { ...DEFAULT_PROFILE };

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    // Projects
    addProject: (state, action) => {
      state.projects.push({ ...action.payload, id: generateId() });
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state.projects[index] = action.payload;
    },
    removeProject: (state, action) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
    },
    reorderProjects: (state, action) => {
      state.projects = action.payload;
    },

    // Skills
    addSkill: (state, action) => {
      state.skills.push(action.payload);
    },
    updateSkill: (state, action) => {
      const index = state.skills.findIndex(
        s => s.name === action.payload.originalName || s.name === action.payload.name
      );
      if (index !== -1) {
        state.skills[index] = {
          name: action.payload.name,
          level: action.payload.level,
          category: action.payload.category,
        };
      }
    },
    removeSkill: (state, action) => {
      state.skills = state.skills.filter(s => s.name !== action.payload);
    },

    // Timeline
    addTimelineEntry: (state, action) => {
      state.timeline.push({ ...action.payload, id: generateId() });
    },
    updateTimelineEntry: (state, action) => {
      const index = state.timeline.findIndex(t => t.id === action.payload.id);
      if (index !== -1) state.timeline[index] = action.payload;
    },
    removeTimelineEntry: (state, action) => {
      state.timeline = state.timeline.filter(t => t.id !== action.payload);
    },

    // Reset
    resetProfile: () => ({ ...DEFAULT_PROFILE }),

    // Hydrate from localStorage
    hydrateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setProfile,
  updateField,
  addProject,
  updateProject,
  removeProject,
  reorderProjects,
  addSkill,
  updateSkill,
  removeSkill,
  addTimelineEntry,
  updateTimelineEntry,
  removeTimelineEntry,
  resetProfile,
  hydrateProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
