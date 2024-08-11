import { configureStore } from "@reduxjs/toolkit";
import userReducer  from './features/userSlice'
import authReducer from './features/authSlice'
import { tokenMiddleware } from "./features/tokenMiddleware";

export const store: any = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenMiddleware),
});