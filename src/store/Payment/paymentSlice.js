import { createSlice } from "@reduxjs/toolkit";
import createExtraActions from "./actions"
import createExtraReducers from "./reducer"

const name = "payment"
const initialState = {
    data: [],
    clientSecret: "",
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
}

const extraActions = createExtraActions();
const extraReducers = createExtraReducers();

const paymentSlice = createSlice({
    name,
    initialState,
    extraReducers
});

//export 
export const paymentAction = { ...paymentSlice, ...extraActions};
export const paymentReducer = paymentSlice.reducer;