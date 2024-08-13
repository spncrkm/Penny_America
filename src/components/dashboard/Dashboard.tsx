import React from "react";
import NavBar from "../navbar/NavBar.";
import { useSelector } from "react-redux";
import { User, UserState } from "../../interface/Users";
import Transactions from "../Transactions";
import style from "./Dashboard.module.css";
import { invoice } from "../../assets";

const Dashboard: React.FC = () => {
  const loggedInUser = useSelector(
    (state: { user: UserState }) => state.user.user
  );

  return (
    
      <div className={style.container}>
      <main className={style.main__container}>
        {/* {loggedInUser.map((user) => (
          <div key={user.id} className='main-dashboard'>
            <div className='section1'>
              <h1>Good Morning, {user.username}</h1>
            </div>
          </div>
        ))} */}
        <div className={style.row_1}>
          <div className={style.balance}>
            balance
          </div>
          <div className={style.income}>
            income
          </div>
          <div className={style.expenses}>
            expenses
          </div>
          <div className={style.saving__plan}>
            Savings Plan
          </div>
          </div>
          <div className={style.row_2}>
          <div className={style.budget_chart}>
            Budget
          </div>
          </div>
          <div className={style.row_3}>
            <div className={style.accounts}>
              accounts
            </div>
            <div className={style.transactions}>
              <Transactions />
            </div>
            <div>
              <img src={invoice}/>
            </div>
          </div>
      </main>
      </div>
    
  );
};

export default Dashboard;
