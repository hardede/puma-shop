import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../../types/IUser";
import { RootState } from "../../store";

interface StateProps {
  userToEditState: IUser | any;
  isLoading: boolean;
  error: null | string;
} 

const initialState: StateProps = {
  userToEditState: {},
  isLoading: true,
  error: null,
};

export const userToEdit = createAsyncThunk(
  "admin/users/id",
  async (userId: any) => {
    try {
      const userEdit = await axios.get(`/api/admin/users/${userId}`);
      return userEdit.data;
    } catch (e) {
      return "not success to load orders";
    }
  }
);

export const userEditSlice = createSlice({
  name: "adminUsersEdit",
  initialState,
  reducers: {},
  extraReducers: {
    [userToEdit.fulfilled.type]: (state, actions) => {
      state.isLoading = false;
      state.error = null;
      state.userToEditState = actions.payload;
    },
    [userToEdit.pending.type]: state => {
      state.isLoading = true;
    },
    [userToEdit.rejected.type]: (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    },
  },
});

export const selectUserEdit = (state: RootState) =>
  state.adminUsersEdit.userToEditState;
export const selectUserEditIsLoading = (state: RootState) =>
  state.adminUsersEdit.isLoading;
export const selectUserEditError = (state: RootState) =>
  state.adminUsersEdit.error;
export default userEditSlice.reducer;
