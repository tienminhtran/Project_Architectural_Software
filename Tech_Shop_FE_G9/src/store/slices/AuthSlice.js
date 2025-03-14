import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  roles: [],
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
      state.roles = action.payload.roles;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
    },
    handleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload.username;
      state.roles = action.payload.roles;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.roles = [];
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { handleFailure, loginSuccess, loginStart, logout,setUser } =  AuthSlice.actions;
export default AuthSlice.reducer;
