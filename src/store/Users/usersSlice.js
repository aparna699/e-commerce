import { createSlice } from "@reduxjs/toolkit"
import { getUsersList } from "./actions";


const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
};

export const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    extraReducers: {
      [getUsersList.pending]: (state) => {
        state.isLoading = true;
      },
      [getUsersList.fulfilled]: (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload;
      },
      [getUsersList.rejected]: (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action;
      },
    },
})