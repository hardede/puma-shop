import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductPage } from "../../types/product/productPage";
import { RootState } from "../store";

const data = "api/allProducts";

export const fetchProducts = createAsyncThunk("api/allProducts", async () => {
  try {
    const product = await axios.get(data);
    return product.data;
  } catch (e) {
    return "not success to load products";
  }
});

const initialState: ProductPage | any = {
  product: [],
  isLoading: true,
  error: null,
  productSort: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortByDefault(state, action) {
      state.productSort = action.payload;
    },
    sortByAscending(state, action) {
      const copy = action.payload.slice();
      state.productSort = copy.sort(
        (a: any, b: any) =>
          (a.sale === 0 ? a.price : a.price * (a.sale / 100)) -
          (b.sale === 0 ? b.price : b.price * (b.sale / 100))
      );
    },
    sortByDescending(state, action) {
      const copy = action.payload.slice();
      state.productSort = copy.sort(
        (a: any, b: any) =>
          (b.sale === 0 ? b.price : b.price * (b.sale / 100)) -
          (a.sale === 0 ? a.price : a.price * (a.sale / 100))
      );
    },
    sortByDiscount(state, action) {
      const copy = action.payload.slice();
      const sale = [] as any;

      copy.map((item: any) => {
        if (item.sale !== 0) {
          sale.push(item);
        }
      });
      state.productSort = sale.sort((a: any, b: any) => b.sale - a.sale);
    },
    sortBySize(state, action) {
      state.productSort = [];
      action.payload.products.map((item: any) =>
        item.sizeSelection.map((item1: any) => {
          if (item1.sizeEur === action.payload.size) {
            if (item1.sizeCountInStock > 0) {
              state.productSort.push(item);
            }
          }
        })
      );
    },
    sortByPriceRange(state, action) {
      state.productSort = action.payload.sneakers.filter(
        (item: any) =>
          (item.sale === 0 ? item.price : item.price * (item.sale / 100)) >=
            action.payload.minVal &&
          (item.sale === 0 ? item.price : item.price * (item.sale / 100)) <=
            action.payload.maxVal
      );
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled.type]: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      state.product = actions.payload;
    },
    [fetchProducts.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchProducts.rejected.type]: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const {
  sortByAscending,
  sortByDescending,
  sortByDiscount,
  sortBySize,
  sortByPriceRange,
} = productSlice.actions;

export const selectProductsState = (state: RootState) =>
  state.products.productSort;
export const selectProducts = (state: RootState) => state.products.product;
export default productSlice.reducer;
