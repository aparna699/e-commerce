import { createSlice } from "@reduxjs/toolkit"
import createExtraActions from "./actions";
import createExtraReducers from "./reducer";

const name = "auth"
const initialState = {
    data: {
        token: undefined,
        role: undefined,
        userId: undefined
    },
    
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
};

const extraActions = createExtraActions();
const extraReducers = createExtraReducers()

const authSlice = createSlice({ 
    name, 
    initialState, 
    extraReducers 
});


//export
export const authActions = { ...authSlice.actions, ...extraActions };
export const authReducer = authSlice.reducer;