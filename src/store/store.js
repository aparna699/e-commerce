import { configureStore } from "@reduxjs/toolkit";
import { addressReducer } from "./Address/addressSlice";
import { authReducer } from "./auth/authSlice";
import { cartReducer } from "./Cart/cartSlice";
import { categoryReducer } from "./Category/categorySlice";
import { itemsReducer } from "./items/itemsSlice";
import { someSlice } from "./reset";
import { usersReducer } from "./Users/usersSlice";


export const store = configureStore({
    reducer: {
        items: itemsReducer,
        cart: cartReducer,
        category: categoryReducer,
        address: addressReducer,
        users: usersReducer,
        reset: someSlice.reducer,
        auth: authReducer,
    },
  });