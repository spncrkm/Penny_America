import { Middleware } from "@reduxjs/toolkit";
import { refreshToken as refreshTokenThunk, setTokens, clearTokens } from "./authSlice";
import { AppDispatch, RootState } from "../store";

interface KnownAction {
    type: string;
}

export const tokenMiddleware: Middleware<{}, RootState, AppDispatch> = (store) => (next) => async (action: unknown) => {
    if (typeof action === 'object' && action !== null && 'type' in action && action.type === refreshTokenThunk.pending.type) {
        const state = store.getState();
        const refreshToken = state.auth.refresh;

        if (refreshToken) {
            try {
                const response = await store.dispatch(refreshTokenThunk(refreshToken)).unwrap();

                if (response) {
                    store.dispatch(setTokens({ access: response.access, refresh: response.refresh }));
                }
            } catch (error) {
                store.dispatch(clearTokens());
                console.log('Token refresh failed:', error);
            }
        } else {
            console.error('No refresh token available')
        }
    }
    return next(action)
}