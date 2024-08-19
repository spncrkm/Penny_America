
import Header from './mainpagecomponents/Header';
import Features from './mainpagecomponents/Features';
import HowItWorks from './mainpagecomponents/HowItWorks';
import Footer from './mainpagecomponents/Footer';
import Hero from './mainpagecomponents/Hero';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default LandingPage;
