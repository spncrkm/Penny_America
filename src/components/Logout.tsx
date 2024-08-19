
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { clearTokens } from "../features/authSlice";
import { useAppSelector } from "../features/hooks";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useAppSelector((state) => state.auth.access);

  const handleLogout = () => {
    dispatch(clearTokens());
    navigate('/')
    }

  if (accessToken === null || undefined) {
    dispatch(clearTokens());
    navigate('/')
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
