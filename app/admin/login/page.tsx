"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Lock, Mail } from "lucide-react";
import { devAdminLogin } from "@/lib/admin/auth-client";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // MySQL mode - simple dev auth
      const isAdmin = await devAdminLogin(email, password);
      if (isAdmin) {
        // Set session cookies with proper expiration
        const expires = new Date();
        expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000); // 24 hours
        
        document.cookie = `admin_session=authenticated; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
        document.cookie = `dev_admin=true; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
        
        // Small delay to ensure cookies are set before redirect
        setTimeout(() => {
          window.location.href = "/admin";
        }, 100);
      } else {
        setError("Email ou mot de passe incorrect");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary to-[#1a2f4a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Reveal>
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                Espace administrateur
              </h1>
              <p className="text-sm text-muted-foreground">
                Connectez-vous pour accéder au tableau de bord
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="admin@comarden.be"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="w-full bg-primary text-white hover:bg-primary/90"
              >
                {isLoading ? (
                  "Connexion..."
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Se connecter
                  </>
                )}
              </Button>
            </form>

            {process.env.NEXT_PUBLIC_NODE_ENV === "development" && (
              <div className="mt-6 p-4 bg-neutral/50 rounded-lg text-xs text-muted-foreground">
                <p className="font-semibold mb-1">Mode développement:</p>
                <p>Email: {process.env.DEV_ADMIN_EMAIL || "admin@comarden.be"}</p>
                <p>Mot de passe: {process.env.DEV_ADMIN_PASSWORD || "admin123"}</p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
