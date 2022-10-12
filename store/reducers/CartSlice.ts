import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/product";
import { RootState } from "../store";

const initialState: Product | any = {
  cartState: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartAdd(state, action) {
      const id = action.payload.product.id;
      const itemInCart = state.cartState.find(
        (item: any) =>
          item.size === action.payload.productSize && item.id === id.toString()
      );
      if (itemInCart) {
        itemInCart.quantity === action.payload.countInStock
          ? alert(
              `sorry, there are ${action.payload.countInStock} items of this size`
            )
          : itemInCart.quantity++;
      } else {
        state.cartState.push({
          ...action.payload.product,
          quantity: 1,
          size: action.payload.productSize,
          countInStock: action.payload.countInStock,
        });
      }
    },
    incrementQuantity(state, action) {
      const id = action.payload.id;
      const item = state.cartState.find(
        (item: any) =>
          item.size === action.payload.size && item.id === id.toString()
      );
      item.quantity === action.payload.countInStock
        ? alert(
            `sorry, there are ${action.payload.countInStock} items of this size`
          )
        : item.quantity++;
    },
    decrementQuantity(state, action) {
      const id = action.payload.id;
      const item = state.cartState.find(
        (item: any) =>
          item.size === action.payload.size && item.id === id.toString()
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    cartRemove(state, action) {
      const id = action.payload.id;
      state.cartState = state.cartState.filter(
        (item: any) =>
          item.id !== id.toString() || item.size !== action.payload.size
      );
    },
    cartDeleteAll(state) {
      state.cartState = [];
    },
  },
});

export const {
  cartAdd,
  cartRemove,
  cartDeleteAll,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export const selectCartState = (state: RootState) => state.cart.cartState;

export default cartSlice.reducer;
