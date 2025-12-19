import type { BasicInfoEntity, EmployeeDetailsEntity } from "./employee";

export interface WizardDraftEntity {
  basic?: BasicInfoEntity;
  details?: EmployeeDetailsEntity;
  lastUpdated: string;
}