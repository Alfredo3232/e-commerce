import { createSlice } from "@reduxjs/toolkit";


const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [] };

const cartSlice = createSlice({
    initialState,
    name     : "cart",
    reducers : {}
});

export default cartSlice.reducer;