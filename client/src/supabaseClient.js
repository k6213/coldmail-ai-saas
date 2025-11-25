import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nmasbvemfherilktirfe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tYXNidmVtZmhlcmlsa3RpcmZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMTA0MjgsImV4cCI6MjA3OTU4NjQyOH0.TcVrw2io-cG5YpOkjXMtyskYf7N9qwaQWIXEkeijXDc'

export const supabase = createClient(supabaseUrl, supabaseKey)