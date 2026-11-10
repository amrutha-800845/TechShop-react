import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",

    initialState: {
        data: []
    },

    reducers: {

        // Add product to cart
        addToCart: (state, action) => {
            const existing = state.data.find(
                (item) => item.id === action.payload.id
            );

            if (existing) {
                existing.quantity += 1;
            } else {
                state.data.push({
                    ...action.payload,
                    quantity: 1
                });
            }
        },

        // Remove product
        removeCart: (state, action) => {
            state.data = state.data.filter(
                (item) => item.id !== action.payload
            );
        },

        // Increase quantity
        increaseQuantity: (state, action) => {
            const item = state.data.find(
                (item) => item.id === action.payload
            );

            if (item) {
                item.quantity += 1;
            }
        },

        // Decrease quantity
        decreaseQuantity: (state, action) => {
            const item = state.data.find(
                (item) => item.id === action.payload
            );

            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },

        // Clear cart
        clearCart: (state) => {
            state.data = [];
        }
    }
});

export const {
    addToCart,
    removeCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;