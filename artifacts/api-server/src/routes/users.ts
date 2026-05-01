import { Router } from "express";
import { db } from "@workspace/db";
import { participants, colleges } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allUsers = await db.select({
      participantId: participants.participantId,
      fullName: participants.fullName,
      email: participants.email,
      course: participants.course,
      yearOfStudy: participants.yearOfStudy,
      collegeName: colleges.collegeName,
      createdAt: participants.createdAt
    })
    .from(participants)
    .leftJoin(colleges, eq(participants.collegeId, colleges.collegeId))
    .limit(100);

    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
