const { Client } = require('pg');
async function run() {
  const client = new Client({ connectionString: "postgresql://neondb_owner:npg_n8DEXqH7UYmc@ep-shy-wave-aoe1gcx6-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require" });
  await client.connect();
  const res = await client.query("UPDATE events SET status = 'Approved' WHERE status IS NULL OR status = ''");
  console.log('Updated events:', res.rowCount);
  await client.end();
}
run().catch(console.error);
