import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Itheme {
  theme: string;
}

const initialState: Itheme = {
  theme: "light",
};

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state: Itheme, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },

    clearTheme: (state: Itheme) => {
      state.theme = "light";
    },
  },
});

export const { setTheme, clearTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
