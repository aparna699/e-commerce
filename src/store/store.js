import { configureStore } from "@reduxjs/toolkit";
import { addressSlice } from "./Address/addressSlice";
import { cartSlice } from "./Cart/cartSlice";
import { categorySlice } from "./Category/categorySlice";
import { itemsSlice } from "./items/itemsSlice";
import { usersSlice } from "./Users/usersSlice";


export const store = configureStore({
    reducer: {
        items: itemsSlice.reducer,
        cart: cartSlice.reducer,
        category: categorySlice.reducer,
        address: addressSlice.reducer,
        users: usersSlice.reducer,
    },
  });