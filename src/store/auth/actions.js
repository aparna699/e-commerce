
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

function createExtraActions() {
    return {
        logIn: logIn(),
    }

    function logIn() {
        return createAsyncThunk(
            "auth/logIn",
            async (body, { rejectWithValue }) => {
                const LOGIN_URL = '/auth';
                try {
                    const header = {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true,
                    }
                    const response = await axios.post(
                        LOGIN_URL,
                        body,
                        header
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