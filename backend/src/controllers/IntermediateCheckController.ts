import type { Request, Response, NextFunction } from "express";
import { intermediateCheckService } from "../services/IntermediateCheckService";
import { AppError } from "../utils/AppError";
import { ERROR_CODES } from "../constants/errorCodes";

// controller 层独立包装异常，与 service 层分离
const wrap = (handler: (req: Request, res: Response) => unknown) => (req: Request, res: Response, next: NextFunction) => {
  try {
    return handler(req, res);
  } catch (err) {
    if (err instanceof AppError) return next(err);
    return next(new AppError(500, ERROR_CODES.VALIDATION_FAILED, (err as Error).message));
  }
};

export const intermediateCheckController = {
  // 提交期间核查
  submit: wrap((req, res) => res.status(201).json(intermediateCheckService.submit(req.body))),
  // 按标准器编号查看核查记录和关联计划
  history: wrap((req, res) => res.json(intermediateCheckService.historyByStandard(req.params.standardCode))),
  list: wrap((_req, res) => res.json(intermediateCheckService.list()))
};
