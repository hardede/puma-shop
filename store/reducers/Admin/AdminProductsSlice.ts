import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductPage } from "../../../types/product/productPage";
import { RootState } from "../../store";

interface StateProps {
  productsState: ProductPage[] | any;
  isLoading: boolean;
  error: null | string;
} 

const initialState: StateProps = {
  productsState: [],
  isLoading: true,
  error: null,
};

const data = `/api/admin/products`;

export const fetchAdminProducts = createAsyncThunk(
  "admin/products",
  async () => {
    try {
      const products = await axios.get(data);
      return products.data;
    } catch (e) {
      return "not success to load orders";
    }
  }
);

export const productsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAdminProducts.fulfilled.type]: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      state.productsState = actions.payload;
    },
    [fetchAdminProducts.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchAdminProducts.rejected.type]: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const selectAdminProducts = (state: RootState) =>
  state.adminProducts.productsState;
export const selectAdminProductsIsLoading = (state: RootState) =>
  state.adminProducts.isLoading;
export const selectAdminProductsError = (state: RootState) =>
  state.adminProducts.error;
export default productsSlice.reducer;
