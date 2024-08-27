import Logout from "../Logout";
import { navcellphone, piglogo } from "../../assets";
import Style from "./NavBar.module.css";
import PlaidLink from "../PlaidLink";

const NavBar = () => {
  const username = localStorage.getItem("username") as string;

  return (
    <div>
      <div className={Style.sidebar}>
        <div className={Style.brand}>
          {/* <link href="/dashboard"><img src={piglogo} />  PennyAM</link> */}
          <img src={piglogo} /> PennyAM
        </div>
        <div className={Style.member}>
          <div className={Style.name_logout}>
            <Logout />
            <h3>Hi, {username}</h3>
          </div>
          <p>Premium Member</p>
          <PlaidLink />
          <a href="#">Dashboard</a>
          <a href="#">Budget Management</a>
          <a href="#">Savings Plan</a>
          <a href="#">Account</a>
          <a href="#">Transactions</a>
          <hr />
          <a href="#">Setting</a>
          <a href="#">Help Center</a>
          <a href="#">Security and Privacy</a>
          <div className={Style.navimg}>
            <img src={navcellphone} />
          </div>
        </div>

        <div className={Style.chatSupport}>
          <p>Welcome back</p>
          <h3>{username}</h3>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
