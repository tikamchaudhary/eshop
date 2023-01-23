import { createSlice } from '@reduxjs/toolkit';
import { loadingUser, loginUser, logoutUser, registerUser } from '../thunks/userThunk';
import { STATUS } from './productSlice';


// Logon_Register_LoadingUser  slice
export const register_login_loadingUserSlice = createSlice({
    name: 'register_login_loadingUserSlice',
    initialState: {
        data: [],
        status: null,
        error: null,
        isAuthenticated: null,
    },
    reducers: {
        clearError: (state, action) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(registerUser.pending, (state, action) => {
            state.data = [];
            state.status = STATUS.LOADING;
            state.error = null;
            state.isAuthenticated = false;
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUS.SUCCEESS;
            state.error = null;
            state.isAuthenticated = true;
        }).addCase(registerUser.rejected, (state, action) => {
            state.data = [];
            state.status = STATUS.FAILED;
            state.error = action.payload;
            state.isAuthenticated = false;
        });

        builder.addCase(loginUser.pending, (state, action) => {
            state.data = [];
            state.status = STATUS.LOADING;
            state.error = null;
            state.isAuthenticated = false;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUS.SUCCEESS;
            state.error = null;
            state.isAuthenticated = true;
        }).addCase(loginUser.rejected, (state, action) => {
            state.data = [];
            state.status = STATUS.FAILED;
            state.error = action.payload;
            state.isAuthenticated = false;
        });

        builder.addCase(loadingUser.pending, (state, action) => {
            state.data = [];
            state.status = STATUS.LOADING;
            state.error = null;
            state.isAuthenticated = false;
        }).addCase(loadingUser.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUS.SUCCEESS;
            state.isAuthenticated = true;
        }).addCase(loadingUser.rejected, (state, action) => {
            state.data = [];
            state.status = STATUS.FAILED;
            // state.error = action.payload;
            state.isAuthenticated = false;
        });


        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.data = [];
            state.status = null;
            state.error = null;
            state.isAuthenticated = null;
        }).addCase(logoutUser.rejected, (state, action) => {
            state.status = STATUS.FAILED;
            state.error = action.payload;
        });
    }
});

export const { clearError } = register_login_loadingUserSlice.actions;