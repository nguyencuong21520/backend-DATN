import { Router } from "express";
import courceController from "../controller/course";
import { auth } from "../middleware/auth.middleware";
const router: Router = Router();
router.get("/", courceController.getCourse);
router.get("/auth", auth, courceController.getCourseAuth);
router.get("/auth/:id", auth, courceController.getCourseAuth);


router.post("/create", auth, courceController.create);

export default router;
