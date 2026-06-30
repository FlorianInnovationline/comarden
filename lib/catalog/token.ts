// Token validation for catalog access.
// ---------------------------------------------------------------------------
// Tokens MUST be provided via environment variables - there are NO hardcoded
// fallbacks. Set CATALOG_TOKEN and CATALOG_ADMIN_TOKEN in your environment
// (Vercel project settings / local .env.local). Env vars are read lazily inside
// the functions so the module can be imported during build without throwing;
// the error only surfaces if a catalog route is actually exercised without
// configuration.

function getCatalogToken(): string {
  const v = process.env.CATALOG_TOKEN;
  if (!v) {
    throw new Error(
      "CATALOG_TOKEN is not set. Configure it in your environment (Vercel / .env.local)."
    );
  }
  return v;
}

function getCatalogAdminToken(): string {
  const v = process.env.CATALOG_ADMIN_TOKEN;
  if (!v) {
    throw new Error(
      "CATALOG_ADMIN_TOKEN is not set. Configure it in your environment (Vercel / .env.local)."
    );
  }
  return v;
}

// Two-tier access model:
//   - validateToken() → READ access. Accepts EITHER the regular catalog token
//     or the admin token (the admin token implies read rights). Lower bar.
//   - isAdminToken()  → ADMIN access. Accepts ONLY the admin token. The regular
//     catalog token must NOT grant admin rights (prevents privilege escalation).
export function validateToken(token: string | null | undefined): boolean {
  if (!token) return false;
  return token === getCatalogToken() || token === getCatalogAdminToken();
}

export function isAdminToken(token: string | null | undefined): boolean {
  if (!token) return false;
  return token === getCatalogAdminToken();
}
