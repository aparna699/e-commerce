import { createSlice } from "@reduxjs/toolkit";
import createExtraActions, { getItemsList } from "./actions";
import createExtraReducers from "./reducer";

const name = "items"
const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

const extraActions = createExtraActions();
const extraReducers = createExtraReducers();

const itemsSlice = createSlice({ 
  name, 
  initialState, 
  extraReducers 
});

//export
export const itemsActions = { ...itemsSlice.actions, ...extraActions };
export const itemsReducer = itemsSlice.reducer;


// export const itemsSlice = createSlice({
//   name: "items",
//   initialState: initialState,
//   extraReducers: {
//     [getItemsList.pending]: (state) => {
//       state.isLoading = true;
//     },
//     [getItemsList.fulfilled]: (state, { payload }) => {
//       state.isLoading = false;
//       state.isSuccess = true;
//       state.data = payload;
//     },
//     [getItemsList.rejected]: (state, action) => {
//       state.isLoading = false;
//       state.isSuccess = false;
//       state.errorMessage = JSON.stringify(action.payload);
//     //   state.errorMessage = "error";
//     },
//   },
// });

// export default itemsSlice.reducer;