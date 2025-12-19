import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { WizardDraftEntity as WizardDraft } from '../../core/types/wizard';
import { useAutosave } from '../../hooks/useAutosave';
import { useSubmitWizard } from '../../hooks/useSubmitWizard';
import { getDraftKeyByRole } from '../../core/constant/storage';
import Step1BasicInfo from './Step1BasicInfo';
import Step2Details from './Step2Details';
import SubmissionProgress from '../ui/SubmissionProgress';
import type { BasicInfoEntity, EmployeeDetailsEntity } from "../../core/types/employee";

interface WizardProps {
  role: 'ops' | 'admin';
}

const Wizard = ({ role }: WizardProps) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  
  // Initialize state from localStorage if a draft exists
  const [formData, setFormData] = useState<WizardDraft>(() => {
    const saved = localStorage.getItem(getDraftKeyByRole(role));
    return saved
      ? JSON.parse(saved)
      : {
          basic: {} as BasicInfoEntity,
          details: {} as EmployeeDetailsEntity,
          lastUpdated: new Date().toISOString(),
        };
  });

  const [currentStep, setCurrentStep] = useState(role === 'ops' ? 2 : 1);
  const { submit, logs, isSubmitting } = useSubmitWizard();

  // Trigger background autosave
  useAutosave(formData, role);

  // Listen for role changes
  useEffect(() => {
    const draftKey = getDraftKeyByRole(role);
    const saved = localStorage.getItem(draftKey);
    
    if (saved) {
      setFormData(JSON.parse(saved));
    } else {
      // Reset to empty state if no draft exists for this new role
      setFormData({
        basic: {} as BasicInfoEntity,
        details: {} as EmployeeDetailsEntity,
        lastUpdated: new Date().toISOString(),
      });
    }

    // Reset step based on the new role
    setCurrentStep(role === 'ops' ? 2 : 1);
  }, [role]); 

  // update local storage on step data change
  const handleStep1Change = (data: Partial<BasicInfoEntity>) => {
    setFormData(prev => {
      const updated = {
        ...prev,
        basic: { ...prev.basic, ...data },
        lastUpdated: new Date().toISOString(),
      } as WizardDraft;
      return updated;
    });
  };

  const handleStep2Change = (data: Partial<EmployeeDetailsEntity>) => {
    setFormData(prev => {
      const updated = {
        ...prev,
        details: { ...prev.details, ...data },
        lastUpdated: new Date().toISOString(),
      } as WizardDraft;
      return updated;
    });
  };

  // handle final submit
  const handleFinalSubmit = async () => {
    const success = await submit(formData.basic!, formData.details!);
    if (success) {
      navigate(`/employees${search}`); // Redirect to employee list
      localStorage.removeItem(getDraftKeyByRole(role));
    }
  };

  // clear draft
  const clearDraft = () => {
    if (window.confirm("Are you sure you want to clear this draft?")) {
      localStorage.removeItem(getDraftKeyByRole(role));
      setFormData({
        basic: {} as BasicInfoEntity,
        details: {} as EmployeeDetailsEntity,
        lastUpdated: new Date().toISOString(),
      });
      if (role === 'admin') setCurrentStep(1);
    }
  };

  // show submission progress
  if (isSubmitting) {
    return <SubmissionProgress logs={logs} />;
  }

  return (
    <div className="wizard">
      <div className="wizard__header">
        <h2>{currentStep === 2 ? 'Employee Details' : 'Basic Information'}</h2>
        <button onClick={clearDraft} className="button button--secondary">Clear Draft</button>
      </div>

      <div className="wizard__content">
        {currentStep === 1 && role === 'admin' && (
          <Step1BasicInfo
            key={JSON.stringify(formData.basic) === '{}' ? 'reset' : 'active'} 
            data={formData.basic}
            onChange={handleStep1Change} 
            onNext={(data) => {
              setFormData(prev => ({ ...prev, basic: data }));
              setCurrentStep(2);
            }} 
          />
        )}

        {currentStep === 2 && (
          <Step2Details
            key={JSON.stringify(formData.details) === '{}' ? 'reset' : 'active'}
            employee_id={formData.basic?.employee_id || ''}
            data={formData.details} 
            showBackButton={role === 'admin'}
            onChange={handleStep2Change} 
            onBack={() => setCurrentStep(1)}
            onSubmit={(data) => {
              setFormData(prev => ({ ...prev, details: data }));
              handleFinalSubmit();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Wizard;