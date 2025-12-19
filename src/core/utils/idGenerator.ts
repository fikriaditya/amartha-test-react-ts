export const generateEmployeeId = (deptName: string, existingCount: number): string => {
  const prefix = deptName.substring(0, 3).toUpperCase();
  const sequence = String(existingCount + 1).padStart(3, '0');
  return `${prefix}-${sequence}`;
};