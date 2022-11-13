import { createSlice } from "@reduxjs/toolkit";
import { ProductPage } from "../../types/product/productPage";
import { RootState } from "../store";

const initialState: ProductPage | any = {
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
      console.log(
        "🚀 ~ file: ProductSlice.ts ~ line 18 ~ sortByAscending ~ action.payload",
        action.payload
      );

      state.productSort = copy.sort(
        (a: any, b: any) => a.newPrice - b.newPrice
      );
    },
    sortByDescending(state, action) {
      const copy = action.payload.slice();

      state.productSort = copy.sort(
        (a: any, b: any) => b.newPrice - a.newPrice
      );
    },
    sortByDiscount(state, action) {
      const copy = action.payload.slice();
      const sale = [] as any;

      copy.map((item: any) => {
        if (item.hasOwnProperty("sale")) {
          sale.push(item);
        }
      });
      state.productSort = sale.sort((a: any, b: any) => a.sale - b.sale);
    },
    sortBySize(state, action) {
      state.productSort = [];
      action.payload.sneakers.map((item: any) =>
        item.sizeSelection.map((item1: any) => {
          if (item1.sizeEur === action.payload.size) {
            if (item1.sizeCountInStock > 0) {
              state.productSort.push(item);
              console.log(
                "🚀 ~ file: ProductSlice.ts ~ line 51 ~ item.sizeSelection.map ~ item",
                state.productSort
              );
            }
          }
        })
      );
    },
    sortByPriceRange(state, action) {
      state.productSort = action.payload.sneakers.filter(
        (sneaker: any) =>
          sneaker.newPrice >= action.payload.minVal &&
          sneaker.newPrice <= action.payload.maxVal
      );
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
export default productSlice.reducer;
