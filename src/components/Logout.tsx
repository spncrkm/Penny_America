
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { UserState } from "../interface/Users";
import { useState } from "react";
import { clearTokens } from "../features/authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const removeUser = useSelector((state: {user: UserState}) => state.user.user)

  const handleLogout = () => {
    dispatch(clearTokens());
    navigate('/')
    // if (isLoggedIn){
    //   sessionStorage.removeItem('token');
    //   sessionStorage.removeItem('refresh')
    //   localStorage.removeItem('user')
    //   setIsLoggedIn(false)
      
    //   navigate('/')
    
    }
  

  return (
    <button
      className="logout-btn"
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
};

export default Logout;
