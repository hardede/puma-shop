import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const initialState = {
  summaryState: [] as any,
  isLoading: false,
  error: null,
};

const data = `/api/admin/summary`;

export const fetchSummary = createAsyncThunk("admin/summary", async () => {
  try {
    const summary = await axios.get(data);
    console.log(
      "🚀 ~ file: AdminSlice.ts ~ line 17 ~ fetchSummary ~ summary",
      summary.data
    );
    return summary.data;
  } catch (e) {
    return "not success to load orders";
  }
});

export const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSummary.fulfilled.type]: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      state.summaryState = actions.payload;
    },
    [fetchSummary.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchSummary.rejected.type]: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const selectSummary = (state: RootState) => state.summary.summaryState;
export const selectSummaryIsLoading = (state: RootState) => state.summary.isLoading;
export const selectSummaryError = (state: RootState) => state.summary.error;
export default summarySlice.reducer;
