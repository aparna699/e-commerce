import { configureStore } from "@reduxjs/toolkit";
import { addressReducer, addressSlice } from "./Address/addressSlice";
import { cartSlice } from "./Cart/cartSlice";
import { categorySlice } from "./Category/categorySlice";
import { itemsSlice } from "./items/itemsSlice";
import { usersSlice } from "./Users/usersSlice";


export const store = configureStore({
    reducer: {
        items: itemsSlice.reducer,
        cart: cartSlice.reducer,
        category: categorySlice.reducer,
        address: addressReducer,
        users: usersSlice.reducer,
    },
  });