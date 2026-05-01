import { Router } from "express";
import { db } from "@workspace/db";
import { participants, registrations, events, colleges } from "@workspace/db/schema";
import { eq, sql, count, desc } from "drizzle-orm";

const router = Router();

router.get("/colleges", async (req, res) => {
  try {
    const topColleges = await db.select({
      name: colleges.collegeName,
      participants: count(registrations.registrationId)
    })
    .from(colleges)
    .leftJoin(participants, eq(colleges.collegeId, participants.collegeId))
    .leftJoin(registrations, eq(participants.participantId, registrations.participantId))
    .groupBy(colleges.collegeName)
    .orderBy(desc(count(registrations.registrationId)))
    .limit(5);

    res.json(topColleges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/engagement", async (req, res) => {
  try {
    // Top participants by registration count
    const engagement = await db.select({
      fullName: participants.fullName,
      registrations: count(registrations.registrationId)
    })
    .from(participants)
    .leftJoin(registrations, eq(participants.participantId, registrations.participantId))
    .groupBy(participants.fullName)
    .orderBy(desc(count(registrations.registrationId)))
    .limit(10);

    res.json(engagement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
