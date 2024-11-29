import { supabase } from './supabase';

/**
 * Saves a log entry to the database.
 * 
 * @param userId - The ID of the user performing the action.
 * @param action - The type of action performed (e.g., "order_placed", "product_edited").
 * @param details - Additional details about the action, if any (optional).
 * @returns A promise that resolves to the result of the database insertion.
 */
export async function saveLog(userId: string, action: string, details: object = {}) {
  try {
    const { data, error } = await supabase
      .from('logs')
      .insert([
        {
          user_id: userId,
          action,
          details,
        },
      ]);

    if (error) {
      console.error('Error saving log:', error.message);
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error('Unexpected error saving log:', err);
    throw err;
  }
}
