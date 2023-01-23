import { configureStore } from '@reduxjs/toolkit'
import { getAllProducts } from './redux/thunks/productThunk';
import { loadingUser } from './redux/thunks/userThunk';
import { getAllProductsSlice, getProductDetailsSlice } from './redux/slices/productSlice';
import { register_login_loadingUserSlice } from './redux/slices/userSlice';


export const Store = configureStore({
    reducer: {
        user: register_login_loadingUserSlice.reducer,
        products: getAllProductsSlice.reducer,
        productDetails: getProductDetailsSlice.reducer,
    }
});
Store.dispatch(getAllProducts());
Store.dispatch(loadingUser());