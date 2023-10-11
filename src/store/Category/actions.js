import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "../../api/axios";

function createExtraActions() {
    return {
        getCategoryList: getCategoryList(),
        addCategory: addCategory(),
        deleteCategory: deleteCategory(),
    }

    function getCategoryList() {
        return createAsyncThunk(
            "category/getCategoryList", 
            async (rejectWithValue) => {
                try{
                    const header = {
                        "Content-Type": "application/json",
                    };
                    const response = await axios.get("/api/category", {
                        header: header,
                    });
                    return response.data;
                } catch (error) {
                    console.log("error2: ", error);
                    return rejectWithValue(error.message);
                }  
            }
            );
    }

    function addCategory() {
        return createAsyncThunk(
            "category/addCategory", 
            async (data, {rejectWithValue}) => {
                const url = '/api/category'
                const token = Cookies.get('token')
                try{
                    const header = {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                    const response = await axios.post(
                        url, 
                        data, { headers: header }
                    );
                    return response.data;
                } catch (error) {
                    return rejectWithValue(error.message);
                }  
            }
        )
    }

    function deleteCategory() {
        return createAsyncThunk(
            "category/addCategory", 
            async (url, {rejectWithValue}) => {
                const token = Cookies.get("token")
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
                    return response.data;
                } catch (error) {
                    return rejectWithValue(error.message);
                } 
            }
        )
    }
    
}

export default createExtraActions;