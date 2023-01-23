import { createSlice } from '@reduxjs/toolkit';
import { getAllProducts, getProductDetails } from '../thunks/productThunk';


export const STATUS = Object.freeze({
    LOADING: 'loading',
    SUCCEESS: 'success',
    FAILED: 'failed',
});



// Get all products
export const getAllProductsSlice = createSlice({
    name: 'getAllProducts',
    initialState: {
        data: [],
        status: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state, action) => {
            state.status = STATUS.LOADING;
        }).addCase(getAllProducts.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUS.SUCCEESS;
        }).addCase(getAllProducts.rejected, (state, action) => {
            state.status = STATUS.FAILED;
            state.error = action.payload;
        })
    }
});

// Get product details
export const getProductDetailsSlice = createSlice({
    name: "getProductDetails",
    initialState: {
        data: [],
        status: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductDetails.pending, (state, action) => {
            state.status = STATUS.LOADING;
        }).addCase(getProductDetails.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUS.SUCCEESS;
        }).addCase(getProductDetails.rejected, (state, action) => {
            state.status = STATUS.FAILED;
            state.error = action.payload;
        })
    }
});