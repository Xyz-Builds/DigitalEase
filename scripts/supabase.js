import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseURL = "https://przjzyheqdyddaxlyjei.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByemp6eWhlcWR5ZGRheGx5amVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MzA4NjcsImV4cCI6MjA5NTEwNjg2N30.OPj2wVFSGGY2aN0j1IRejhbaupsp8wCNSQgxMsGbAyk";

export const supabase = createClient(supabaseURL, supabaseAnonKey);
