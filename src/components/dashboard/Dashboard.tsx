import React, { useState } from "react";
import NavBar from "../navbar/NavBar.";
import Transactions from "../Transactions";
import style from "./Dashboard.module.css";
import { invoice, savings } from "../../assets";
import Accounts from "../accounts/Accounts";
import useTokenRefresh from "../../features/TokenRefresher";
import DoughnutChart from "../charts/Doughnut";

const Dashboard: React.FC = () => {

  useTokenRefresh();

  const [selectedAccountId, setSelectedAccountId] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<string>("week");

  const handleAccountSelect = (accountId: string) => {
    setSelectedAccountId(accountId)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  }

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
          <section className={style.saving__plan}><img src={savings}/></section>
        </div>
        <section className={style.budget_chart}>
          {/* <img src={budgetheader} className={style.budg_header}/>
          <img src={chart} className={style.chart_image}/> */}
          <DoughnutChart selectedAccountId={selectedAccountId} filter={filter}/>
          </section>
        <div className={style.account_wrapper}>
          <div className={style.accounts}>
            <Accounts onAccountSelect={handleAccountSelect} />
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
            <Transactions selectedAccountId={selectedAccountId} filter={filter} />
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
