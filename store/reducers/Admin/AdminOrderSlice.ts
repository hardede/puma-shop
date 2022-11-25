import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

const initialState = {
  ordersState: [],
  isLoading: true,
  error: null,
};

const data = `/api/admin/orders`;

export const fetchAdminOrders = createAsyncThunk("admin/orders", async () => {
  try {
    const orders = await axios.get(data);
    return orders.data;
  } catch (e) {
    return "not success to load orders";
  }
});

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAdminOrders.fulfilled.type]: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      state.ordersState = actions.payload;
    },
    [fetchAdminOrders.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchAdminOrders.rejected.type]: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const selectOrders = (state: RootState) => state.orders.ordersState;
export const selectOrdersIsLoading = (state: RootState) =>
  state.orders.isLoading;
export const selectOrdersError = (state: RootState) => state.orders.error;
export default ordersSlice.reducer;
