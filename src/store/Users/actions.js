import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "../../api/axios";

function createExtraActions() {
    return {
        getUsersList: getUsersList(),
        getProfileInfo: getProfileInfo(),
        addUsers: addUsers(),
        deleteUser: deleteUser(),
    }

    function getUsersList() {
        return createAsyncThunk(
            "users/getUsersList", 
            async ( rejectWithValue) => {
                const token = Cookies.get("token");
                try{
                    const header = {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    };
                    const response = await axios.get(`/api/users`, {
                        headers: header,
                    });
                    return response.data;
                } catch (error) {
                    return rejectWithValue(error.message);
                }
            }
        )
    }

    function getProfileInfo() {
        return createAsyncThunk(
            "users/getProfileInfo",
            async (rejectWithValue) => {
                const userId = Cookies.get("userId");
                const token = Cookies.get("token");
                const url = `/api/users/${userId}`;
                try {
                    const header = {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    };
                    const response = await axios.get(
                        url, 
                        {headers: header,}
                    );
                    return response.data;
                } catch (error) {
                    return rejectWithValue(error.message);
                }
            }
        )
    }

    function addUsers() {
        return createAsyncThunk(
            "users/addUsers",
            async (data, { rejectWithValue }) => {
                const url = "/api/users";
                try {
                    const header = {
                        "Content-Type": "application/json",
                    };
                    const response = await axios.post(
                        url,
                        data,
                        {headers: header}
                    )
                    return response.data;
                } catch (error) {
                    return rejectWithValue(error.message);
                }
            }
        )
    }

    function deleteUser() {
        return createAsyncThunk(
            "users/deleteUser",
            async (id, { rejectWithValue }) => {
                const url = `/api/users/${id}`;
                const token = Cookies.get("token");
                try {
                    const header = {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    };
                    const response = await axios.delete(url, {
                        headers: header,
                        withCredentials: false,
                    });
                    return response.data;
                } catch (error) {
                    return rejectWithValue(error.message);
                }
            }
        )
    }
}

export default createExtraActions;

// export const getUsersList = createAsyncThunk(
//     "user/getUsersList", 
//     async ( rejectWithValue) => {
        // const token = Cookies.get("token");
        // try{
        //     const header = {
        //         Authorization: `Bearer ${token}`,
        //         "Content-Type": "application/json",
        //     };
        //     const response = await axios.get(`/api/users`, {
        //         headers: header,
        //     });
        //     return response.data;
        // } catch (error) {
        //     console.log("error: ", error);
        //     return rejectWithValue(error.message);
        //   }
//     }
// );
