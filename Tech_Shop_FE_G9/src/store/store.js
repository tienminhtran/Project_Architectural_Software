import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice,
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
          serializableCheck:false
    })
});

export default store;