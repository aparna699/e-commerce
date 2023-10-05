import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const getCategoryList = createAsyncThunk(
"/getCategoryList", 
async (user, {rejectWithValue }) => {
    try{
        const header = {
            "Content-Type": "application/json",
        };
        const response = await axios.get("/api/category", {
            header: header,
        });
        return response.data;
    } catch (error) {
        console.log("error2: ", error);
        return rejectWithValue(error.message);
    }  
}
);