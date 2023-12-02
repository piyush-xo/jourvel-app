import { createSlice, isAction } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { isAuth: false, user: { username: null, email: null } },
  reducers: {
    logIn: (state, action) => {
      state.isAuth = true;
      state.user.username = action.payload.username;
      state.user.email = action.payload.email;
    },
    logOut: (state) => {
      state.isAuth = false;
      state.user.username = null;
      state.user.email = null;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
