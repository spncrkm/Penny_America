import React, { useState } from "react";
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
import { Account } from "../../interface/Account";

const Dashboard: React.FC = () => {

  useTokenRefresh();

  const [selectedAccountId, setSelectedAccountId] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<string>("week");
  const [chartFilter, setChartFilter] = useState<string>("doughnut");
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [accounts, setAccounts] = useState<Account[]>([]);
  

  const handleAccountSelect = (accountId: string) => {
    setSelectedAccountId(accountId)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  }

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
    }
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
            </div>
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
