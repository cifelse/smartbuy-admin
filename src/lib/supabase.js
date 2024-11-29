import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY
);

// Fetch all categories
export const getAllCategories = async () => {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    console.error("Error fetching categories", error);
    return [];
  }

  return data;
};

// Fetch all products
export const getAllProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products", error);
    return [];
  }

  return data;
};

// Fetch a single product by ID
export const getProduct = async (id) => {
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
};

// Fetch user information by ID
export const getUser = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .select("first_name, last_name, pfp")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching user", error);
    return null;
  }

  return data;
};

// Save a log entry to the logs table
export const saveLog = async (userId, action, details = {}) => {
  const { data, error } = await supabase.from("logs").insert([
    {
      user_id: userId,
      action,
      details,
    },
  ]);

  if (error) {
    console.error("Error saving log", error.message);
    throw new Error(error.message);
  }

  return data;
};
