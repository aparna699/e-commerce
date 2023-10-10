import { createSlice } from "@reduxjs/toolkit"
import createExtraActions from "./actions";
import createExtraReducers from "./reducer";


const name = 'address';
const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const addressSlice = createSlice({ 
  name, 
  initialState, 
  extraReducers 
});

// exports
export const addressActions = { ...addressSlice.actions, ...extraActions };
export const addressReducer = addressSlice.reducer;