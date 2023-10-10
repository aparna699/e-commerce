import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "../../api/axios";

function createExtraActions() {
  return {
    getCartList: getCartList(),
  }

  function getCartList() {
    return createAsyncThunk(
      "cart/getCartList", 
      async (userId, { rejectWithValue }) => {
          const token = Cookies.get("token")
      try {
        //api call
        console.log("getCart", userId);
        const url = `/api/cart-item/user/${userId}`;
        const header = {
          Authorization: `Bearer ${token}`,
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
  )
  }
}

export default createExtraActions;

// export const getCartList = createAsyncThunk(
//     "user/getCartList", 
//     async (userId, { rejectWithValue }) => {
//         const token = Cookies.get("token")
//     try {
//       //api call
//       console.log("getCart", userId);
//       const url = `/api/cart-item/user/${userId}`;
//       const header = {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       };
//       const response = await axios.get(url, {
//         headers: header,
//       });
//       return response.data;
//     } catch (error) {
//       console.log("error: ", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );
