import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.username;
      state.token = action.payload.accessToken;
      state.role = action.payload.roles[0];
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
    },
    handleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { handleFailure, loginSuccess, loginStart, logout,setUser } =
  AuthSlice.actions;
export default AuthSlice.reducer;
