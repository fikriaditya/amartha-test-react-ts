import { useEffect } from 'react';
import { useDebounce } from './useDebounce';
import { getDraftKeyByRole } from '../core/constant/storage';
import type { Role } from '../core/types/employee';

// autosave formdata based on role and debounced input
export const useAutosave = <T>(formData: T, role: Role) => {
  const debouncedFormData = useDebounce<T>(formData, 2000);

  useEffect(() => {
    if (debouncedFormData) {
      const storageKey = getDraftKeyByRole(role.toLowerCase());
      localStorage.setItem(storageKey, JSON.stringify(debouncedFormData));
      console.log(`Saved ${role} draft to ${storageKey}`);
    }
  }, [debouncedFormData, role]);
};