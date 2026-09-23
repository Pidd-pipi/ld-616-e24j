import type { IntermediateCheck } from "../models/IntermediateCheck";

const checks: IntermediateCheck[] = [];

export const intermediateCheckRepository = {
  findAll: (): IntermediateCheck[] => checks,
  findByStandardCode: (standardCode: string): IntermediateCheck[] =>
    checks.filter((c) => c.standard_code === standardCode),
  // 同一核查编号再次提交：返回首次核查记录
  findByCheckNo: (checkNo: string): IntermediateCheck | undefined => checks.find((c) => c.check_no === checkNo),
  save: (row: IntermediateCheck): IntermediateCheck => {
    checks.push(row);
    return row;
  }
};
