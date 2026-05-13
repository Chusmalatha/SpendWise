import Navbar from '../components/Navbar';
import AuditForm from '../components/AuditForm';
import PageWrapper from '../components/PageWrapper';

const AuditPage = () => {
  return (
    <PageWrapper>
      <div className="bg-dark-900 min-h-screen">
        <Navbar />
        <AuditForm />
      </div>
    </PageWrapper>
  );
};

export default AuditPage;

