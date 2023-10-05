import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./Cart/cartSlice";
import { itemsSlice } from "./items/itemsSlice";


export const store = configureStore({
    reducer: {
        items: itemsSlice.reducer,
        cart: cartSlice.reducer,
    },
  });