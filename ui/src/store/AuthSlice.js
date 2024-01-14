import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, user: null },
  reducers: {
    logIn: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logOut: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
