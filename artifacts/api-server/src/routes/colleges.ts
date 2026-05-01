import { Router } from "express";
import { db } from "@workspace/db";
import { colleges } from "@workspace/db/schema";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const results = await db.select({
      collegeId: colleges.collegeId,
      collegeName: colleges.collegeName,
    }).from(colleges);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
