import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import auth from "./reducers/AuthSlice";
import cart from "./reducers/CartSlice";
import products from "./reducers/ProductSlice";
import history from "./reducers/HistorySlice";
import summary from "./reducers/AdminSlice";
import orders from "./reducers/AdminOrderSlice";

const rootReducer = combineReducers({
  cart,
  products,
  auth,
  history,
  summary,
  orders,
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
