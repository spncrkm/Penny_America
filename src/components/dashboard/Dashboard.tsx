import React, { useCallback, useEffect, useMemo, useState } from "react";
import NavBar from "../navbar/NavBar";
import Transactions from "../Transactions";
import style from "./Dashboard.module.css";
import { money, moneySend, piggybank, wallet } from "../../assets";
import Accounts from "../accounts/Accounts";
import useTokenRefresh from "../../features/TokenRefresher";
import DoughnutChart from "../charts/Doughnut";
import BarChart from "../charts/BarChart";
import PieChart from "../charts/PieChart";
import LineChart from "../charts/LineChart";
import { AccountGroup } from "../../interface/Account";
import { useGetAuthQuery, useGetBudgetsQuery, useGetCategoriesQuery, useGetTransactionsQuery } from "../../features/api/pennyApi";
import axios from "axios";
import { Transaction } from "../../interface/Transaction";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { setTransactions } from "../../features/plaidSlice";
import PlaidLink from "../PlaidLink";
import BudgetListDisplay from "../budgetList/BudgetListDisplay";


const Dashboard: React.FC = () => {

  useTokenRefresh();

  const [selectedAccountId, setSelectedAccountId] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<string>("year");
  const [chartFilter, setChartFilter] = useState<string>("bar");
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [accountGroups, setAccountGroups] = useState<AccountGroup[]>([]);
  const { data: authData, isLoading, isSuccess } = useGetAuthQuery({});
  const { data: transactionsData } = useGetTransactionsQuery();
  const transactions: Transaction[] = useAppSelector((state) => state.plaid.transactions)
  const dispatch = useAppDispatch();
  const { data: budgetData, refetch } = useGetBudgetsQuery();
  const { data: categoryData } = useGetCategoriesQuery();

  console.log("budget:", budgetData)
  console.log("categoryData:", categoryData)
  console.log("transactionData:", transactionsData)
  console.log("accountData:", authData)



  useEffect(() => {
    if (isSuccess && authData) {
      const fetchInstitutionNames = async () => {
        try {
          const updatedAccountGroups = await Promise.all(authData.auths.map(async (accountGroup: AccountGroup) => {
            const institutionId = accountGroup.item.institution_id as string;
            const response = await axios.get(import.meta.env.VITE_API_URL + `/api/v0/plaid/institutions/${institutionId}`, {
              headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
            });
            return {
              ...accountGroup,
              institution_name: response.data.institution.name
            };
          }));
          setAccountGroups(updatedAccountGroups);

          // Calculate total balance
          const allAccounts = updatedAccountGroups.flatMap(group => group.accounts);
          const total = allAccounts.reduce((sum, account) => sum + account.balances.current, 0);
          setTotalBalance(total);

        } catch (error) {
          console.error('Failed to fetch institution names or calculate total balance:', error);
        }
      };

      fetchInstitutionNames();
    }
  }, [authData, isSuccess]);

  useEffect(() => {
    if (transactionsData) {
      dispatch(setTransactions(transactionsData.transactions));
      console.log("transactionquery:", transactionsData);
    }
  }, [transactionsData, dispatch]);

  const handleAccountSelect = useCallback((accountId: string) => {
    setSelectedAccountId(accountId)
  }, [])

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  }

  const filteredTransactions = useMemo(() => {
    if (!selectedAccountId) return [];
    const now = new Date();
    const selectedAccount = accountGroups.flatMap(group => group.accounts).find(account => account.account_id === selectedAccountId);

    if (selectedAccount && selectedAccount.subtype === "cd") {
      return []
    }

    return transactions
      .filter((tx) => !selectedAccountId || tx.account_id === selectedAccountId)
      .filter((tx) => {
        const transactionDate = new Date(tx.date);
        switch (filter) {
          case "week":
            return transactionDate >= new Date(new Date().setDate(now.getDate() - 7));
          case "month":
            return transactionDate >= new Date(new Date().setMonth(now.getMonth() - 1));
          case "year":
            return transactionDate >= new Date(new Date().setFullYear(now.getFullYear() - 1));
          default:
            return true;
        }
      })
      .filter((tx) => {
        if (selectedAccount) {
          if (selectedAccount.subtype === "savings") {
            return tx.category.includes("Payment");
          } else if (selectedAccount.subtype === "credit card") {
            return !tx.category.includes("Payment");
          }
        }
        return true;
      })
  }, [transactions, selectedAccountId, filter, accountGroups]);

  const renderChart = () => {
    switch (chartFilter) {
      case "line":
        return <LineChart key={selectedAccountId + filter} selectedAccountId={selectedAccountId} filter={filter} />;
      case "bar":
        return <BarChart selectedAccountId={selectedAccountId} filter={filter} />;
      case "pie":
        return <PieChart selectedAccountId={selectedAccountId} filter={filter} />;
      case "doughnut":
        return <DoughnutChart selectedAccountId={selectedAccountId} filter={filter} />;
      default:
        return null;
    }
  }

  const selectedAccount = accountGroups.flatMap(group => group.accounts).find(account => account.account_id === selectedAccountId);
  const selectedAccountBalance = selectedAccount ? selectedAccount.balances.available : 0;
  const selectedAccountCurrent = selectedAccount ? selectedAccount.balances.current : 0;

  const displayBalanceLabel = selectedAccount?.subtype === "cd" || selectedAccount?.subtype === "credit card"
    ? "Current Balance"
    : "Available Balance";

  const displayBalance = selectedAccount?.subtype === "cd" || selectedAccount?.subtype === "credit card"
    ? selectedAccountCurrent
    : selectedAccountBalance;

  const changeAmount = (amount: number) => {
    return (amount < 0 ? "-" : "") + "$" + Math.abs(amount).toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  if (isLoading) return <div>Loading...</div>


  // const mouseOverBalance = (e: MouseEvent) => {
  //   e.target.style.background = "red";
  // }

  // const mouseOutBalance = (e: MouseEvent) => {
  //   e.target.style.background = "";
  // }

  

  return (
    <div className={style.dashboard}>
      <aside className={style.sidebar}>
        <NavBar />
      </aside>
      <main className={style.main__container}>
          <div className={style.balance}>
            <div className={style.icon1}>
            <img src={wallet} />
            </div>
            <div className={style.text_container}>
            <p className={style.balance_p}>Total Balance</p>
            <p className={style.balance_p}>{changeAmount(totalBalance)}</p>
            </div>
        </div>
          <div className={style.income}>
          <div className={style.icon2}>
            <img src={money} />
            </div>
            <p>income</p>
            </div>
          <div className={style.expenses}>
          <div className={style.icon3}>
            <img src={moneySend} />
            </div>
            <p>expenses</p>
            </div>
          <div className={style.saving__plan}>
            <BudgetListDisplay budgetData={budgetData} categoryData={categoryData} refetchBudget={refetch} />
          </div>
        <div className={style.budget_chart}>
          <div className={style.dropdown_container}>
          <select value={chartFilter} onChange={(event) => setChartFilter(event.target.value)} className={style.dropdown_chart}>
            <option value="line">Line</option>
            <option value="bar">Bar</option>
            <option value="doughnut">Doughnut</option>
            <option value="pie">Pie</option>
          </select>
            </div>
          <div className={style.chart__container}>
          {renderChart()}

          </div>
          </div>
          <div className={style.bottom_container}>
          <div className={style.imgcontainer}>
            <div><img src={piggybank} /></div>
            <h3>Helping You Save for the Future</h3>
            <p>Start here, create your account, and let us help you save</p>
            <div>
            <PlaidLink />
            </div>
          </div>
          <div className={style.accounts}>
            <div className={style.account_header}>
            <h3>Accounts</h3>
              <div className={style.total_balance}>
                <p>{displayBalanceLabel}: {changeAmount(displayBalance)}</p>
              </div>
            </div>
            <Accounts 
            onAccountSelect={handleAccountSelect} 
            accountGroups={accountGroups}
            selectedAccountId={selectedAccountId}
            />
            </div>
          <div className={style.transactions}>
            <div className={style.taheader}>
              <h3>Transactions</h3>
              <select value={filter} onChange={handleFilterChange} className={style.dropdown_date}>
                <option value="week">Past Week</option>
                <option value="month">Past Month</option>
                <option value="year">Past Year</option>
              </select>
              </div>
              {selectedAccountId ? (
                selectedAccount?.subtype === "cd" ? (
                  <div className={style.no_transactions_message}>No payments are made from this account</div>
                ) : filteredTransactions.length > 0 ? (
                <Transactions transactions={filteredTransactions} />
              ) : (
                <div className={style.no_transactions_message}>
                  No transactions found for the selected account.
                  </div>
              )
            ) : (
                <div className={style.no_transactions_message}>
                  Please select an account to view transactions
                </div>
              )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;


export function formatString(input: string): string {
  return input
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}