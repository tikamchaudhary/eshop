import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from './productSlice';
import { forgotPassword, loadingUser, loginUser, logoutUser, registerUser, resetPassword, updatePasssword, updateProfile } from '../thunks/userThunk';


// userSlice
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: [],
        status: null,
        error: null,
        isAuthenticated: null,
    },
    reducers: {
        clearError: (state, action) => {
            state.error = null;
        },
        updateProfileReset: (state, action) => {
            // state.isUpdated = false;
            delete (state.isUpdated);
        },
        updatePasswordReset: (state, action) => {
            state.status = null;
            delete (state.isReset);
        }
    },

    extraReducers: (builder) => {
        // Register user
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

        // Login user
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

        // Loading user
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

        // Logout user
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.data = [];
            state.status = null;
            state.error = null;
            state.isAuthenticated = null;
        }).addCase(logoutUser.rejected, (state, action) => {
            state.status = STATUS.FAILED;
            state.error = action.payload;
        });

        // Update profile
        builder.addCase(updateProfile.pending, (state, action) => {
            state.status = STATUS.LOADING;
        }).addCase(updateProfile.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUS.SUCCEESS;
            state.isUpdated = action.payload.success;
        }).addCase(updateProfile.rejected, (state, action) => {
            state.status = STATUS.FAILED;
            state.error = action.payload;
        });

        // Update Password
        builder.addCase(updatePasssword.pending, (state, action) => {
            state.status = STATUS.LOADING;
        }).addCase(updatePasssword.fulfilled, (state, action) => {
            state.status = STATUS.SUCCEESS;
            state.isUpdated = action.payload.success;
        }).addCase(updatePasssword.rejected, (state, action) => {
            state.status = STATUS.FAILED;
            state.error = action.payload;
        });

        // Forgot Password
        builder.addCase(forgotPassword.pending, (state, action) => {
            state.status = STATUS.LOADING;
            state.error = null;
        }).addCase(forgotPassword.fulfilled, (state, action) => {
            state.status = STATUS.SUCCEESS;
            state.message = action.payload.message;
        }).addCase(forgotPassword.rejected, (state, action) => {
            state.status = STATUS.FAILED;
            state.error = action.payload;
        });

        // Reset Password
        builder.addCase(resetPassword.pending, (state, action) => {
            state.status = STATUS.LOADING;
            state.error = null;
        }).addCase(resetPassword.fulfilled, (state, action) => {
            state.status = STATUS.SUCCEESS;
            state.isReset = action.payload.success;
        }).addCase(resetPassword.rejected, (state, action) => {
            state.status = STATUS.FAILED;
            state.error = action.payload;
        });
    }
});

export const { clearError, updateProfileReset, updatePasswordReset } = userSlice.actions;