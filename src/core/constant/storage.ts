export const STORAGE_KEYS = {
  ADMIN_DRAFT: 'draft_admin',
  OPS_DRAFT: 'draft_ops',
} as const;

/** * get the correct key based on the current role 
 * /wizard?role=admin or /wizard?role=ops
 */
export const getDraftKeyByRole = (role: string | null) => {
  return role === 'ops' ? STORAGE_KEYS.OPS_DRAFT : STORAGE_KEYS.ADMIN_DRAFT;
};