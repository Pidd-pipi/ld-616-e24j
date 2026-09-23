import type { CalibrationPlan } from "../models/CalibrationPlan";
import { PLAN_UNFINISHED_STATUSES, PLAN_PENDING_DISPATCH } from "../constants/PlanStatus";
import { seed } from "../seed";

const plans: CalibrationPlan[] = seed.calibrationPlan.map((row) => ({ ...row }));

export const calibrationPlanRepository = {
  findAll: (): CalibrationPlan[] => plans,
  save: (row: unknown) => row,
  // 依赖指定标准器的校准计划
  findByStandardCode: (standardCode: string): CalibrationPlan[] => plans.filter((p) => p.standard_code === standardCode),
  // 依赖指定标准器且尚未完成的校准计划
  findUnfinishedByStandardCode: (standardCode: string): CalibrationPlan[] =>
    plans.filter((p) => p.standard_code === standardCode && PLAN_UNFINISHED_STATUSES.includes(p.status as never)),
  // 退回待派：状态置为 PLANNED，由调度员稍后决定何时派发
  returnToPendingDispatch: (plan: CalibrationPlan): CalibrationPlan => {
    plan.status = PLAN_PENDING_DISPATCH;
    return plan;
  }
};
