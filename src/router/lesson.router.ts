import { Router } from "express";
import lessonController from "../controller/lesson";
import lessonMiddleWare from "../middleware/lesson";
import { auth } from "../middleware/auth.middleware";
const router: Router = Router();

router.post(
  "/create/:id",
  lessonMiddleWare.create,
  auth,
  lessonController.create
);

export default router;
