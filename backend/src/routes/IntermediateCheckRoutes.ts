import { Router } from "express";
import { intermediateCheckController } from "../controllers/IntermediateCheckController";
import { rbacMiddleware } from "../middlewares/rbacMiddleware";

const router = Router();
// 提交核查：质量经理 / 校准员；查询：任意已认证角色（rbac 由中间件统一处理）
router.post("/", rbacMiddleware(["quality-manager", "calibrator"]), intermediateCheckController.submit);
router.get("/standard/:standardNo", intermediateCheckController.listByStandardNo);

export default router;
