import { Router } from "express";
import courceController from "../controller/cource";
const router: Router = Router();
router.get('/', courceController.getCource);
router.post('/create', courceController.create);

router.put('')

export default router;