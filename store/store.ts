import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { createWrapper } from "next-redux-wrapper";
import auth from "./reducers/AuthSlice";
import cart from "./reducers/CartSlice";
import products from "./reducers/ProductSlice";
import ordered from "./reducers/OrderedSlice";
import history from "./reducers/HistorySlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

export const rootReducer = combineReducers({
  cart,
  products,
  auth,
  ordered,
  history
});
const persistConfig = {
  key: "root",
  storage,
  // whiteList: ["cart", "products", "auth", "ordered"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const setupStore: any = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: customizedMiddleware,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
export const wrapper = createWrapper<AppStore>(setupStore);
