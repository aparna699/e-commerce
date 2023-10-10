import { configureStore } from "@reduxjs/toolkit";
import { addressReducer } from "./Address/addressSlice";
import { cartReducer } from "./Cart/cartSlice";
import { categorySlice } from "./Category/categorySlice";
import { itemsSlice } from "./items/itemsSlice";
import { usersSlice } from "./Users/usersSlice";


export const store = configureStore({
    reducer: {
        items: itemsSlice.reducer,
        cart: cartReducer,
        category: categorySlice.reducer,
        address: addressReducer,
        users: usersSlice.reducer,
    },
  });