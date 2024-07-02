import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// --------------------------- PIRATA -----------------

const supabaseUrl = 'https://jrdfyglbldajuqzupfcz.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyZGZ5Z2xibGRhanVxenVwZmN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUzMDI2MzIsImV4cCI6MjAzMDg3ODYzMn0.YbBZPTNHDiMPGgPZLTcUr6e0o-CC-3yKiKWupjNgUJE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
