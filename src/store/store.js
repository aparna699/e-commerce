import { configureStore } from "@reduxjs/toolkit";
import { addressReducer } from "./Address/addressSlice";
import { cartReducer } from "./Cart/cartSlice";
import { categoryReducer, categorySlice } from "./Category/categorySlice";
import { itemsSlice } from "./items/itemsSlice";
import { usersSlice } from "./Users/usersSlice";


export const store = configureStore({
    reducer: {
        items: itemsSlice.reducer,
        cart: cartReducer,
        category: categoryReducer,
        address: addressReducer,
        users: usersSlice.reducer,
    },
  });