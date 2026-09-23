import { Router } from "express";
import { measurementStandardController } from "../controllers/MeasurementStandardController";

const router = Router();
router.get("/", measurementStandardController.list);
router.post("/", measurementStandardController.create);

export default router;
