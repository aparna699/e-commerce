import { configureStore } from "@reduxjs/toolkit";
import { addressReducer } from "./Address/addressSlice";
import { cartReducer } from "./Cart/cartSlice";
import { categoryReducer, categorySlice } from "./Category/categorySlice";
import { itemsReducer, itemsSlice } from "./items/itemsSlice";
import { someSlice } from "./reset";
import { usersSlice } from "./Users/usersSlice";


export const store = configureStore({
    reducer: {
        items: itemsReducer,
        cart: cartReducer,
        category: categoryReducer,
        address: addressReducer,
        users: usersSlice.reducer,
        reset: someSlice.reducer,
    },
  });