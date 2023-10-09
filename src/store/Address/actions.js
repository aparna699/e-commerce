import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "../../api/axios";

function createExtraActions() {
  return {
    getAllAddress: getAllAddress(),
    addUserAddress: addUserAddress()
  };

   function getAllAddress()  {
    return createAsyncThunk(
      "address/getAddressLsit", 
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
  }


   function addUserAddress() {
    return createAsyncThunk(
      "address/addAddressList",
      async(data, {rejectWithValue}) => {
        try{
          const token = Cookies.get("token")
          const header = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };
    
          const response = await axios.post(
            '/api/address',
            data,
            { headers: header }
          );
    
          return response.data
    
        } catch (error) {
          return rejectWithValue(error.message);
        }
      }
    )
  }
}

export default createExtraActions;