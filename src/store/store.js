import { configureStore } from "@reduxjs/toolkit";
import { addressSlice } from "./Address/addressSlice";
import { cartSlice } from "./Cart/cartSlice";
import { categorySlice } from "./Category/categorySlice";
import { itemsSlice } from "./items/itemsSlice";


export const store = configureStore({
    reducer: {
        items: itemsSlice.reducer,
        cart: cartSlice.reducer,
        category: categorySlice.reducer,
        address: addressSlice.reducer,
    },
  });