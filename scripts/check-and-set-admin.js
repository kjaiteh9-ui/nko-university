const { createClient } = require('../node_modules/@supabase/supabase-js/dist/index.cjs');

const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10cmJsaGdoc3duaG1tenBmZ29xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjY4NzE0NCwiZXhwIjoyMDg4MjYzMTQ0fQ.in6qPUS6US4FOVaXi9mdoI7zc-DHZwzlChFfqgjYmPY';
const supabase = createClient('https://mtrblhghswnhmmzpfgoq.supabase.co', KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function run() {
  const { data: { users }, error } = await supabase.auth.admin.listUsers({ perPage: 50 });
  if (error) { console.log('Error:', error.message); return; }

  if (users.length === 0) {
    console.log('No users yet. Sign up at https://nko-university.vercel.app/signup first, then re-run this script.');
    return;
  }

  console.log('Auth users found:');
  users.forEach(u => console.log(' -', u.email, '|', u.id));

  const admin = users.find(u => u.email === 'kjaiteh9@gmail.com');
  if (admin) {
    const { error: e } = await supabase.from('profiles').update({ role: 'admin' }).eq('id', admin.id);
    if (e) {
      console.log('Admin update FAILED:', e.message);
    } else {
      console.log('kjaiteh9@gmail.com is now admin!');
      console.log('Go to: https://nko-university.vercel.app/admin');
    }
  } else {
    console.log('kjaiteh9@gmail.com not found. Sign up at https://nko-university.vercel.app/signup then re-run.');
  }
}

run();
