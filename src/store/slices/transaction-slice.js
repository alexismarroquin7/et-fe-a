import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWithAuth as axios, parseQuery } from "../../utils";

const initialState = {
  loading: false,
  error: {
    message: ''
  },
  list: [],
  item: {
    id: null
  }
}

export const findAll = createAsyncThunk(
  'transaction/findAll',
  async ({ sortBy = 'date', dir = 'desc', userUUID = '', date_after = '', date_before = '' }, { rejectWithValue }) => {
    const q = parseQuery({ sortBy, dir, userUUID, date_after, date_before});
    try {
      const res = await axios().get(`/transactions${q}`);
      return { transactions: res.data.results };
    } catch (err) {
      return rejectWithValue({
        error: {
          message: err.response.data.message
        } 
      });
    }
  }
);

export const create = createAsyncThunk(
  'transaction/create',
  async (newTransaction, { rejectWithValue }) => {
    try {
      const res = await axios().post(`/transactions`, newTransaction);
      return { newTransaction: res.data };
    } catch (err) {
      return rejectWithValue({
        error: {
          message: err.response.data.message
        } 
      });
    }
  }
);

export const findByTransactionId = createAsyncThunk(
  'transaction/findByTransactionId',
  async (transaction_id, { rejectWithValue }) => {
    try {
      const res = await axios().get(`/transactions/${transaction_id}`);
      return { transaction: res.data };
    } catch (err) {
      return rejectWithValue({
        error: {
          message: err.response.data.message
        } 
      });
    }
  }
);

export const deleteByTransactionId = createAsyncThunk(
  'transaction/deleteByTransactionId',
  async (transaction_id, { rejectWithValue }) => {
    try {
      const res = await axios().delete(`/transactions/${transaction_id}`);
      return { transaction: res.data };
    } catch (err) {
      return rejectWithValue({
        error: {
          message: err.response.data.message
        } 
      });
    }
  }
)

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: {
    [findAll.pending]: (state) => {
      state.loading = true;
      state.error.message = '';
    },
    [findAll.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.list = payload.transactions;
      state.error.message = '';
    },
    [findAll.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error.message = payload.error.message;
    },
    [create.pending]: (state) => {
      state.loading = true;
      state.error.message = '';
    },
    [create.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error.message = '';
      state.list = [
        ...state.list,
        payload.newTransaction
      ];
    },
    [create.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error.message = payload.error.message;
    },
    [findByTransactionId.pending]: (state) => {
      state.loading = true;
      state.error.message = '';
      state.item = initialState.item;
    },
    [findByTransactionId.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error.message = '';
      state.item = { ...payload.transaction };
    },
    [findByTransactionId.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error.message = payload.error.message;
    },
    [deleteByTransactionId.pending]: (state) => {
      state.loading = true;
      state.error.message = '';
    },
    [deleteByTransactionId.fulfilled]: (state, { payload }) => {
      state.loading = true;
      state.error.message = '';
      state.list = state.list.filter(item => item.id !== payload.transaction.id);
    },
    [deleteByTransactionId.rejected]: (state, { payload }) => {
      state.loading = true;
      state.error.message = payload.error.message;
    }
  }
});