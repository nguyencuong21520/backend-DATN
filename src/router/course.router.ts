import { Router } from "express";
import courceController from "../controller/course";
import { auth } from "../middleware/auth.middleware";
const router: Router = Router();
router.get("/", courceController.getCource);
router.post("/create", auth, courceController.create);

export default router;
