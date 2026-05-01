const { Client } = require('pg');
async function run() {
  const client = new Client({ connectionString: "postgresql://neondb_owner:npg_n8DEXqH7UYmc@ep-shy-wave-aoe1gcx6-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require" });
  await client.connect();
  console.log('Running eventsCount...');
  const eventsCount = await client.query("SELECT count(*)::int as value FROM events WHERE status = 'Approved'");
  console.log('eventsCount:', eventsCount.rows[0].value);
  
  console.log('Running registrationsCount...');
  const registrationsCount = await client.query("SELECT count(r.registration_id)::int as value FROM registrations r JOIN events e ON r.event_id = e.event_id WHERE e.status = 'Approved'");
  console.log('registrationsCount:', registrationsCount.rows[0].value);

  console.log('Running competitionsCount...');
  const competitionsCount = await client.query("SELECT count(*)::int as value FROM events WHERE is_competition = true AND status = 'Approved'");
  console.log('competitionsCount:', competitionsCount.rows[0].value);

  console.log('Running revenueRes...');
  const revenueRes = await client.query("SELECT COALESCE(sum(e.registration_fee::numeric), 0)::text as revenue FROM events e JOIN registrations r ON e.event_id = r.event_id WHERE e.status = 'Approved'");
  console.log('revenueRes:', revenueRes.rows[0].revenue);

  await client.end();
}
run().catch(console.error);
