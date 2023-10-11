import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

function createExtraActions() {
    return {
        getCategoryList: getCategoryList(),

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
}

export default createExtraActions;