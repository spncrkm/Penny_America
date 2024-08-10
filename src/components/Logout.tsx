
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { UserState } from "../interface/Users";
import { deleteUser } from "../features/userSlice";
import { useState } from "react";

const Logout = () => {
  const navigate = useNavigate();
  const removeUser = useSelector((state: {user: UserState}) => state.user.user)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const handleLogout = () => {
    if (isLoggedIn){
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('refresh')
      localStorage.removeItem('user')
      
      navigate('/')
    }
    }
  

  return (
    <button
      className="btn btn-light"
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
};

export default Logout;
