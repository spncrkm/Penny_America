
import styles from '../styles/Header.module.css'
import { piglogo } from '../../../assets';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={piglogo} alt="Logo" />
        <span>PennyAM</span>
      </div>
      <nav className={styles.nav}>
        <a href="#product">Product</a>
        <a href="#how-it-works">How it works</a>
      </nav>
      <div className={styles.actions}>
        <a href="#login" className={styles.login}>Login / Sign up</a>
        <a href="#get-started" className={styles.getStarted}>Get Started</a>
      </div>
    </header>
  );
};

export default Header;