/**
 * Run AFTER signing up with kjaiteh9@gmail.com on the live site.
 * This sets that account as admin in the database.
 *
 * Usage: node scripts/setup-admin.js
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://mtrblhghswnhmmzpfgoq.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10cmJsaGdoc3duaG1tenBmZ29xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjY4NzE0NCwiZXhwIjoyMDg4MjYzMTQ0fQ.in6qPUS6US4FOVaXi9mdoI7zc-DHZwzlChFfqgjYmPY';
const ADMIN_EMAIL = 'kjaiteh9@gmail.com';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function main() {
  console.log('🔍 Looking up user:', ADMIN_EMAIL);

  // List auth users to find by email
  const { data: { users }, error: listErr } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  if (listErr) { console.error('Error listing users:', listErr.message); process.exit(1); }

  const user = users.find(u => u.email === ADMIN_EMAIL);
  if (!user) {
    console.error(`❌ User ${ADMIN_EMAIL} not found. Sign up at https://nko-university.vercel.app/signup first.`);
    process.exit(1);
  }

  console.log('✅ Found user:', user.id);

  // Update profile role
  const { error: updateErr } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', user.id);

  if (updateErr) {
    console.error('❌ Failed to update role:', updateErr.message);
    console.error('   Make sure you ran the SQL migrations in Supabase dashboard first.');
    process.exit(1);
  }

  console.log('🎉 Success! kjaiteh9@gmail.com is now admin.');
  console.log('   Go to https://nko-university.vercel.app/admin to access the admin panel.');
}

main();
