import Cookies from "js-cookie";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

function createExtraActions() {
    return {
        createOrder: createOrder(),
        createOrderLine: createOrderLine()
    }

    function createOrder() {
        return createAsyncThunk(
            "order/createOrder",
            async (body, { rejectWithValue }) => {
                const token = Cookies.get("token")
                const url = "api/order";
                try {
                    const header = {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                    const response = await axios.post(
                        url, 
                        body, {
                        headers: header,
                        withCredentials: false,
                    });
                    return response.data;
                } catch(error) {
                    return rejectWithValue(error.message);
                }
            }
        )
    }

    function createOrderLine() {
        return createAsyncThunk(
            "order/createOrderLine",
            async (arr, {rejectWithValue}) => {
                const token = Cookies.get("token")
                const url = "api/order-line";
                try {
                    const header = {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                    const response = await axios.post(
                        url, 
                        arr, {
                        headers: header,
                        withCredentials: false,
                    });
                    return response.data;
                } catch(error) {
                    return rejectWithValue(error.message);
                }
            }
        )
    }
}

export default createExtraActions;