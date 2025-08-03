import { createClient } from '@supabase/supabase-js'
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const URL = import.meta.env.VITE_SUPABASE_URL


export const supabase = createClient(URL, ANON_KEY)