import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../../types/IUser";
import { RootState } from "../../store";

interface StateProps {
  adminUsers: IUser | any;
  isLoading: boolean;
  error: null | string;
} 

const initialState: StateProps = {
  adminUsers: [],
  isLoading: true,
  error: null,
};

const data = `/api/admin/users`;

export const fetchAdminUsers = createAsyncThunk("admin/users", async () => {
  try {
    const findUsers = await axios.get(data);
    return findUsers.data;
  } catch (e) {
    return "not success to load orders";
  }
});

export const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAdminUsers.fulfilled.type]: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      state.adminUsers = actions.payload;
    },
    [fetchAdminUsers.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchAdminUsers.rejected.type]: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const selectAdminUsers = (state: RootState) =>
  state.adminUsers.adminUsers;
export const selectAdminUsersIsLoading = (state: RootState) =>
  state.adminUsers.isLoading;
export const selectAdminUsersError = (state: RootState) =>
  state.adminUsers.error;
export default adminUsersSlice.reducer;
