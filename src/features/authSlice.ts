import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PennyApi } from "./api/pennyApi";
import { useNavigate } from "react-router-dom";


export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (refreshToken: string, { dispatch }) => {
        const response = await dispatch(PennyApi.endpoints.accountRefresh.initiate({ refreshToken }));
        if (response.data) {
            return response.data;
        }
        throw new Error('Failed to refresh token');
    }
)

interface AuthState {
    access: string | null;
    refresh: string | null;
    isRefreshing: boolean;
}


const initialState: AuthState = {
    access: "",
    refresh: "",
    isRefreshing: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<{ access: string, refresh: string}>) => {
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
            localStorage.setItem('access', action.payload.access);
            localStorage.setItem('refresh', action.payload.refresh);
            console.log('refreshToken',state.refresh)
            console.log('access', state.access)
        },
        clearTokens: (state) => {
            state.access = null;
            state.refresh = null;
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(refreshToken.pending, (state) => {
                state.isRefreshing = true;
            })
            .addCase(refreshToken.fulfilled, (state, action: PayloadAction<{ access: string, refresh: string }>) => {
                state.access = action.payload.access;
                state.refresh = action.payload.refresh;
                localStorage.setItem('access', action.payload.access)
                localStorage.setItem('refresh', action.payload.refresh)
                state.isRefreshing = false;
            })
            .addCase(refreshToken.rejected, (state) => {
                state.access = null
                state.refresh = null
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                state.isRefreshing = false;
            })
    }
});

export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;