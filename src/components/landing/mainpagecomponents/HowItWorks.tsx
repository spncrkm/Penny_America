import { workimg } from '../../../assets';
import '../styles/HowItWorks.module.css'

const HowItWorks = () => {
  return (
    <section className="how-it-works-container">
    <div className="how-it-works-text">
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
      <button className="get-started">Getting Started</button>
    </div>

    <div className="how-it-works-image">
      <img src={workimg} alt="How it works illustration" />
    </div>
  </section>
  );
};

export default HowItWorks;
