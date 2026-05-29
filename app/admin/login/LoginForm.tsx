"use client";

import { useState, FormEvent } from "react";
import { LogIn, Lock, Mail, AlertTriangle } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

interface LoginFormProps {
  initialError?: string;
  next?: string;
  supabaseConfigured: boolean;
}

export default function LoginForm({
  initialError,
  next,
  supabaseConfigured,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(initialError ?? "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!supabaseConfigured) {
      setError(
        "Supabase n'est pas configuré sur ce déploiement. Définissez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword(
        { email, password }
      );

      if (signInError || !data.session) {
        setError(signInError?.message ?? "Identifiants invalides");
        setIsLoading(false);
        return;
      }

      // Verify the signed-in user is actually an admin. We hit a tiny check route
      // so the role lookup happens server-side with the fresh session cookie.
      const res = await fetch("/api/admin/whoami", { cache: "no-store" });
      const payload = (await res.json().catch(() => null)) as
        | { isAdmin?: boolean }
        | null;

      if (!res.ok || !payload?.isAdmin) {
        await supabase.auth.signOut();
        setError(
          "Ce compte n'a pas les droits administrateur. Contactez un administrateur pour activer votre accès."
        );
        setIsLoading(false);
        return;
      }

      const target = next && next.startsWith("/") ? next : "/admin";
      window.location.href = target;
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
                Connectez-vous avec votre compte Supabase
              </p>
            </div>

            {!supabaseConfigured && (
              <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  Supabase n&apos;est pas configuré. Définissez{" "}
                  <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
                  et{" "}
                  <code className="font-mono text-xs">
                    NEXT_PUBLIC_SUPABASE_ANON_KEY
                  </code>{" "}
                  dans <code className="font-mono text-xs">.env.local</code>.
                </div>
              </div>
            )}

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
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="vous@comarden.be"
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
                    autoComplete="current-password"
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
                disabled={isLoading || !supabaseConfigured}
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
          </div>
        </Reveal>
      </div>
    </div>
  );
}
