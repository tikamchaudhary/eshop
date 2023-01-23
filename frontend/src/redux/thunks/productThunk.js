import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";


// Get all products
export const getAllProducts = createAsyncThunk('getAllProducts', async (filterOptions, { rejectWithValue }) => {

    let name = filterOptions?.name ? filterOptions.name : "";
    let page = filterOptions?.currentPage ? filterOptions.currentPage : 1;
    let price = filterOptions?.price ? filterOptions.price : [1, 100000];
    let ratings = filterOptions?.ratings ? filterOptions.ratings : 0;
    try {
        let link = `http://localhost:4000/api/products?name=${name}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

        if (filterOptions?.category) {
            link = `http://localhost:4000/api/products?name=${name}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${filterOptions.category}&ratings[gte]=${ratings}`
        }
        const response = await axios.get(link);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


// Get product details
export const getProductDetails = createAsyncThunk('getProductDetails', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/product/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});