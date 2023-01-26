import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";



// Register user
export const registerUser = createAsyncThunk('registerUser', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`http://localhost:4000/api/register`, formData, { withCredentials: true, credentials: 'include' });
        return response.data;
    } catch (error) {
        // return custom error message from backend if present
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
});

// Login user
export const loginUser = createAsyncThunk('loginUser', async (loginInput, { rejectWithValue }) => {
    try {

        const response = await axios.post(`http://localhost:4000/api/login`, loginInput, { withCredentials: true, credentials: 'include' });
        return response.data;
    } catch (error) {
        // return custom error message from backend if present
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        } else {
            return rejectWithValue(error.message)
        }
    }
});

// Loading user
export const loadingUser = createAsyncThunk('loadingUser', async (_, thunkAPI) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/me`, { withCredentials: true, credentials: 'include' });

        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue((error.response && error.response.data.message) ? (error.response.data.message) : (error.message));
    }
});

// Logout user
export const logoutUser = createAsyncThunk('logoutUser', async (_, thunkAPI) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/logout`, { withCredentials: true, credentials: 'include' });

        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue((error.response && error.response.data.message) ? (error.response.data.message) : (error.message));
    }
});

// Update profile
export const updateProfile = createAsyncThunk('updateProfile', async (formData, thunkAPI) => {
    try {
        const response = await axios.put(`http://localhost:4000/api/me/update`, formData, { withCredentials: true, credentials: 'include' });

        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue((error.response && error.response.data.message) ? (error.response.data.message) : (error.message));
    }
});