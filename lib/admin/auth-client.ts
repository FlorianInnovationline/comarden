// Client-side admin authentication utilities
// This file can be safely imported in Client Components

// Dev mode login (fallback) - client-safe version
export async function devAdminLogin(email: string, password: string): Promise<boolean> {
  // In client components, we can't access process.env directly
  // So we'll use a hardcoded fallback or fetch from an API
  const devEmail = 'admin@comarden.be';
  const devPassword = 'admin123';

  if (email === devEmail && password === devPassword) {
    return true;
  }

  return false;
}
