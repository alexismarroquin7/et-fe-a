import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance as axios } from "../../utils";

const initialState = {
  user: {},
  token: '',
  loggedIn: false,
  loading: false,
  error: {
    message: ''
  }
}

export const login = createAsyncThunk(
  'auth/login',
  async ({credentials}, { rejectWithValue }) => {
    try {
      const res = await axios().post('/auth/login', credentials);
      return res.data;
    } catch (err) {
      return rejectWithValue({error: { message: err.response.data.message} });
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.loggedIn = true;
      state.error.message = '';
      state.user = payload.user;
      state.token = payload.token;
      localStorage.setItem('token', payload.token);
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error.message = payload.error.message;
    },
  }
});