import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "../../api/axios";

function createExtraActions() {
  return {
    getItemsList: getItemsList(),
    addItems: addItems(),
    editItems: editItems(),
    deleteItems: deleteItems(),
  }

  function getItemsList() {
    return createAsyncThunk(
      "items/getItemsList",
      async (url, { rejectWithValue }) => {
        try {
          const header = {
            "Content-Type": "application/json",
          };
          const response = await axios.get(
            url, 
            {headers: header}
          );
          return response.data
        } catch (error) {
          return rejectWithValue(error.message);
        }
      }
    )
  }

  function addItems() {
    return createAsyncThunk(
      "items/addItems",
      async (data, { rejectWithValue }) => {
        const url = "/api/items";
        try {
          const header = {
            "Content-Type": "application/json",
          };
          const response = await axios.post(
            url, 
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

  function editItems() {
    return createAsyncThunk(
      "items/editItems",
      async ({itemId, data}, { rejectWithValue }) => {
        const token = Cookies.get("token");
        const url = `/api/items/${itemId}`;
        try {
          const header = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };
          const response = await axios.put(
            url, 
            data, {
            headers: header,
            withCredentials: true,
          });
        } catch (error) {
          return rejectWithValue(error.message);
        }
      }
    )
  }

  function deleteItems() {
    return createAsyncThunk(
      "items/deleteItems",
      async (itemId, { rejectWithValue }) => {
        const token = Cookies.get("token");
        const url = `/api/items/${itemId}`;
        try {
          const header = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };
          const response = await axios.delete(
            url , {
            headers: header,
            withCredentials: false
          });
          return response.data
        } catch (error) {
          return rejectWithValue(error.message);
        }
      }
    )
  }
}

export default createExtraActions;