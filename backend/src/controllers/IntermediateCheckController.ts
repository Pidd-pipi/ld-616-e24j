import type { Request, Response } from "express";
import { intermediateCheckService } from "../services/IntermediateCheckService";
import type { IntermediateCheckSubmitPayload } from "../types/IntermediateCheckPayload";

export const intermediateCheckController = {
  submit: (req: Request, res: Response) =>
    res
      .status(201)
      .json(
        intermediateCheckService.submit(
          req.body as IntermediateCheckSubmitPayload,
          (req as unknown as { user?: { role?: string } }).user?.role
        )
      ),
  listByStandardNo: (req: Request, res: Response) =>
    res.json(intermediateCheckService.listByStandardNo(req.params.standardNo))
};
