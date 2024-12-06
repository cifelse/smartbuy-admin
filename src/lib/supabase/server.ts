"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createSerClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

export const login = async (email: string, password: string) => {
  const supabase = await createSerClient();
  
  return await supabase.auth.signInWithPassword({
    email,
    password
  });
}

export const logout = async () => {
  const supabase = await createSerClient();
  const { error } = await supabase.auth.signOut();

  // Manually delete authentication-related cookies
  (await cookies()).delete('sb-lzxdphrmwurbuyurqqie-auth-token');

  return !error;
}

export const getCurrentUser = async () => {
  const supabase = await createSerClient();
  
  return await supabase.auth.getUser();
}

export const isAdmin = async (email: string) => {
  const supabase = await createSerClient();
  const { data, error } = await supabase
    .from("users")
    .select("tier")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Error fetching admin", error);
    return false;
  }

  return data?.tier === 3;
}