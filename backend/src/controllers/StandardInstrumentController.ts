import type { Request, Response } from "express";
import { standardInstrumentService } from "../services/StandardInstrumentService";

export const standardInstrumentController = {
  list: (_req: Request, res: Response) => res.json(standardInstrumentService.list()),
  getByNo: (req: Request, res: Response) =>
    res.json(standardInstrumentService.getByNo(req.params.standardNo))
};
