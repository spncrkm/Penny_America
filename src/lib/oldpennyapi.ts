import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PennyApi = createApi({
    reducerPath: "PennyApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000"}),
    tagTypes: ["Transactions"],
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
            query: ({refreshToken, ...tokens}) => ({
                url: '/api/v0/accounts/refresh',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${refreshToken}`
                },
                body: tokens,
            })
        }),
        getTransactions: builder.query({
            query: (accessToken) => ({
                url: "/api/v0/plaid/transactions",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            }),
            providesTags: [{ type: "Transactions"}],
        }),
        getAuth: builder.query({
            query: () => "/api/v0/plaid/auth"
        })
    })

})

export const { useCreateUserMutation, useGetAuthQuery, useGetTransactionsQuery, useAccountRefreshMutation } = PennyApi