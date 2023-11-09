import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

function createExtraActions() {
    return {
        createPaymentIntent: createPaymentIntent(),
    }

    function createPaymentIntent() {
        return createAsyncThunk(
            "payment/createPaymentIntent",
            async (body, {rejectWithValue}) => {
                try {
                    const header = {
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