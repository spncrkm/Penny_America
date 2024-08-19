
import styles from '../styles/Hero.module.css';
import { macbook } from '../../../assets'; // 

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Empower Your Future with Smart Budgeting</h1>
        <p>Revolutionizing the pocket in the digital age</p>
        <a href="#get-started" className={styles.cta}>Getting Started</a>
      </div>
      <div className={styles.image}>
        <img src={macbook} alt="App Screenshot" />
      </div>
    </section>
  );
};

export default Hero;