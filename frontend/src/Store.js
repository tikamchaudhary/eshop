import { configureStore } from '@reduxjs/toolkit'
import { getAllProducts } from './redux/thunks/productThunk';
import { loadingUser } from './redux/thunks/userThunk';
import { getAllProductsSlice, getProductDetailsSlice } from './redux/slices/productSlice';
import { userSlice } from './redux/slices/userSlice';


export const Store = configureStore({
    reducer: {
        user: userSlice.reducer,
        products: getAllProductsSlice.reducer,
        productDetails: getProductDetailsSlice.reducer,
    }
});
Store.dispatch(getAllProducts());
Store.dispatch(loadingUser());