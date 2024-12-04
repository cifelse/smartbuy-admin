"use server";

import { createBrowserClient } from "@supabase/ssr";

export const createClient = async () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Fetch all categories
export const getAllCategories = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    console.error("Error fetching categories", error);
    return [];
  }

  return data;
}

// Fetch all products
export const getAllProducts = async (limit: number) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("products").select("*").limit(limit);

  if (error) {
    console.error("Error fetching products", error);
    return [];
  }

  return data;
}

// Fetch a single product by ID
export const getProduct = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching product", error);
    return null;
  }

  return data;
}

// Fetch user information by ID
export const getUserInfo = async (id: string): Promise<{ name: string; email: string; avatar: string; } | null> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("first_name, last_name, pfp, email")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching user", error);
    return null;
  }

  return {
    name: `${data?.first_name} ${data?.last_name}`,
    email: data?.email,
    avatar: data?.pfp,
  };
}

// Save a log entry to the logs table
export const insertLog = async (userId: string, action: string, details = {}) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("logs")
    .insert({
      user_id: userId,
      action,
      details,
    });

  if (error) {
    console.error("Error saving log", error.message);
    throw new Error(error.message);
  }

  return data;
}