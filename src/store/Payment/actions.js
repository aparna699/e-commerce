import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "../../api/axios";

function createExtraActions() {
    return {
        createPaymentIntent: createPaymentIntent(),
    }

    function createPaymentIntent() {
        return createAsyncThunk(
            "payment/createPaymentIntent",
            async (body, {rejectWithValue}) => {
                const token = Cookies.get("token");
                try {
                    const header = {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    };
                    const response = await axios.post(
                        `/create-payment-intent`, 
                        JSON.stringify(body),
                        { headers: header }
                    );
                    return response.data;
                } catch(error) {
                    return rejectWithValue(error.message); 
                }
            }
        )
    }
}
export default createExtraActions;