import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { History } from "../../../types/history";
import { RootState } from "../../store";

interface StateProps {
  ordersState: History[] | any;
  isLoading: boolean;
  error: null | string;
} 

const initialState: StateProps = {
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
  name: "adminOrders",
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

export const selectOrders = (state: RootState) => state.adminOrders.ordersState;
export const selectOrdersIsLoading = (state: RootState) => state.adminOrders.isLoading;
export const selectOrdersError = (state: RootState) => state.adminOrders.error;
export default ordersSlice.reducer;
