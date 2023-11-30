import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../axios/api";

const initialState = {
  isLoggedIn: false,
  accessToken: null,
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
      console.log(state.accessToken);
      //   const loginObj = { isLoggedIn: true, accessToken: action.payload };
      //   localStorage.setItem("auth", JSON.stringify(loginObj));
      //   return { ...state, isLoggedIn: true, accessToken: action.payload };
      state.isLoggedIn = true;
      state.accessToken = action.payload;
    },
    logoutUser: (state, action) => {
      state.isLoggedIn = false;
    },
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

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
