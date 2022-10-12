import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/IUser";
import { RootState } from "../store";

const initialState = {
  userState: {} as IUser,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.userState = action.payload;
      state.isAuth = true;
    },
    logout(state) {
      state.userState = {} as IUser;
      state.isAuth = false;
    },
    updatePersonInfo(state, action) {
      state.userState = action.payload;
      console.log(
        "🚀 ~ file: AuthSlice.ts ~ line 23 ~ updatePersonInfo ~ state.userState ",
        state.userState
      );
    },
    updatePassword(state, action) {
      state.userState = action.payload;
      console.log(
        "🚀 ~ file: AuthSlice.ts ~ line 29 ~ updatePassword ~ state.userState",
        state.userState
      );
    },
  },
});

export const { login, logout, updatePersonInfo, updatePassword } =
  authSlice.actions;

export const selectUserState = (state: RootState) => state.auth.userState;
export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export default authSlice.reducer;
