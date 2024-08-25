
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { clearTokens } from "../features/authSlice";
import { useAppSelector } from "../features/hooks";
import { logoutUser } from "../features/userSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useAppSelector((state) => state.auth.access);

  const handleLogout = () => {
    dispatch(clearTokens());
    dispatch(logoutUser());
    navigate('/login')
    }

  if (accessToken === null || undefined) {
    dispatch(clearTokens());
    dispatch(logoutUser());
    navigate('/login')
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
