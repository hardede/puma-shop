import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

const initialState = {
  productEditState: [] as any,
  isLoading: true,
  error: null,
};

export const fetchData123 = createAsyncThunk(
  "admin/products/id",
  async (productId: any) => {
    try {
      const data123 = await axios.get(`/api/admin/products/${productId}`);
      return data123.data;
    } catch (e) {
      return "not success to load orders";
    }
  }
);

export const productEditSlice = createSlice({
  name: "adminProductEdit",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchData123.fulfilled.type]: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      state.productEditState = actions.payload;
    },
    [fetchData123.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchData123.rejected.type]: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const selectEdit = (state: RootState) =>
  state.adminProductEdit.productEditState;
export const selectEditIsLoading = (state: RootState) =>
  state.adminProductEdit.isLoading;
export const selectEditError = (state: RootState) => state.adminProductEdit.error;
export default productEditSlice.reducer;
