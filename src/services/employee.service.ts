import { apiStep1, apiStep2 } from './api';
import type { BasicInfoEntity, EmployeeDetailsEntity } from '../core/types/employee';

export const EmployeeService = {
  // --- Step 1
  getDepartments: (query: string) => 
    apiStep1.get(`/departments?name_like=${query}`),

  saveBasicInfo: (data: BasicInfoEntity) => 
    apiStep1.post('/basicInfo', data),

  // --- Step 2 
  getLocations: (query: string) => 
    apiStep2.get(`/locations?name_like=${query}`),

  saveDetails: (data: EmployeeDetailsEntity) => 
    apiStep2.post('/details', data),

  // --- Employee List
  getAllBasicInfo: (page: number, limit: number) => 
    apiStep1.get(`/basicInfo?_page=${page}&_limit=${limit}`),

  getAllDetails: () => 
    apiStep2.get('/details'),
};