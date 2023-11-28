import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "../../api/axios";

function createExtraActions() {
  return {
    getCartList: getCartList(),
    addToCart: addToCart(),
    editQty: editQty(),
    deleteCartItem: deleteCartItem()
  }

  function getCartList() {
    return createAsyncThunk(
      "cart/getCartList", 
      async (userId, { rejectWithValue }) => {
          const token = Cookies.get("token")
      try {
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
        return rejectWithValue(error.message);
      }
    }
  )
  }

  function addToCart() {
    return createAsyncThunk(
      "cart/addToCart",
      async(data, {rejectWithValue}) => {
        const token = Cookies.get("token")
        const url = "api/cart-item";
        try {
          const header = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
          const response = await axios.post(url, data, {
            headers: header,
            withCredentials: false,
          });

          return response.data
        } catch(error) {
          return rejectWithValue(error.message);
        }
      })
  }

  function editQty() {
    return createAsyncThunk(
      "cart/editQty", 
      async ({url, data}, { rejectWithValue }) => {
        const token = Cookies.get("token")
        try {
          const header = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };
          const response = await axios.put(
            url, 
            data, 
            {headers: header,
            withCredentials: true,
          });
          return response.data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      }
      
    )
  }

  function deleteCartItem() {
    return createAsyncThunk(
      "cart/deleteCartItem",
      async (url, {rejectWithValue}) => {
        const token = Cookies.get("token")
        try {
          const header = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };
          const response = await axios.delete(url , {
            headers: header,
            withCredentials: false
          })
          return response.data;
        } catch (error) {
          return rejectWithValue(error.message);
        }
      }
    )
  }
}

export default createExtraActions;