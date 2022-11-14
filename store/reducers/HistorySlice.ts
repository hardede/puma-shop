import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const data = `/api/orders/history`;

export const fetchOrders = createAsyncThunk("orders/history", async () => {
  try {
    const history = await axios.get(data);
    return history.data;
  } catch (e) {
    return "not success to load orders";
  }
});

const initialState = {
  history: [],
  isLoading: false,
  error: null,
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOrders.fulfilled.type]: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      state.history = actions.payload;
    },
    [fetchOrders.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchOrders.rejected.type]: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const selectHistory = (state: RootState) => state.history.history;
export const selectIsLoading = (state: RootState) => state.history.isLoading;
export const selectError = (state: RootState) => state.history.error;

export default historySlice.reducer;
