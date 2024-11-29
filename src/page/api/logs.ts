import type { NextApiRequest, NextApiResponse } from 'next';
import { saveLog } from '@/lib/supabase';

/**
 * API handler for saving logs.
 * 
 * Endpoint: POST /api/logs
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId, action, details } = req.body;

  // Validate request body
  if (!userId || !action) {
    return res.status(400).json({ error: 'Missing required fields: userId and action' });
  }

  try {
    const data = await saveLog(userId, action, details || {});
    return res.status(200).json({ message: 'Log saved successfully', data });
  } catch (error) {
    console.error('Error saving log:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
