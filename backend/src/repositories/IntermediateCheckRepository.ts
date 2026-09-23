import { seed } from "../seed";
import type { IntermediateCheck } from "../models/IntermediateCheck";

const intermediateChecks: IntermediateCheck[] = seed.intermediateCheck.map((row) => ({ ...row }));

export const intermediateCheckRepository = {
  findAll: (): IntermediateCheck[] => intermediateChecks,
  findByCheckNo: (checkNo: string): IntermediateCheck | undefined =>
    intermediateChecks.find((row) => row.check_no === checkNo),
  findByStandardNo: (standardNo: string): IntermediateCheck[] =>
    intermediateChecks.filter((row) => row.standard_no === standardNo),
  nextId: (): number =>
    intermediateChecks.reduce((max, row) => Math.max(max, row.id), 0) + 1,
  save: (row: IntermediateCheck): IntermediateCheck => {
    intermediateChecks.push(row);
    return row;
  }
};
