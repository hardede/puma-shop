import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

const initialState = {
  orderDetailsState: [] as any,
  isLoading: true,
  error: null,
};

export const fetchOrderDetails = createAsyncThunk(
  "order/id",
  async (productId: any) => {
    try {
      const orderDetails = await axios.get(`/api/orders/${productId}`);
      return orderDetails.data;
    } catch (e) {
      return "not success to load orders";
    }
  }
);

export const orderDetailsSlice = createSlice({
  name: "adminOrderDetails",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOrderDetails.fulfilled.type]: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      state.orderDetailsState = actions.payload;
    },
    [fetchOrderDetails.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchOrderDetails.rejected.type]: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const selectOrderDetails = (state: RootState) =>
  state.adminOrderDetails.orderDetailsState;
export const selectOrderDetailsIsLoading = (state: RootState) =>
  state.adminOrderDetails.isLoading;
export const selectOrderDetailsError = (state: RootState) =>
  state.adminOrderDetails.error;
export default orderDetailsSlice.reducer;
