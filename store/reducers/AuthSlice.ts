import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../types/IUser";
import { RootState } from "../store";

interface StateProps {
  userState: IUser | any;
  isLoading: boolean;
  error: null | string;
} 

const initialState: StateProps = {
  userState: {} as IUser,
  isLoading: true,
  error: null,
};

const data = `/api/user`;

export const fetchUser = createAsyncThunk("user/userFind", async () => {
  try {
    const userFind = await axios.get(data);
    return userFind.data;
  } catch (e) {
    return "not success to load orders";
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchUser.fulfilled.type]: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      state.userState = actions.payload;
    },
    [fetchUser.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchUser.rejected.type]: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const selectUserState = (state: RootState) => state.auth.userState;
export default authSlice.reducer;
