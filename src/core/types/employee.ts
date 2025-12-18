// ROLE TYPES
export type Role = 'Admin' | 'Ops' | 'Engineer' | 'Finance';

// ENTITY TYPES
export interface OptionTypeEntity {
  id: number;
  name: string;
}

export interface BasicInfoEntity {
  full_name: string;
  email: string;
  department: string;
  role: Role;
  employee_id: string; // generated
}

export interface EmployeeDetailsEntity {
  photo_url: string; // Base64
  employment_type: 'Full-time' | 'Part-time' | 'Contract' | 'Intern';
  location: string;
  notes: string;
}

export interface EmployeeListEntity {
    full_name: string;
    department: string;
    role: Role;
    location: string;
    photo_url: string;
}