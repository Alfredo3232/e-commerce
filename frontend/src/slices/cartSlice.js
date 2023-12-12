import { createSlice } from "@reduxjs/toolkit";

import { updateCart } from "../utils/cartUtils.js";


const initialState = localStorage.getItem("cart") ?
    JSON.parse(localStorage.getItem("cart")) :
    {
        cartItems       : [],
        shippingAddress : {},
        paymentMethod   : "PayPal"
    };

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
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);

            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state);
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            return updateCart(state);
        }
    }
});

export const {
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCartItems
} = cartSlice.actions;
export default cartSlice.reducer;