import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Category {
  id: string;
  title: string;
  icon: string;
  description: string;
  is_award: boolean;
  created_at: string;
  updated_at: string;
}

export interface Nominee {
  id: string;
  category_id: string;
  name: string;
  photo?: string;
  created_at: string;
  updated_at: string;
}

export interface Vote {
  id: string;
  category_id: string;
  nominee_id: string;
  voter_id: string;
  created_at: string;
}

// Generate a unique voter ID for each user
export const getVoterId = (): string => {
  let voterId = localStorage.getItem('dreamers-voter-id');
  if (!voterId) {
    voterId = `voter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('dreamers-voter-id', voterId);
  }
  return voterId;
};