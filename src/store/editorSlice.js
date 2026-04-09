import { createSlice } from '@reduxjs/toolkit';
import { SECTIONS } from '../utils/constants';

const initialState = {
  isEditing: false,
  sectionOrder: SECTIONS.map(s => s.id),
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    toggleEditor: (state) => {
      state.isEditing = !state.isEditing;
    },
    setEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    reorderSections: (state, action) => {
      state.sectionOrder = action.payload;
    },
  },
});

export const { toggleEditor, setEditing, reorderSections } = editorSlice.actions;
export default editorSlice.reducer;
