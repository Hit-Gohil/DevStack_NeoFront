import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'dark', // 'dark' | 'light'
  accentColor: 'accent-indigo',
  animationSpeed: 1.0,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setAccentColor: (state, action) => {
      state.accentColor = action.payload;
    },
    setAnimationSpeed: (state, action) => {
      state.animationSpeed = action.payload;
    },
  },
});

export const { toggleMode, setMode, setAccentColor, setAnimationSpeed } = themeSlice.actions;
export default themeSlice.reducer;
