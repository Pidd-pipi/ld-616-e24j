import type { Request, Response, NextFunction } from "express";
import { measurementStandardService } from "../services/MeasurementStandardService";
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

export const measurementStandardController = {
  list: wrap((_req, res) => res.json(measurementStandardService.list())),
  create: wrap((req, res) => res.status(201).json(measurementStandardService.create(req.body)))
};
