import { createSlice } from "@reduxjs/toolkit"
import { getCategoryList } from "./actions";

const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
};

export const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    extraReducers: {
      [getCategoryList.pending]: (state) => {
        state.isLoading = true;
      },
      [getCategoryList.fulfilled]: (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload;
      },
      [getCategoryList.rejected]: (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action;
      },
    },
})