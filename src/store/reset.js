import { createSlice,createAction } from "@reduxjs/toolkit"
export const revertAll = createAction('REVERT_ALL')

const initialState = {};
export const someSlice = createSlice({
  name: 'reset',
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, (state) => state = initialState),
  reducers: {}
});