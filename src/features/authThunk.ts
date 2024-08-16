// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { setTokens, clearTokens } from "./authSlice";

// export const refreshToken = createAsyncThunk(
//     'auth/refreshToken',
//     async (_, { dispatch, getState }) => {
//         const state = getState() as { auth: { refreshToken: string | null } };
//         const { refreshToken } = state.auth;

//         if (!refreshToken) {
//             throw new Error('No refresh token available');
//         }

//         try {
//             const response = await axios.post('http://127.0.0.1:8000/api/v0/accounts/refresh', {
//                 refresh: refreshToken
//             });
//             const {access, refresh } = response.data;
//             dispatch(setTokens({ access: access, refresh: refresh }));
//             return access;
//         } catch (error) {
//             dispatch(clearTokens());
//             throw error;
//         }
//     }
// )