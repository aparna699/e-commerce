import { createSlice } from "@reduxjs/toolkit";
import { getItemsList } from "./actions";

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

export const itemsSlice = createSlice({
  name: "items",
  initialState: initialState,
  extraReducers: {
    [getItemsList.pending]: (state) => {
      state.isLoading = true;
    },
    [getItemsList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [getItemsList.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = JSON.stringify(action.payload);
    //   state.errorMessage = "error";
    },
  },
});

export default itemsSlice.reducer;