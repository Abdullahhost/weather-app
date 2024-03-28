import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchValue: "dhaka",
  },

  reducers: {
    setSearch(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const searchSliceActions = searchSlice.actions;

export default searchSlice;
