import type { IntermediateCheck } from "../models/IntermediateCheck";
import type { CalibrationPlan } from "../models/CalibrationPlan";

export const createIntermediateCheckDto = (overrides = {}) => ({ standard_code: "STD-001", check_no: "CHECK-0001", conclusion: "PASS", operated_at: "2026-09-23T09:00:00Z", ...overrides });

// 提交响应：记录 + 受影响计划编号 + 是否幂等命中
export const buildIntermediateCheckResponse = (check: IntermediateCheck, affectedPlanCodes: string[], idempotent: boolean) => ({
  standard_code: check.standard_code,
  check_no: check.check_no,
  conclusion: check.conclusion,
  operated_at: check.operated_at,
  affected_plan_codes: affectedPlanCodes,
  idempotent
});

// 按标准器查看：核查记录 + 关联计划
export const buildIntermediateCheckHistoryResponse = (
  standardCode: string,
  checks: IntermediateCheck[],
  relatedPlans: CalibrationPlan[]
) => ({
  standard_code: standardCode,
  checks: checks.map((c) => ({
    check_no: c.check_no,
    conclusion: c.conclusion,
    operated_at: c.operated_at,
    affected_plan_codes: c.affected_plan_codes
  })),
  related_plans: relatedPlans.map((p) => ({ plan_code: p.plan_code, status: p.status }))
});
