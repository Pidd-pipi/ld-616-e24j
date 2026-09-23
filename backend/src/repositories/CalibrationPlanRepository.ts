import { seed } from "../seed";
import type { CalibrationPlan } from "../models/CalibrationPlan";

const calibrationPlans: CalibrationPlan[] = seed.calibrationPlan.map((row) => ({ ...row }));

export const calibrationPlanRepository = {
  findAll: (): CalibrationPlan[] => calibrationPlans,
  findById: (id: number): CalibrationPlan | undefined => calibrationPlans.find((row) => row.id === id),
  findByStandardId: (standardId: number): CalibrationPlan[] =>
    calibrationPlans.filter((row) => row.standard_id === standardId),
  save: (row: unknown): CalibrationPlan => {
    const plan = row as CalibrationPlan;
    const index = calibrationPlans.findIndex((item) => item.id === plan.id);
    if (index >= 0) {
      calibrationPlans[index] = plan;
    } else {
      calibrationPlans.push(plan);
    }
    return plan;
  }
};
