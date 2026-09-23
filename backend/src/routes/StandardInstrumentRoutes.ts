import { Router } from "express";
import { standardInstrumentController } from "../controllers/StandardInstrumentController";

const router = Router();
router.get("/", standardInstrumentController.list);
router.get("/:standardNo", standardInstrumentController.getByNo);

export default router;
