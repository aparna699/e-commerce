import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "../../api/axios";

export const getUsersList = createAsyncThunk(
    "user/getUsersList", 
    async ( rejectWithValue) => {
        const token = Cookies.get("token");
        try{
            const header = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            };
            const response = await axios.get(`/api/users`, {
                headers: header,
            });
            return response.data;
        } catch (error) {
            console.log("error: ", error);
            return rejectWithValue(error.message);
          }
    }
);