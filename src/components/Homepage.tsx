
import { Link, useNavigate } from "react-router-dom";
import Login from "./login/Login";
import styles from './Homepage.module.css'



const HomePage = () => {
  // const navigate = useNavigate();
  

  // const handleRegister = () => {
  //   navigate('/register')
  // }
  return (
    
      <div className={styles.homepage}>
        <div className={styles.text_container}>
        <h3>Welcome to PennyAM</h3>
        </div>
        <div className={styles.login_container}>
        <Login />
        </div>
        {/* <button onClick={handleRegister} className={styles.btn}>
          Register
        </button> */}
      </div>
    
  );
};

export default HomePage;