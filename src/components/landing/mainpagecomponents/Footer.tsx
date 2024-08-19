
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <span>PennyAM</span>
      </div>
      <nav className={styles.nav}>
        <a href="#product">Product</a>
        <a href="#how-it-works">How it works</a>
      </nav>
      <form className={styles.subscribe}>
        <input type="email" placeholder="Enter Email address" />
        <button type="submit">Subscribe</button>
      </form>
      <p className={styles.terms}>
        <a href="#terms">Terms of Service</a> | <a href="#privacy">Privacy Policy</a>
      </p>
    </footer>
  );
};

export default Footer;
