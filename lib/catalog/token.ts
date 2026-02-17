// Token validation for catalog access

const VALID_TOKENS = [
  process.env.CATALOG_TOKEN || 'catalog-secret-2024',
  process.env.CATALOG_ADMIN_TOKEN || 'admin-secret-2024',
];

export function validateToken(token: string | null | undefined): boolean {
  if (!token) return false;
  return VALID_TOKENS.includes(token);
}

export function isAdminToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const adminToken = process.env.CATALOG_ADMIN_TOKEN || 'admin-secret-2024';
  return token === adminToken || VALID_TOKENS.includes(token);
}
