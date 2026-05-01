import { Router } from "express";
import { db } from "@workspace/db";
import { events, eventCategories, venues, registrations } from "@workspace/db/schema";
import { eq, ilike, sql, and } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { search, category } = req.query;

    const query = db.select({
      eventId: events.eventId,
      eventName: events.eventName,
      festName: events.festName,
      categoryName: eventCategories.categoryName,
      venueName: venues.venueName,
      eventDate: events.eventDate,
      registrationFee: events.registrationFee,
      isCompetition: events.isCompetition,
      organizer: events.facultyCoordinatorName,
      status: events.status,
      registeredCount: sql<number>`(SELECT count(*)::int FROM registrations WHERE event_id = ${events.eventId})`
    })
    .from(events)
    .leftJoin(eventCategories, eq(events.categoryId, eventCategories.categoryId))
    .leftJoin(venues, eq(events.venueId, venues.venueId))
    .where(eq(events.status, 'Approved'));

    if (search) {
      query.where(and(eq(events.status, 'Approved'), ilike(events.eventName, `%${search}%`)));
    }
    
    if (category && category !== "All") {
      query.where(and(eq(events.status, 'Approved'), eq(eventCategories.categoryName, String(category))));
    }

    const results = await query;
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/pending", async (req, res) => {
  try {
    const pendingEvents = await db.select({
      eventId: events.eventId,
      eventName: events.eventName,
      organizer: events.facultyCoordinatorName,
      eventDate: events.eventDate,
      festName: events.festName,
      status: events.status
    })
    .from(events)
    .where(eq(events.status, 'Pending'))
    .limit(20);

    res.json(pendingEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { eventName, festName, categoryId, venueId, eventDate, registrationFee, isCompetition, facultyCoordinatorName } = req.body;
    
    const catId = parseInt(categoryId);
    const venId = parseInt(venueId);
    
    if (isNaN(catId) || isNaN(venId)) {
      return res.status(400).json({ error: "Invalid Category or Venue ID" });
    }

    const [newEvent] = await db.insert(events).values({
      eventName,
      festName: festName || 'Chanakya Fest 2026',
      categoryId: catId,
      venueId: venId,
      eventDate: eventDate || null,
      registrationFee: (registrationFee || 0).toString(),
      isCompetition: isCompetition === 'true' || isCompetition === true,
      facultyCoordinatorName: facultyCoordinatorName || 'Coordinator',
      status: 'Pending'
    }).returning();
    
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const [updated] = await db.update(events)
      .set({ status })
      .where(eq(events.eventId, parseInt(id)))
      .returning();
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
