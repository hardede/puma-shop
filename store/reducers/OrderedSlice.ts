import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  history: [] as any,
  orderedProducts: {} as any,
};

export const orderedSlice = createSlice({
  name: "ordered",
  initialState,
  reducers: {
    ordered(state, action) {
      console.log(
        "🚀 ~ file: OrderedSlice.ts ~ line 15 ~ ordered ~ action",
        action.payload
      );
      state.history.push({
        id: uuidv4(),
        quantity: action.payload.totalQuantity,
        totalPrice: action.payload.totalPrice,
        totalPriceOld: action.payload.totalPriceOld,
        discount: action.payload.discount,
        discountString: action.payload.discountString,
        activeCard: action.payload.activeCard,
        discountByCardString: action.payload.discountByCardString,
        totalPriceWithCard: action.payload.totalPriceWithCard,
        totalPriceWithCardString: action.payload.totalPriceWithCardString,
        orderedProducts: action.payload.cartState,
      });
    },
  },
});

export const { ordered } = orderedSlice.actions;

export const selectOrderedState = (state: RootState) =>
  state.ordered.orderedProducts;
export const selectHistory = (state: RootState) => state.ordered.history;
export default orderedSlice.reducer;
