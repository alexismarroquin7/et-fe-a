import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWithAuth as axios, parseQuery } from "../../utils";

const initialState = {
  loading: false,
  error: {
    message: ''
  },
  list: []
}

export const findAll = createAsyncThunk(
  'transaction/findAll',
  async ({ sortBy = 'date', dir = 'desc', userUUID = '', date_after, date_before }, { rejectWithValue }) => {
    try {
      const res = await axios().get(`/transactions${parseQuery({ sortBy, dir, userUUID, date_after, date_before})}`);
      return { transactions: res.data.results };
    } catch (err) {
      return rejectWithValue({error: { message: err.response.data.message} });
    }
  }
);

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {

  },
  extraReducers: {
    [findAll.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [findAll.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.list = payload.transactions;
    },
    [findAll.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error.message = payload.error.message;
    },
  }
});