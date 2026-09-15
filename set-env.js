const { execSync } = require('child_process');

try {
  execSync('npx vercel env add NEXT_PUBLIC_SUPABASE_URL production --yes', { 
    input: 'https://hmuyvwbvpqsdpoihuolq.supabase.co',
    stdio: ['pipe', 'inherit', 'inherit']
  });
  console.log("URL added to prod");

  execSync('npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production --yes', { 
    input: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtdXl2d2J2cHFzZHBvaWh1b2xxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0ODI4NzgsImV4cCI6MjEwNTA1ODg3OH0.vAT7fk0hoDpWsypINZjBCS7-ZRPlB6aPZAO-y5dZg3M',
    stdio: ['pipe', 'inherit', 'inherit']
  });
  console.log("ANON_KEY added to prod");

} catch(e) {
  console.error("Error setting env", e);
}
