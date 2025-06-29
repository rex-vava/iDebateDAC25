import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check for placeholder values
const isPlaceholderUrl = !supabaseUrl || supabaseUrl.includes('your-project-ref') || supabaseUrl === 'https://your-project-ref.supabase.co';
const isPlaceholderKey = !supabaseAnonKey || supabaseAnonKey === 'your-anon-key-here';

if (!supabaseUrl || !supabaseAnonKey || isPlaceholderUrl || isPlaceholderKey) {
  console.error('Supabase configuration error:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    isPlaceholderUrl,
    isPlaceholderKey,
    currentUrl: supabaseUrl
  });
  
  throw new Error(
    'Supabase is not properly configured. Please:\n' +
    '1. Create a Supabase project at https://supabase.com\n' +
    '2. Get your project URL and anon key from Settings > API\n' +
    '3. Update the .env file with your actual values\n' +
    '4. Click "Connect to Supabase" button in the top right if available'
  );
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