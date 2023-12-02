import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  avatar: null,
  nickname: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.avatar = action.payload.avatar;
      state.nickname = action.payload.nickname;
      state.userId = action.payload.userId;
    },
    signUpUser: (state, action) => {
      state.isLoggedIn = true;
    },
    logoutUser: (state, action) => {
      state.isLoggedIn = false;
      state.accessToken = "";
      state.avatar = "";
      state.nickname = "";
      state.userId = "";
    },
    editUser: (state, action) => {
      state.avatar = action.payload.avatar;
      state.nickname = action.payload.nickname;
    },
  },
});

export const { loginUser, signUpUser, logoutUser, editUser } =
  authSlice.actions;
export default authSlice.reducer;
