import { createSlice } from "@reduxjs/toolkit";
import productsData from "../data/productData.js";

const productSlice = createSlice({
    name: "product",

    initialState: {
        data: productsData,
        selectedCategory: "All"
    },

    reducers: {
        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
        }
    }
});

export const { setCategory } = productSlice.actions;

export default productSlice.reducer;