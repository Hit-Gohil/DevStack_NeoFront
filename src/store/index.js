import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import profileReducer, { hydrateProfile } from './profileSlice';
import sceneReducer from './sceneSlice';
import editorReducer from './editorSlice';
import { setMode, setAccentColor, setAnimationSpeed } from './themeSlice';

const STORAGE_KEYS = {
  profile: 'lumina_profile',
  theme: 'lumina_theme',
};

// localStorage persistence middleware
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  // Persist profile data on any profile action
  if (action.type?.startsWith('profile/')) {
    try {
      localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(state.profile));
    } catch (e) {
      console.warn('Failed to save profile to localStorage:', e);
    }
  }

  // Persist theme data on any theme action
  if (action.type?.startsWith('theme/')) {
    try {
      localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify(state.theme));
    } catch (e) {
      console.warn('Failed to save theme to localStorage:', e);
    }
  }

  return result;
};

// Load persisted state from localStorage
const loadPersistedState = () => {
  try {
    const profile = localStorage.getItem(STORAGE_KEYS.profile);
    const theme = localStorage.getItem(STORAGE_KEYS.theme);
    return {
      profile: profile ? JSON.parse(profile) : undefined,
      theme: theme ? JSON.parse(theme) : undefined,
    };
  } catch (e) {
    console.warn('Failed to load persisted state:', e);
    return {};
  }
};

const persistedState = loadPersistedState();

const store = configureStore({
  reducer: {
    theme: themeReducer,
    profile: profileReducer,
    scene: sceneReducer,
    editor: editorReducer,
  },
  preloadedState: {
    ...(persistedState.theme && { theme: persistedState.theme }),
    ...(persistedState.profile && { profile: persistedState.profile }),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
