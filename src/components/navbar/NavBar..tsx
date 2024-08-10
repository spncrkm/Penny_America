
import Logout from "../Logout";
import { logo } from "../../assets";
import Style from './NavBar.module.css'
import PlaidLink from "../PlaidLink";
import { useSelector } from "react-redux";
import { User } from "../../interface/Users";

const NavBar = () => {
  
  const loggedInUser = useSelector((state: {user: User}) => state.user.username)
  

  const userString = sessionStorage.getItem('user') as string;
  const user = JSON.parse(userString);
  console.log(user[0])

  return (
    <>
    <Logout />
      <div className={Style.sidebar}>
        <div className={Style.brand}>
          <img src={logo} />
        </div>
        <div className={Style.member}>
          <h3>Hi, {user[0].username}</h3>
            <p>Premium Member</p>
            <PlaidLink />
            <a href='#'>Dashboard</a>
            <a href='#'>Recurring</a>
            <a href='#'>Spending</a>
            <a href='#'>Net Worth</a>
        </div>
        
        <div className={Style.chatSupport}>
          <p>Chat with us</p>
        </div>
      </div>
    </>
  );
};

export default NavBar;
