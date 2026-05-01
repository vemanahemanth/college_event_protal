import { Router } from "express";
import { db } from "@workspace/db";
import { registrations, participants, events } from "@workspace/db/schema";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const results = await db.select({
      registrationId: registrations.registrationId,
      registrationCode: registrations.registrationCode,
      participantName: participants.fullName,
      eventName: events.eventName,
      paymentStatus: registrations.paymentStatus,
      amountPaid: registrations.amountPaid,
      createdAt: registrations.createdAt
    })
    .from(registrations)
    .leftJoin(participants, eq(registrations.participantId, participants.participantId))
    .leftJoin(events, eq(registrations.eventId, events.eventId))
    .orderBy(desc(registrations.createdAt))
    .limit(50);

    res.json(results);
  } catch (error: any) {
    console.error("GET /registrations error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { fullName, email, mobileNumber, collegeId, course, yearOfStudy, eventId } = req.body;

    // 1. Create or get participant
    let participantId: number;
    const existing = await db.select().from(participants).where(eq(participants.email, email)).limit(1);
    
    if (existing.length > 0) {
      participantId = existing[0].participantId;
    } else {
      const [inserted] = await db.insert(participants).values({
        fullName,
        email,
        mobileNumber,
        collegeId,
        course,
        yearOfStudy,
      }).returning({ id: participants.participantId });
      participantId = inserted.id;
    }

    // 2. Create registration
    const registrationCode = `REG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const [registration] = await db.insert(registrations).values({
      registrationCode,
      participantId,
      eventId,
      paymentStatus: "Confirmed", // Simple flow for now
      amountPaid: "0.00",
      registrationSource: "Web",
    }).returning();

    res.status(201).json(registration);
  } catch (error: any) {
    console.error("POST /registrations error:", error);
    console.error("Request body:", req.body);
    if (error.code === '23505') {
       res.status(400).json({ error: "Already registered for this event" });
       return;
    }
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

export default router;
