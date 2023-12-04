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
      const { accessToken, avatar, nickname, userId } = action.payload;
      state.isLoggedIn = true;
      state.accessToken = accessToken;
      state.avatar = avatar;
      state.nickname = nickname;
      state.userId = userId;
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
      const { avatar, nickname } = action.payload;
      state.avatar = avatar;
      state.nickname = nickname;
    },
  },
});

export const { loginUser, signUpUser, logoutUser, editUser } =
  authSlice.actions;
export default authSlice.reducer;
