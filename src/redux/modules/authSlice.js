import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../axios/authApi";

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  avatar: null,
  nickname: null,
  userId: null,
};

// export const __loginUser = createAsyncThunk(
//   "LOGIN_USER",
//   async (payload, thunkAPI) => {
//     try {
//       await authApi.post("/login", payload);
//       console.log(payload);
//       return thunkAPI.fulfillWithValue(payload);
//     } catch (error) {
//       console.log("error", error);
//     }
//   }
// );

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
    // updateAccessToken: (state, action) => {
    //   state.accessToken = action.payload;
    // },
  },
  //   extraReducers: {
  //     [__loginUser.pending]: (state, action) => {
  //       state.isLogined = false;
  //     },
  //     [__loginUser.fulfilled]: (state, action) => {
  //       state.isLogined = true;
  //       console.log(action.payload);
  //     },
  //   },
});

export const { loginUser, signUpUser, logoutUser, editUser } =
  authSlice.actions;
export default authSlice.reducer;
