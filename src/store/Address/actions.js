import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "../../api/axios";

export const getAddressLsit = createAsyncThunk(
    "user/getAddressLsit", 
    async (userId, { rejectWithValue }) => {
        const token = Cookies.get("token")
    try {
      //api call
      const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        `/api/address/user/${userId}`, {
        headers: header,
      });
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return rejectWithValue(error.message);
    }
  }
);