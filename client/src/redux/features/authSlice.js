import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register, logOut, login } from "./authService";


const user = JSON.parse(localStorage.getItem("user"));

//?Register
export const registerAsyncThunk = createAsyncThunk(
  `user/registerAsyncThunk`,
  async (userData, thunkAPI) => {
    try {
      const { password, confirmPassword } = userData;
      if (password !== confirmPassword) {
        return thunkAPI.rejectWithValue("Passwords do not match");
      }
      return await register(userData);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const loginAsyncThunk = createAsyncThunk(
  `user/loginAsyncThunk`,
  async (userData, thunkAPI) => {
    try {
      console.log(userData);
      return await login(userData);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
export const logOutAsyncThunk = createAsyncThunk(
  `auth/logOutAsyncThunk`,
  async () => {
    await logOut();
  },
);
const authSlice = createSlice({
  name: "user",
  initialState: {
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {
    reset: state => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: builder => {
    builder.addCase(registerAsyncThunk.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(registerAsyncThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(registerAsyncThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    });
    builder.addCase(loginAsyncThunk.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(loginAsyncThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    });
    builder.addCase(logOutAsyncThunk.fulfilled, state => {
      state.user = null;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
