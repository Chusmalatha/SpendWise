import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorks from '../components/HowItWorks';
import FAQ from '../components/FAQ';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import PageWrapper from '../components/PageWrapper';

const LandingPage = () => {
  return (
    <PageWrapper>
      <div className="bg-dark-900">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <FAQ />
        <CTASection />
        <Footer />
      </div>
    </PageWrapper>
  );
};

export default LandingPage;

