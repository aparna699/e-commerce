import { createSlice } from "@reduxjs/toolkit"
import { getAddressLsit } from "./actions";

const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
};

export const addressSlice = createSlice({
    name: "address",
    initialState: initialState,
    extraReducers: {
      [getAddressLsit.pending]: (state) => {
        state.isLoading = true;
      },
      [getAddressLsit.fulfilled]: (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload;
      },
      [getAddressLsit.rejected]: (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action;
      },
    },
})