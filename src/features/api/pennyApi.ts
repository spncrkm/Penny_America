import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearTokens, setTokens } from "../authSlice";
import {
  CreateBudgetRequest,
  CreateBudgetResponse,
  PatchBudgetRequest,
  PatchBudgetResponse,
} from "../../interface/Budget";
import {
  CreateExpenseRequest,
  CreateExpenseResponse,
  PatchExpenseRequest,
  PatchExpenseResponse,
} from "../../interface/Expense";
import { Budget } from "../../components/charts/BarChart";
import { Category } from "../../interface/Budget";
import { TransactionProp } from "../../interface/Transaction";

export const PennyApi = createApi({
  reducerPath: "PennyApi",
  baseQuery: async (args, api, extraOptions) => {
    // const state = api.getState() as RootState;
    const accessToken = localStorage.getItem("access");
    const baseQuery = fetchBaseQuery({
      baseUrl: import.meta.env.VITE_API_URL,
      prepareHeaders: (headers) => {
        if (accessToken) {
          headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return headers;
      },
    });

    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
      const refreshToken = localStorage.getItem("refresh");
      if (refreshToken) {
        try {
          const refreshResult = await api
            .dispatch(
              PennyApi.endpoints.accountRefresh.initiate({ refreshToken })
            )
            .unwrap();
          api.dispatch(setTokens(refreshResult)); //.data
          result = await baseQuery(args, api, extraOptions);
        } catch (error) {
          api.dispatch(clearTokens());
          console.error("Token refresh failed:", error);
        }
      } else {
        api.dispatch(clearTokens());
      }
    }
    return result;
  },
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userInfo: any) => ({
        url: `/api/v0/accounts/`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: userInfo,
      }),
    }),

    accountRefresh: builder.mutation({
      query: ({ refreshToken }: { refreshToken: string }) => ({
        url: "/api/v0/accounts/refresh",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { refresh: refreshToken },
      }),
    }),

    getTransactions: builder.query<TransactionProp, void>({
      query: () => "/api/v0/plaid/transactions",
    }),

    getAuth: builder.query({
      query: () => "/api/v0/plaid/auth",
    }),

    getItems: builder.query({
      query: () => ({
        url: "/api/v0/plaid/items",
        method: "GET",
      }),
    }),

    deleteItems: builder.mutation({
      query: (item_id: number) => ({
        url: `/api/v0/plaid/items`,
        method: "DELETE",
        body: item_id,
      }),
    }),

    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "/api/v0/categories/all",
        method: "GET",
      }),
    }),

    getBudgets: builder.query<Budget[], void>({
      query: () => "api/v0/budgets/",
    }),

    createBudget: builder.mutation<CreateBudgetResponse, CreateBudgetRequest>({
      query: (budget) => ({
        url: "/api/v0/budgets/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: budget,
      }),
    }),

    patchBudget: builder.mutation<
      PatchBudgetResponse,
      { budget_id: number; budget: PatchBudgetRequest }
    >({
      query: ({ budget_id, budget }) => ({
        url: `/api/v0/budgets/${budget_id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: budget,
      }),
    }),

    deleteBudget: builder.mutation<void, number>({
      query: (budget_id) => ({
          url: `/api/v0/budgets/${budget_id}`,
          method: "DELETE",
      }),
    }),

    createExpense: builder.mutation<
      CreateExpenseRequest,
      CreateExpenseResponse
    >({
      query: (expense) => ({
        url: "/api/v0/expenses/",
        method: "POST",
        body: expense,
      }),
    }),
    getExpenses: builder.query({
      query: () => ({
        url: "/api/v0/expenses/",
        method: "GET",
      }),
    }),

    patchExpense: builder.mutation<
      PatchExpenseResponse,
      { expense_id: number; expense: PatchExpenseRequest }
    >({
      query: ({ expense_id, expense }) => ({
        url: `/api/v0/expenses/${expense_id}`,
        method: "PATCH",
        body: expense,
      }),
    }),

    deleteExpense: builder.mutation({
      query: (expense_id: number) => ({
        url: `/api/v0/expenses/${expense_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAuthQuery,
  useGetTransactionsQuery,
  useAccountRefreshMutation,
  useGetBudgetsQuery,
  useGetItemsQuery,
  useDeleteItemsMutation,
  useGetCategoriesQuery,
  useCreateBudgetMutation,
  usePatchBudgetMutation,
  useDeleteBudgetMutation,
  useCreateExpenseMutation,
  useGetExpensesQuery,
  usePatchExpenseMutation,
  useDeleteExpenseMutation,
} = PennyApi;
