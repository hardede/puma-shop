import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { History } from "../../types/history";
import { RootState } from "../store";

const data = `/api/orders/history`;

export const fetchHistory = createAsyncThunk("orders/history", async () => {
  try {
    const history = await axios.get(data);
    return history.data;
  } catch (e) {
    return "not success to load orders";
  }
});

const initialState: History | any = {
  history: [],
  isLoading: true,
  error: null,
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchHistory.fulfilled.type]: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      state.history = actions.payload;
    },
    [fetchHistory.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchHistory.rejected.type]: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const selectHistory = (state: RootState) => state.history.history;
export const selectIsLoading = (state: RootState) => state.history.isLoading;
export const selectError = (state: RootState) => state.history.error;

export default historySlice.reducer;
