import { Request, Response, Router } from "express";
import userRouter from "./user.router";
import courceRouter from "./course.router";
const router: Router = Router();
router.use('/api/user', userRouter);
router.use('/api/course', courceRouter);
export default router;
