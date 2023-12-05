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

// export const itemsActions