import { configureStore } from "@reduxjs/toolkit";
import userReducer  from './features/userSlice'
import authReducer from './features/authSlice'
import { setupListeners } from "@reduxjs/toolkit/query";
import { PennyApi } from "./features/api/pennyApi";
import plaidReducer from './features/plaidSlice'



export const store: any = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        plaid: plaidReducer,
        [PennyApi.reducerPath]: PennyApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(PennyApi.middleware),
    
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

// AppStore['dispatch'];
// ReturnType<AppStore['getState']>;