import { createSlice } from "@reduxjs/toolkit"
import createExtraActions from "./actions";
import createExtraReducers from "./reducer";

const name = "category"
const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
};

const extraActions = createExtraActions();
const extraReducers = createExtraReducers();

const categorySlice = createSlice({ 
  name, 
  initialState, 
  extraReducers 
});

//export
export const categoryActions = { ...categorySlice.actions, ...extraActions };
export const categoryReducer = categorySlice.reducer;

// export const categorySlice = createSlice({
//     name: "category",
//     initialState: initialState,
//     extraReducers: {
//       [getCategoryList.pending]: (state) => {
//         state.isLoading = true;
//       },
//       [getCategoryList.fulfilled]: (state, { payload }) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.data = payload;
//       },
//       [getCategoryList.rejected]: (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = false;
//         state.errorMessage = action;
//       },
//     },
// })