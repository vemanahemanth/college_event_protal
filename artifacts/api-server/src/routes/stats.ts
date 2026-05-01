import { Router } from "express";
import { db } from "@workspace/db";
import { events, participants, registrations, eventCategories } from "@workspace/db/schema";
import { count, sql, eq, and } from "drizzle-orm";

const router = Router();

router.get("/kpis", async (req, res) => {
  try {
    const eventsCount = await db.execute(sql`SELECT count(*)::int as value FROM events WHERE status = 'Approved'`);
    const participantsCount = await db.execute(sql`SELECT count(*)::int as value FROM participants`);
    const registrationsCountRes = await db.execute(sql`
      SELECT count(r.registration_id)::int as value
      FROM registrations r
      JOIN events e ON r.event_id = e.event_id
      WHERE e.status = 'Approved'
    `);
    
    const competitionsCount = await db.execute(sql`SELECT count(*)::int as value FROM events WHERE is_competition = true AND status = 'Approved'`);

    const revenueRes = await db.execute(sql`
      SELECT COALESCE(sum(e.registration_fee::numeric), 0)::text as revenue
      FROM events e
      JOIN registrations r ON e.event_id = r.event_id
      WHERE e.status = 'Approved'
    `);

    res.json({
      totalEvents: eventsCount.rows[0]?.value || 0,
      totalParticipants: participantsCount.rows[0]?.value || 0,
      totalRegistrations: registrationsCountRes.rows[0]?.value || 0,
      totalCompetitions: competitionsCount.rows[0]?.value || 0,
      flagshipEvents: 5,
      prizePool: "₹" + (revenueRes.rows[0]?.revenue || "0")
    });
  } catch (error) {
    console.error("KPI ERROR DETAILS:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/timeline", async (req, res) => {
  try {
    const timeline = await db.execute(sql`
      WITH RECURSIVE years AS (
        SELECT 2006 as year
        UNION ALL
        SELECT year + 1 FROM years WHERE year <= 2026
      )
      SELECT 
        y.year::text as name,
        COALESCE(count(r.registration_id), 0)::int as participants
      FROM years y
      LEFT JOIN events e ON EXTRACT(YEAR FROM e.event_date) = y.year AND e.status = 'Approved'
      LEFT JOIN registrations r ON e.event_id = r.event_id
      GROUP BY y.year
      ORDER BY y.year
    `);
    res.json(timeline.rows);
  } catch (error) {
    console.error("TIMELINE ERROR DETAILS:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categoryStats = await db.execute(sql`
      SELECT ec.category_name as name, count(r.registration_id)::int as value
      FROM event_categories ec
      JOIN events e ON ec.category_id = e.category_id AND e.status = 'Approved'
      JOIN registrations r ON e.event_id = r.event_id
      GROUP BY ec.category_name
    `);
    
    const colors = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];
    const formatted = categoryStats.rows.map((row: any, i: number) => ({
      name: row.name,
      value: row.value,
      color: colors[i % colors.length]
    }));
    res.json(formatted);
  } catch (error) {
    console.error("CATEGORIES ERROR DETAILS:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/revenue-momentum", async (req, res) => {
  try {
    const momentum = await db.execute(sql`
      WITH RECURSIVE intervals AS (
        SELECT 2006 as start_year
        UNION ALL
        SELECT start_year + 5 FROM intervals WHERE start_year < 2026
      )
      SELECT 
        i.start_year::text as year,
        COALESCE(sum(e.registration_fee::numeric), 0)::int as revenue
      FROM intervals i
      LEFT JOIN events e ON EXTRACT(YEAR FROM e.event_date) >= i.start_year AND EXTRACT(YEAR FROM e.event_date) < i.start_year + 5 AND e.status = 'Approved'
      LEFT JOIN registrations r ON e.event_id = r.event_id
      GROUP BY i.start_year
      ORDER BY i.start_year
    `);
    res.json(momentum.rows);
  } catch (error) {
    console.error("REVENUE ERROR DETAILS:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/dept-matrix", async (req, res) => {
  try {
    const matrix = await db.execute(sql`
      SELECT 
        c.college_name as name,
        COALESCE(count(CASE WHEN ec.category_name = 'Technical' THEN 1 END), 0)::int as Technical,
        COALESCE(count(CASE WHEN ec.category_name = 'Cultural' THEN 1 END), 0)::int as Cultural
      FROM (SELECT * FROM colleges LIMIT 10) c
      LEFT JOIN participants p ON c.college_id = p.college_id
      LEFT JOIN registrations r ON p.participant_id = r.participant_id
      JOIN events e ON r.event_id = e.event_id AND e.status = 'Approved'
      JOIN event_categories ec ON e.category_id = ec.category_id
      GROUP BY c.college_name
      ORDER BY count(r.registration_id) DESC
      LIMIT 5
    `);
    res.json(matrix.rows);
  } catch (error) {
    console.error("MATRIX ERROR DETAILS:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
