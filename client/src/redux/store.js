import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
import userReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    devtools: true,
  },
});
