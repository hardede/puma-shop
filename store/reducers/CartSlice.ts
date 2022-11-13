import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { toast } from "react-toastify";
import { ProductPage } from "../../types/product/productPage";

const initialState: ProductPage | any = {
  cartState: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartAdd(state, action) {
      const id = action.payload.product._id;
      const itemInCart = state.cartState.find(
        (item: any) =>
          item.size === action.payload.productSize && item._id === id.toString()
      );
      if (itemInCart) {
        itemInCart.quantity === action.payload.countInStock
          ? toast.error(
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
        toast.success(`Product added to the cart`);
      }
    },
    incrementQuantity(state, action) {
      const id = action.payload._id;
      const item = state.cartState.find(
        (item: any) =>
          item.size === action.payload.size && item._id === id.toString()
      );
      item.quantity === action.payload.countInStock
        ? toast.error(
            `sorry, there are ${action.payload.countInStock} items of this size`
          )
        : item.quantity++;
    },
    decrementQuantity(state, action) {
      const id = action.payload._id;
      const item = state.cartState.find(
        (item: any) =>
          item.size === action.payload.size && item._id === id.toString()
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    cartRemove(state, action) {
      const id = action.payload._id;
      state.cartState = state.cartState.filter(
        (item: any) =>
          item._id !== id.toString() || item.size !== action.payload.size
      );
      toast.success(`Product deleted from the cart`);
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
