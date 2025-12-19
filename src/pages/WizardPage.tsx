import { useSearchParams } from 'react-router-dom';
import Wizard from '../components/wizard/Wizard';

const WizardPage = () => {
  const [searchParams] = useSearchParams();
  const role = (searchParams.get('role') || 'admin') as 'admin' | 'ops';

  return (
    <section className="page-container">
      <header className="page-header ta-c">
        <h1>Add New Employee</h1>
        <p>Current Role: <strong>{role.toUpperCase()}</strong></p>
      </header>
      
      {/* wizard components */}
      <Wizard role={role} />
    </section>
  );
};

export default WizardPage;