import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "../../api/axios";
import createExtraActions, {   addAddressList, addUserAddress, getAddressLsit, getAllAddress } from "./actions";


const name = 'address';
const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};
const extraActions = createExtraActions();
// const extraActions = extraActionsAddress();
const extraReducers = createExtraReducers();
const addressSlice = createSlice({ name, initialState, extraReducers });

// exports
export const addressActions = { ...addressSlice.actions, ...extraActions };
export const addressReducer = addressSlice.reducer;

// implementation

// function createInitialState() {
//   return {
//     data: [],
//     isLoading: false,
//     isSuccess: false,
//     errorMessage: "",
//   }
// }

// function createExtraActions() {
//   return {
//     getAllAddress: getAllAddress(),
//     addUserAddress: addUserAddress()
//   };

//   // function getAllAddress()  {
//   //   return createAsyncThunk(
//   //     "address/getAddressLsit", 
//   //     async (userId, { rejectWithValue }) => {
//   //       const token = Cookies.get("token")
//   //       try {
//   //         //api call
//   //         const header = {
//   //           Authorization: `Bearer ${token}`,
//   //           "Content-Type": "application/json",
//   //         };
//   //         const response = await axios.get(
//   //           `/api/address/user/${userId}`, {
//   //           headers: header,
//   //         });
//   //         return response.data;
//   //       } catch (error) {
//   //         console.log("error: ", error);
//   //         return rejectWithValue(error.message);
//   //       }
//   //     }
//   //   );
//   // }


//   // function addUserAddress() {
//   //   return createAsyncThunk(
//   //     "address/addAddressList",
//   //     async(data, {rejectWithValue}) => {
//   //       try{
//   //         const token = Cookies.get("token")
//   //         const header = {
//   //           Authorization: `Bearer ${token}`,
//   //           "Content-Type": "application/json",
//   //         };
    
//   //         const response = await axios.post(
//   //           '/api/address',
//   //           data,
//   //           { headers: header }
//   //         );
    
//   //         return response.data
    
//   //       } catch (error) {
//   //         return rejectWithValue(error.message);
//   //       }
//   //     }
//   //   )
//   // }
// }

function createExtraReducers() {
  return (builder) => {
    getAllAddress();
    addUserAddress();

    function getAllAddress() {
      var { pending, fulfilled, rejected } = extraActions.getAllAddress;
      builder
        .addCase(pending, (state) => {
                  state.isLoading = true
        })
        .addCase(fulfilled, (state, { payload }) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.data = payload;
        })
        .addCase(rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.errorMessage = action;
        })
    }

    function addUserAddress() {
      var { pending, fulfilled, rejected } = extraActions.addUserAddress;

      builder
        .addCase(pending, (state) => {
          state.isLoading = true; 
        })
        .addCase(fulfilled, (state, { payload }) => {
          state.isLoading = false;
          state.isSuccess = true;
        })
        .addCase(rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.errorMessage = action;
        })
    }
  }
}

// const initialState = {
//     data: [],
//     isLoading: false,
//     isSuccess: false,
//     errorMessage: "",
// };

// export const addressSlice = createSlice({
//     name: "address",
//     initialState: initialState,
//     extraReducers: {
//       [getAddressLsit.pending]: (state) => {
//         state.isLoading = true;
//       },
//       [getAddressLsit.fulfilled]: () => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.data = payload;
//       },
//       [getAddressLsit.rejected]: (state, action) => {
        // state.isLoading = false;
        // state.isSuccess = false;
        // state.errorMessage = action;
//       },
//       // //add
//       // [addAddressList.pending]: (state) => {
//       //   state.isLoading = true; 
//       //   // state.data = state.data
//       // },
//       // [addAddressList.fulfilled]: (state, {payload}) => {
//       //   state.isLoading = false;
//       //   state.isSuccess = true;
//       //   // state.data = [...state.data, payload]
//       // },
//       // [addAddressList.rejected]: (state, action) => {
//       //   state.isLoading = false;
//       //   state.isSuccess = false;
//       //   state.errorMessage = action;
//       // }
//     },
// })