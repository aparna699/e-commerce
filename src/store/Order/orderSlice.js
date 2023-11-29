import { createSlice } from "@reduxjs/toolkit";
import createExtraActions from "./actions"
import createExtraReducers from "./reducer";

const name = "order"
const initialState = {
    isLoading: false,
    isSuccess: false,
    orderId: null,
    isOrderListLoading: false,
    isOrderListSuccess: false,
    errorMessage: "",
}

const extraActions = createExtraActions();
const extraReducers = createExtraReducers();

const orderSlice = createSlice({
    name,
    initialState,
    extraReducers
})

//export
export const orderAction = { ...orderSlice.actions, ...extraActions }
export const orderReducer = orderSlice.reducer;