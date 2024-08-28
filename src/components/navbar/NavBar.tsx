import Logout from "../Logout";
import { accbalwal, cart, encrypt, icon, navcellphone, navicon1, piglogo, savepig, support, tune } from "../../assets";
import Style from "./NavBar.module.css";
import BudgetModal from "../modals/BudgetModal";
import { useState } from "react";

const NavBar = () => {
  const username = localStorage.getItem("username") as string;
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  }


  return (
    <>
      <div className={Style.sidebar}>
        <div className={Style.brand}>
          <img src={piglogo} /> PennyAM
        </div>
        <div className={Style.member}>
          <a href="#"><img src={icon} id="icon"/> Dashboard</a>
          <a href="#" onClick={toggleModal}><img src={accbalwal} id="accbalwal"/> Budget</a>
          <a href="#"><img src={savepig} id="savepig"/> Savings Plan</a>
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

        <div className={Style.chatSupport}>
          <p>Welcome back 👋</p>
          <h3>{username} <Logout/></h3>
        </div>
      </div>
      {isModalOpen && <BudgetModal onClose={toggleModal} />}
    </>
  );
};

export default NavBar;