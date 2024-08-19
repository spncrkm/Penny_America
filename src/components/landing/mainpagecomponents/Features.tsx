
import styles from '../styles/Features.module.css';
import { budget, saving, tracking } from '../../../assets';

const Features = () => {
  return (
    <section className={styles.features}>
      <h2>Revolutionizing the pocket in the digital age</h2>
      <div className={styles.cards}>
        <div className={styles.card}>
          <img src={tracking} alt="Tracking Expenses" />
          <h3>Tracking Expenses</h3>
          <p>Monitor spending, stay on budget, and achieve your financial goals.</p>
        </div>
        <div className={styles.card}>
          <img src={budget} alt="Managing Budgets" />
          <h3>Managing Budgets</h3>
          <p>Stay in control of your finances and achieve your goals.</p>
        </div>
        <div className={styles.card}>
          <img src={saving} alt="Saving for Goals" />
          <h3>Saving for Goals</h3>
          <p>Achieve your dreams by setting and meeting savings goals.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
