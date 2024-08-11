import { Action, Middleware } from "@reduxjs/toolkit";
import axios from "axios";
import { setTokens, clearTokens } from "./authSlice";

interface MyAction extends Action {
    error?: {
        status: number;
    }
}


export const tokenMiddleware: Middleware = ({ dispatch, getState }) => (next) => async (action: Action) => {
    const state = getState();
    const token = state.auth.token;
    const refreshToken = state.auth.refreshToken;

    if (typeof action.type === 'string' && action.type.endsWith('/start')) {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }

    if (typeof action.type === 'string' && action.type.endsWith('/failed') && (action as MyAction).error?.status === 401 && refreshToken) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v0/accounts/refresh', {
                refresh: refreshToken,
            });
            dispatch(setTokens({ token: response.data.access, refreshToken }));
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        } catch (error) {
            dispatch(clearTokens());
        }
    }
    return next(action)
}