import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import LoginForm from "./LoginForm";

interface LoginPageProps {
  searchParams: Promise<{ error?: string; next?: string }>;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  // Already a logged-in admin? Skip the form.
  if (await isAdmin()) {
    redirect("/admin");
  }

  return (
    <LoginForm
      initialError={params.error}
      next={params.next}
      supabaseConfigured={isSupabaseConfigured()}
    />
  );
}
