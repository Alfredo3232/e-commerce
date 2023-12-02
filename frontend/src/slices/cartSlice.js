import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils.js";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [] };

const cartSlice = createSlice({
    initialState,
    name     : "cart",
    reducers : {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find(el => el._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map(el => el._id === existItem._id ? item : el);
            }
            else state.cartItems = [...state.cartItems, item];

            return updateCart(state);
        }
    }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;