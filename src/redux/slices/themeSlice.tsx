import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: true,
  language: "EN",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    CHANGE_THEME(state) {
      state.darkMode = !state.darkMode;
    },
    CHANGE_LANG(state, { payload }) {
      state.language = payload;
    },
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const { CHANGE_THEME, CHANGE_LANG } = themeSlice.actions;

export default themeSlice.reducer;
