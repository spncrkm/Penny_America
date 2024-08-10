import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import RegisterUser from "./RegisterUser";

const HomePage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register')
  }
  return (
      <div className="homepage">
        <Link to="/dashboard" className="btn btn-lg view-dashboard">
          View Dashboard
        </Link>
        <Login />
        <button onClick={handleRegister}>
          Register
        </button>
        
      </div>
    
  );
};

export default HomePage;