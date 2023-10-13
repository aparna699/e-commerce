import { createSlice } from "@reduxjs/toolkit"
import createExtraActions from "./actions";
import createExtraReducers from "./reducer";

const name = "users"
const initialState = {
    data: [],
    user:{},
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
};

const extraActions = createExtraActions();
const extraReducers = createExtraReducers();

const usersSlice = createSlice({ 
  name, 
  initialState, 
  extraReducers 
});

//export
export const usersActions = { ...usersSlice.actions, ...extraActions };
export const usersReducer = usersSlice.reducer;