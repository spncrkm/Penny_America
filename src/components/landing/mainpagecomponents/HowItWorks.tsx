import { working } from '../../../assets';
import styles from '../styles/HowItWorks.module.css'

const HowItWorks = () => {
  return (
    <section className={styles.how_it_works_container}>
    <div className={styles.how_it_works_text}>
      <h2>How it works</h2>
      <ol>
        <li>
          <h4>Build a Profile</h4>
          <p>Building a strong profile helps you set clear, manageable goals and track your progress effectively.</p>
        </li>
        <li>
          <h4>Input your Financial Information</h4>
          <p>Inputting financial information accurately is crucial for maintaining clear and reliable records.</p>
        </li>
        <li>
          <h4>Manage Budget and Set Goal</h4>
          <p>Inputting detailed expenses and income is the next step to effectively manage your budget.</p>
        </li>
      </ol>
      <button className={styles.get_started}>
        <a href='/register'>Getting Started</a>
        </button>
    </div>

    <div className={styles.how_it_works_image}>
      <img src={working} alt="How it works illustration" />
    </div>
  </section>
  );
};

export default HowItWorks;
