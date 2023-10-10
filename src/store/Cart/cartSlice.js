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

  // export const cartSlice = createSlice({
  //   name: "cart",
  //   initialState: initialState,
  //   extraReducers: {
  //     [getCartList.pending]: (state) => {
  //       state.isLoading = true;
  //     },
  //     [getCartList.fulfilled]: (state, { payload }) => {
        // state.isLoading = false;
        // state.isSuccess = true;
        // state.data = payload;
        // let price =0
        // payload.map((key) => {
        //     price = price + key.qty*(key.itemId.price)
        // })
        // state.totalPrice= price;
        // let qty=0
        // payload.map((key) => {
        //     qty = qty + key.qty;
        // })
        // state.qty = qty
  //     },
  //     [getCartList.rejected]: (state, action) => {
  //       state.isLoading = false;
  //       state.isSuccess = false;
  //       state.errorMessage = JSON.stringify(action.payload);
  //     //   state.errorMessage = "error";
  //     },
  //   },
  // });
  