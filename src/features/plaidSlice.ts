import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountGroup } from "../interface/Account";
import { Transaction } from "../interface/Transaction";

interface PlaidStateProps {
    transactions: Transaction[];
    accounts: AccountGroup[];
}
const initialState: PlaidStateProps = {
    transactions: [],
    accounts: [],
}

const plaidSlice = createSlice({
    name: "plaid",
    initialState,
    reducers: {
        setTransactions: (state, action: PayloadAction<Transaction[]>) => {
            state.transactions = action.payload
            localStorage.setItem('transactions', JSON.stringify(action.payload))
        },

        setAccounts: (state, action: PayloadAction<AccountGroup>) => {
            state.accounts.push(action.payload)
        }
    }
});

export const { setTransactions, setAccounts } = plaidSlice.actions;
export default plaidSlice.reducer
