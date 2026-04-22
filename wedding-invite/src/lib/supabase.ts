import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export type Wish = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

export type RSVP = {
  id: string;
  name: string;
  phone: string;
  attending: boolean;
  guest_count: number;
  created_at: string;
};
