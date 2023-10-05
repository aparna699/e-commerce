import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const getItemsList = createAsyncThunk("user/getItemsList", async (url, { rejectWithValue }) => {
    try {
      //api call
      console.log("getItems", url);
      const header = {
        // Authorization not required
        "Content-Type": "application/json",
      };
      const response = await axios.get(url, {
        headers: header,
      });
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return rejectWithValue(error.message);
    }
  }
);
