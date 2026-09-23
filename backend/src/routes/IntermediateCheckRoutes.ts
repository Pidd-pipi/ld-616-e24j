import { Router } from "express";
import { intermediateCheckController } from "../controllers/IntermediateCheckController";

const router = Router();
// 提交期间核查：记录标准器编号、核查编号、结论、操作时间
router.post("/", intermediateCheckController.submit);
router.get("/", intermediateCheckController.list);
// 按标准器编号查看核查记录和关联计划
router.get("/standard/:standardCode", intermediateCheckController.history);

export default router;
