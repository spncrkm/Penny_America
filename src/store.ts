import { configureStore } from "@reduxjs/toolkit";
import userReducer  from './features/userSlice'

export const store: any = configureStore({
    reducer: {
        user: userReducer,
    },
})