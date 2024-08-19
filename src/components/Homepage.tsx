
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import styles from './Homepage.module.css'



const HomePage = () => {
  const navigate = useNavigate();
  

  const handleRegister = () => {
    navigate('/register')
  }
  return (
      <div className={styles.homepage}>
        <Link to="/dashboard" className="btn btn-lg view-dashboard">
          View Dashboard
        </Link>
        <Login />
        <button onClick={handleRegister} className={styles.btn}>
          Register
        </button>
      </div>
    
  );
};

export default HomePage;