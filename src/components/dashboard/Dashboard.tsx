import React, { useState, useEffect } from "react";
import NavBar from "../navbar/NavBar.";
import Transactions from "../Transactions";
import style from "./Dashboard.module.css";
import { invoice } from "../../assets";
import useTokenRefresh from "../../features/TokenRefresher";
import { Transaction } from "../../interface/Transaction";
import { useAppSelector } from "../../features/hooks";
import { PennyApi } from "../../features/api/pennyApi";
import axios from "axios";
import PlaidLink from "../PlaidLink";
import Accounts from "../accounts/Accounts";
import TokenRefresher from "../../features/TokenRefresher";

const Dashboard: React.FC = () => {
  const accessToken = localStorage.getItem("access");
  const userAccessToken = useAppSelector((state) => state.auth.access);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { data, isLoading, isError } =
    PennyApi.useGetTransactionsQuery(userAccessToken);
  console.log("transaction data", data);


  // useEffect(() => {
  //   const fetchAccounts = async () => {
  //     const response = await axios.get(
  //       "http://127.0.0.1:8000/api/v0/plaid/auth",
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     console.log("accounts:", response.data);
  //   };
  //   fetchAccounts();
  // }, [accessToken]);
  // useTokenRefresh();

  const formatAmount = (amount: number) => {
    return Number.isInteger(amount) ? amount.toString() : amount.toFixed(2);
  };

  const changeAmount = (amount: number | any) => {
    return (amount < 0 ? "-" : "") + "$" + Math.abs(amount).toFixed(2);
  };

  return (
    <div className={style.dashboard}>
      <aside className={style.sidebar}>
        <NavBar />
      </aside>
      <main className={style.main__container}>
        <div className={style.summary_cards}>
          <div className={style.balance}>balance</div>
          <div className={style.income}>income</div>
          <div className={style.expenses}>expenses</div>
          <section className={style.saving__plan}>Savings Plan</section>
        </div>
        <section className={style.budget_chart}>Budget</section>
        <div className={style.account_wrapper}>
          <div className={style.accounts}>
            <Accounts />
            </div>
          <div className={style.transactions}>
            <div className={style.taheader}>Transactions</div>
            <Transactions />
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
