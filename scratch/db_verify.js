const { Client } = require('pg');
async function run() {
  const client = new Client({ connectionString: "postgresql://neondb_owner:npg_n8DEXqH7UYmc@ep-shy-wave-aoe1gcx6-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require" });
  await client.connect();
  const res = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'events'");
  console.log('Columns:', res.rows.map(r => r.column_name).join(', '));
  const data = await client.query("SELECT event_id, event_name, status FROM events ORDER BY event_id DESC LIMIT 10");
  console.log('Latest Data:', JSON.stringify(data.rows, null, 2));
  await client.end();
}
run().catch(console.error);
