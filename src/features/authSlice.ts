import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    token: sessionStorage.getItem('token'),
    refreshToken: sessionStorage.getItem('refresh'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<{ token: string; refreshToken: string}>) => {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            sessionStorage.setItem('token', action.payload.token);
            sessionStorage.setItem('refresh', action.payload.refreshToken);
            console.log('refreshToken',state.refreshToken)
            console.log('token', state.token)
        },
        clearTokens: (state) => {
            state.token = null;
            state.refreshToken = null;
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('refresh');
        }
    }
});

export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;