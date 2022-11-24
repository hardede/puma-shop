import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import orders from "./reducers/Admin/AdminOrderSlice";
import adminProducts from "./reducers/Admin/AdminProductsSlice";
import productEdit from "./reducers/Admin/AdminEditSlice";
import summary from "./reducers/Admin//AdminSlice";
import orderDetails from "./reducers/Admin/AdminOrderDetailsSlice";
import adminUsers from "./reducers/Admin/AdminUserSlice";
import auth from "./reducers/AuthSlice";
import cart from "./reducers/CartSlice";
import history from "./reducers/HistorySlice";
import products from "./reducers/ProductSlice";

const rootReducer = combineReducers({
  cart,
  products,
  auth,
  history,
  summary,
  orders,
  adminProducts,
  productEdit,
  orderDetails,
  adminUsers,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper(setupStore);
