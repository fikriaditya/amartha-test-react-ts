import { useState } from 'react';
import { EmployeeService } from '../services/employee.service';
import type { BasicInfoEntity, EmployeeDetailsEntity } from '../core/types/employee';

export const useSubmitWizard = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (basicData: BasicInfoEntity, detailData: EmployeeDetailsEntity) => {
    setIsSubmitting(true);
    try {
      // Step 1: Basic Info
      setLogs(["Submitting basicInfo..."]);
      await EmployeeService.saveBasicInfo(basicData);
      //   delay 3s 
      await new Promise(res => setTimeout(res, 3000));
      setLogs(prev => [...prev, "✔ basicInfo saved!"]);

      // Step 2: Details
      setLogs(prev => [...prev, "Submitting details..."]);
      await EmployeeService.saveDetails(detailData);
      //   delay 3s
      await new Promise(res => setTimeout(res, 3000));
      setLogs(prev => [...prev, "✔ details saved!", "All data processed successfully!"]);
      
      return true; // Success for redirection
    } catch (error) {
      setLogs(prev => [...prev, "Error: Submission failed."]);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, logs, isSubmitting };
};