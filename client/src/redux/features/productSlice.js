import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';
import { data } from '../../data';
import { API_URL } from '../../api'

const uniqueProducts = {};

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const password = 'Valantis';
      const passwordHash = CryptoJS.MD5(`${password}_${timestamp}`).toString();
      const requestBody = {
        action: 'get_items',
        params: { ids: data },
      };
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': passwordHash,
        },
        body: JSON.stringify(requestBody),
      };

      let response = await fetch(API_URL, requestOptions);
      let retryCount = 0;

      while (!response.ok && retryCount < 3) {
        console.error('Failed to fetch data. Retrying...');
        response = await fetch(API_URL, requestOptions);
        retryCount++;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const responseData = await response.json();

      responseData.result.forEach(product => {
        if (!uniqueProducts.hasOwnProperty(product.id)) {
          uniqueProducts[product.id] = product;
        }
      });

      return Object.values(uniqueProducts);
    } catch (error) {
      console.error('Error:', error);
      return rejectWithValue('Failed to fetch data');
    }
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    loading: false,
    error: null,
    goods: []

  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.goods = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
