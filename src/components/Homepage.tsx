
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
        <h3>Welcome to PennyAM</h3>
        <Link to="/dashboard" className="btn btn-lg view-dashboard">
          
        </Link>
        <Login />
        <button onClick={handleRegister} className={styles.btn}>
          Register
        </button>
      </div>
    
  );
};

export default HomePage;