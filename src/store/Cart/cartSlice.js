import { createSlice } from "@reduxjs/toolkit";
import createExtraActions, { getCartList } from "./actions";
import createExtraReducers from "./reducer";

const name = 'cart';
const initialState = {
  data: [],
  qty: null,
  totalPrice: 0,
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

const extraActions = createExtraActions();
const extraReducers = createExtraReducers();

const cartSlice = createSlice({ 
  name, 
  initialState, 
  extraReducers 
});

//export
export const cartActions = { ...cartSlice.actions, ...extraActions };
export const cartReducer = cartSlice.reducer;
