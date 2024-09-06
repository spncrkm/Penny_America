import Logout from "../Logout";
import { accbalwal, cart, encrypt, icon, navcellphone, navicon1, piglogo, savepig, support, tune } from "../../assets";
import Style from "./NavBar.module.css";
import BudgetModal from "../modals/BudgetModal";
import { useState } from "react";
import SavingPlan from "../modals/SavingPlanModal";
import { useGetBudgetsQuery } from "../../features/api/pennyApi";

const NavBar = () => {
  const username = localStorage.getItem("username") as string;
  const [isBudgetModalOpen, setBudgetModalOpen] = useState<boolean>(false);
  const [isSavingPlanModalOpen, setSavingPlanModalOpen] = useState<boolean>(false);
  const { refetch } = useGetBudgetsQuery();

  const toggleBudgetModal = () => {
    setBudgetModalOpen(!isBudgetModalOpen);
  }

  const toggleSavingPlanModal = () => {
    setSavingPlanModalOpen(!isSavingPlanModalOpen);
  }


  return (
    <>
      <nav className={Style.sidebar}>
        <div className={Style.brand}>
          <img src={piglogo} /> PennyAM
        </div>
        <div className={Style.chatSupport}>
          <p id={Style.p_text}>Welcome back 👋</p>
          <h3>{username} <Logout/></h3>
        </div>
        <div className={Style.member}>
          <a href="#"><img src={icon} id="icon"/> Dashboard</a>
          <a href="#" onClick={toggleBudgetModal}><img src={accbalwal} id="accbalwal"/> Budget</a>
          <a href="#" onClick={toggleSavingPlanModal}><img src={savepig} id="savepig"/> Savings Plan</a>
          <a href="#"><img src={navicon1} id="navicon1"/> Account</a>
          <a href="#"><img src={cart} id="cart"/> Transactions</a>
          <hr />
          <a href="#"><img src={tune} id="tune"/> Setting</a>
          <a href="#"><img src={support} id="support"/> Help Center</a>
          <a href="#"><img src={encrypt} id="encrypt"/> Security and Privacy</a>
          <div className={Style.navimg}>
            <img src={navcellphone} />
          </div>
        </div>
      </nav>
      {isBudgetModalOpen && <BudgetModal onClose={toggleBudgetModal} refetchBudgets={refetch}/>}
      {isSavingPlanModalOpen && <SavingPlan onClose={toggleSavingPlanModal} />}
    </>
  );
};

export default NavBar;
