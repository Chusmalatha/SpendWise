import Navbar from '../components/Navbar';
import AuditForm from '../components/AuditForm';
import Footer from '../components/Footer';

const AuditPage = () => {
  return (
    <div className="bg-dark-900 min-h-screen">
      <Navbar />
      <AuditForm />
      <Footer />
    </div>
  );
};

export default AuditPage;
