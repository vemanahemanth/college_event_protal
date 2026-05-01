import { Router, type IRouter } from "express";
import healthRouter from "./health";
import statsRouter from "./stats";
import eventsRouter from "./events";
import registrationsRouter from "./registrations";
import usersRouter from "./users";
import leaderboardsRouter from "./leaderboards";
import collegesRouter from "./colleges";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/stats", statsRouter);
router.use("/events", eventsRouter);
router.use("/registrations", registrationsRouter);
router.use("/users", usersRouter);
router.use("/leaderboards", leaderboardsRouter);
router.use("/colleges", collegesRouter);

export default router;
