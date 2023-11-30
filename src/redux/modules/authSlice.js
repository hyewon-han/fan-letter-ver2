import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogined: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLogined = true;
    },
    logoutUser: (state, action) => {
      state.isLogined = false;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
