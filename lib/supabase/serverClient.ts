import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

export async function getServerSupabase() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  return createServerClient(url, key, {
    cookies: {
      get: (name) => cookieStore.get(name)?.value,
    },
  });
}

export function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
  return createClient(url, serviceKey);
}

export function isAdmin(email: string | null): boolean {
  const rawEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
  const adminEmails = rawEmails
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const userEmail = email?.trim().toLowerCase() ?? null;

  console.log("[Auth] Checking admin status for:", userEmail);
  console.log("[Auth] Allowed admins:", adminEmails);

  const result = !!userEmail && adminEmails.includes(userEmail);
  console.log("[Auth] Admin result:", result);

  return result;
}
