import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearTokens, setTokens } from "../authSlice";
// import { RootState } from "../../store";

export const PennyApi = createApi({
    reducerPath: "PennyApi",
    baseQuery: async (args, api, extraOptions) => {
        // const state = api.getState() as RootState;
        // const accessToken = state.auth.access;
        const accessToken = localStorage.getItem('access')
        const baseQuery = fetchBaseQuery({
            baseUrl: import.meta.env.VITE_API_URL,
            prepareHeaders: (headers) => {
                if (accessToken) {
                    headers.set('Authorization', `Bearer ${accessToken}`);
                }
                return headers;
            },
        });

        let result = await baseQuery(args, api, extraOptions);

        if (result.error?.status === 401) {
            const refreshToken = localStorage.getItem('refresh');
            if (refreshToken) {
                try {
                const refreshResult = await api.dispatch(
                    PennyApi.endpoints.accountRefresh.initiate({ refreshToken })
                ).unwrap();
                    api.dispatch(setTokens(refreshResult.data));
                    result = await baseQuery(args, api, extraOptions);
                } catch (error) {
                    api.dispatch(clearTokens());
                    console.error('Token refresh failed:', error);
                }
            }
        }
        return result;
    },
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (userInfo) => ({
                url: `/api/v0/accounts/`,
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: userInfo,
            }),
        }),
        accountRefresh: builder.mutation({
            query: ({refreshToken}) => ({
                url: '/api/v0/accounts/refresh',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: { refresh: refreshToken },
            })
        }),
        getTransactions: builder.query({
            query: () => "/api/v0/plaid/transactions",
        }),
        getAuth: builder.query({
            query: () => "/api/v0/plaid/auth"
        })
    })

})

export const { useCreateUserMutation, useGetAuthQuery, useGetTransactionsQuery, useAccountRefreshMutation } = PennyApi