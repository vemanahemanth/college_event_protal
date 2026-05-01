const { Client } = require('pg');
async function run() {
  const client = new Client({ connectionString: 'postgresql://neondb_owner:npg_n8DEXqH7UYmc@ep-shy-wave-aoe1gcx6-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require' });
  await client.connect();
  const res = await client.query('SELECT category_name FROM event_categories');
  console.log(res.rows.map(r => r.category_name));
  await client.end();
}
run().catch(console.error);
