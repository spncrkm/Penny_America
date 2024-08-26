import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../navbar/NavBar.";
import Transactions from "../Transactions";
import style from "./Dashboard.module.css";
import { invoice, savings } from "../../assets";
import Accounts from "../accounts/Accounts";
import useTokenRefresh from "../../features/TokenRefresher";
import DoughnutChart from "../charts/Doughnut";
import BarChart from "../charts/BarChart";
import PieChart from "../charts/PieChart";
import LineChart from "../charts/LineChart";
import { AccountGroup } from "../../interface/Account";
import { useGetAuthQuery, useGetTransactionsQuery } from "../../features/api/pennyApi";
import axios from "axios";
import { Transaction } from "../../interface/Transaction";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { setTransactions } from "../../features/plaidSlice";

const Dashboard: React.FC = () => {

  useTokenRefresh();

  const [selectedAccountId, setSelectedAccountId] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<string>("week");
  const [chartFilter, setChartFilter] = useState<string>("doughnut");
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [accountGroups, setAccountGroups] = useState<AccountGroup[]>([]);
  const { data: authData, isLoading, isSuccess } = useGetAuthQuery(0);
  const { data: transactionsData } = useGetTransactionsQuery(0);
  const transactions: Transaction[] = useAppSelector((state) => state.plaid.transactions)
  const dispatch = useAppDispatch();

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

  console.log("authData:",authData)

  const handleAccountSelect = (accountId: string) => {
    setSelectedAccountId(accountId)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  }

  const filteredTransactions = useMemo(() => {
    const now = new Date();
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
      });
  }, [transactions, selectedAccountId, filter]);

  const renderChart = () => {
    switch (chartFilter) {
      case "doughnut":
        return <DoughnutChart selectedAccountId={selectedAccountId} filter={filter} />;
      case "bar":
        return <BarChart selectedAccountId={selectedAccountId} filter={filter} />;
      case "pie":
        return <PieChart selectedAccountId={selectedAccountId} filter={filter} />;
      case "line":
        return <LineChart selectedAccountId={selectedAccountId} filter={filter} />;
      default:
        return null;
    }
  }

  const selectedAccount = accountGroups.flatMap(group => group.accounts).find(account => account.account_id === selectedAccountId);
  const selectedAccountBalance = selectedAccount ? selectedAccount.balances.current : 0;

  const changeAmount = (amount: number) => {
    return (amount < 0 ? "-" : "") + "$" + Math.abs(amount).toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  if (isLoading) return <div>Loading...</div>


  return (
    <div className={style.dashboard}>
      <aside className={style.sidebar}>
        <NavBar />
      </aside>
      <main className={style.main__container}>
        <div className={style.summary_cards}>
          <div className={style.balance}>Balance: {changeAmount(selectedAccountBalance)}</div>
          
          <div className={style.income}>income</div>
          <div className={style.expenses}>expenses</div>
          <section className={style.saving__plan}><img src={savings}/></section>
        </div>
        <section className={style.budget_chart}>
          <div className={style.dropdown_container}>
          <select value={chartFilter} onChange={(event) => setChartFilter(event.target.value)} className={style.dropdown_chart}>
            <option value="doughnut">Doughnut</option>
            <option value="bar">Bar</option>
            <option value="pie">Pie</option>
            <option value="line">Line</option>
          </select>
          </div>
          {renderChart()}
          </section>
        <div className={style.account_wrapper}>
          <div className={style.accounts}>
            <div className={style.account_header}>
              <h3>Accounts</h3>
              <div className={style.total_balance}> {changeAmount(totalBalance)}</div>
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
            <Transactions transactions={filteredTransactions} />
          </div>
          <div className={style.imgcontainer}>
            <img src={invoice} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
