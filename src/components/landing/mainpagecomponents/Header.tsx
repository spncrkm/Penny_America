
import styles from '../styles/Header.module.css'
import { piglogo } from '../../../assets';
import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(prev => !prev);
  }
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={piglogo} alt="Logo" />
        <span>PennyAM</span>
      </div>
      <nav className={`${styles.nav} ${show ? styles.show : ''}`}>
        <a href="#product">Product</a>
        <a href="#how-it-works">How it works</a>
        <a href="/login" className={styles.login}>Login</a>
        <a href="/register" className={styles.getStarted}>Get Started</a>
      </nav>
      <a href='/' className={styles.icon} onClick={handleShow}>
      <i className='fa fa-bars'></i>
      </a>
    </header>
  );
};

export default Header;