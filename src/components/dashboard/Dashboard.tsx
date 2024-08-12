import React from "react";
import NavBar from "../navbar/NavBar.";
import { useSelector } from "react-redux";
import { User, UserState } from "../../interface/Users";
import Transactions from "../Transactions";
import style from "./Dashboard.module.css";

const Dashboard: React.FC = () => {
  const loggedInUser = useSelector(
    (state: { user: UserState }) => state.user.user
  );

  return (
    
      <div>
      <main className={style.main__container}>
        {/* {loggedInUser.map((user) => (
          <div key={user.id} className='main-dashboard'>
            <div className='section1'>
              <h1>Good Morning, {user.username}</h1>
            </div>
          </div>
        ))} */}
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
        <Transactions />
      </main>
      </div>
    
  );
};

export default Dashboard;
