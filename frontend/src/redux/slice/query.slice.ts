import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RecentQueriesType } from "../../types.global/type.queries";

const initialState: RecentQueriesType = {
  recentQueries: [],
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQueries: (state: RecentQueriesType, action: PayloadAction<string>) => {
      state.recentQueries = state.recentQueries.filter(
        (q) => q !== action.payload
      );
      state.recentQueries.unshift(action.payload);
      if (state.recentQueries.length > 10) {
        state.recentQueries.pop();
      }
    },

    clearQueries: (state: RecentQueriesType) => {
      state.recentQueries = [];
    },
  },
});

export const { setQueries, clearQueries } = querySlice.actions;
export default querySlice.reducer;
