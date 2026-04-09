import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeSection: 'hero',
  scrollProgress: 0,
  isLoaded: false,
};

const sceneSlice = createSlice({
  name: 'scene',
  initialState,
  reducers: {
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
    setScrollProgress: (state, action) => {
      state.scrollProgress = action.payload;
    },
    setIsLoaded: (state, action) => {
      state.isLoaded = action.payload;
    },
  },
});

export const { setActiveSection, setScrollProgress, setIsLoaded } = sceneSlice.actions;
export default sceneSlice.reducer;
