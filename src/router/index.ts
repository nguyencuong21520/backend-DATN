import { Request, Response, Router } from "express";
import userRouter from "./user.router";
import courceRouter from "./course.router";
import unitRouter from "./unit.router"
const router: Router = Router();
router.use('/api/user', userRouter);
router.use('/api/course', courceRouter);
router.use('/api/unit', unitRouter);

export default router;
