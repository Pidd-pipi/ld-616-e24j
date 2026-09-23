import { intermediateCheckRepository } from "../repositories/IntermediateCheckRepository";
import { standardInstrumentRepository } from "../repositories/StandardInstrumentRepository";
import { calibrationPlanRepository } from "../repositories/CalibrationPlanRepository";
import { validateIntermediateCheckSubmit } from "../validators/intermediateCheckValidator";
import { createIntermediateCheckResultDto } from "../constructors/IntermediateCheckDtoFactory";
import { formatCheckConclusionText, formatStandardStatusText } from "../utils/formatters";
import { LOG_TEMPLATES } from "../constants/logTemplates";
import { ERROR_CODES } from "../constants/errorCodes";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import type { IntermediateCheckSubmitPayload } from "../types/IntermediateCheckPayload";
import type { IntermediateCheck } from "../models/IntermediateCheck";
import type { CalibrationPlan } from "../models/CalibrationPlan";

// 已完成/终止的计划不受停用影响：已关闭、已取消、已上传证书（证书已签发保持原样）
const PROTECTED_PLAN_STATUS = ["CERT_UPLOADED", "CLOSED", "CANCELLED"];

const buildNotFoundError = (standardNo: string) => {
  const error = new Error(`${ERROR_MESSAGES.STANDARD_NOT_FOUND}: ${standardNo}`) as Error & {
    status?: number;
    code?: string;
  };
  error.status = 404;
  error.code = ERROR_CODES.STANDARD_NOT_FOUND;
  return error;
};

const audit = (action: string, detail: Record<string, unknown>) => {
  console.info("audit", action, JSON.stringify(detail));
};

export const intermediateCheckService = {
  submit: (payload: IntermediateCheckPayload, actor?: string) => {
    const input = validateIntermediateCheckSubmit(payload);

    // 同一核查编号再次提交：直接返回首次结论，标准器和计划不做任何改动
    const existing = intermediateCheckRepository.findByCheckNo(input.check_no);
    if (existing) {
      audit(LOG_TEMPLATES.IntermediateCheck[1], {
        check_no: existing.check_no,
        standard_no: existing.standard_no,
        conclusion: existing.conclusion
      });
      const standard = standardInstrumentRepository.findByNo(existing.standard_no);
      return createIntermediateCheckResultDto({
        check: existing,
        standard_status: standard?.status ?? "AVAILABLE",
        standard_status_text: formatStandardStatusText(standard?.status ?? "AVAILABLE"),
        affected_plan_ids: [],
        returned_plan_ids: [],
        duplicated: true
      });
    }

    const standard = standardInstrumentRepository.findByNo(input.standard_no);
    if (!standard) {
      throw buildNotFoundError(input.standard_no);
    }

    const operatedBy = input.operated_by ?? actor ?? "quality-manager";
    const operatedAt = input.operated_at ?? new Date().toISOString();
    const record: IntermediateCheck = {
      id: intermediateCheckRepository.nextId(),
      check_no: input.check_no,
      standard_no: input.standard_no,
      conclusion: input.conclusion,
      operated_by: operatedBy,
      operated_at: operatedAt
    };
    intermediateCheckRepository.save(record);
    audit(LOG_TEMPLATES.IntermediateCheck[0], {
      check_no: record.check_no,
      standard_no: record.standard_no,
      conclusion: formatCheckConclusionText(record.conclusion)
    });

    const dependentPlans = calibrationPlanRepository.findByStandardId(standard.id);
    const affectedPlanIds: number[] = [];
    const returnedPlanIds: number[] = [];
    const pendingDispatchPlanIds: number[] = [];

    if (record.conclusion === "FAIL") {
      // 核查不合格：标准器停用；依赖它且尚未完成的计划退回待派；已签发证书保持原样
      standard.status = "DISABLED";
      standardInstrumentRepository.save(standard);
      audit(LOG_TEMPLATES.IntermediateCheck[2], {
        standard_no: standard.standard_no,
        status: formatStandardStatusText(standard.status)
      });

      dependentPlans.forEach((plan: CalibrationPlan) => {
        if (!PROTECTED_PLAN_STATUS.includes(plan.status)) {
          affectedPlanIds.push(plan.id);
          if (plan.status !== "PLANNED") {
            plan.status = "PLANNED";
            plan.assigned_vendor_id = 0;
            calibrationPlanRepository.save(plan);
            returnedPlanIds.push(plan.id);
            audit(LOG_TEMPLATES.IntermediateCheck[4], {
              plan_id: plan.id,
              standard_no: standard.standard_no,
              status: "PLANNED"
            });
          }
        }
      });
    } else if (record.conclusion === "PASS") {
      // 重新核查合格：标准器恢复可用；退回的计划仍由调度员决定何时派发，不自动派发
      if (standard.status === "DISABLED") {
        standard.status = "AVAILABLE";
        standardInstrumentRepository.save(standard);
        audit(LOG_TEMPLATES.IntermediateCheck[3], {
          standard_no: standard.standard_no,
          status: formatStandardStatusText(standard.status)
        });
      }
    }

    dependentPlans
      .filter((plan) => plan.status === "PLANNED")
      .forEach((plan) => pendingDispatchPlanIds.push(plan.id));

    return createIntermediateCheckResultDto({
      check: record,
      standard_status: standard.status,
      standard_status_text: formatStandardStatusText(standard.status),
      affected_plan_ids: affectedPlanIds,
      returned_plan_ids: returnedPlanIds,
      pending_dispatch_plan_ids: pendingDispatchPlanIds,
      duplicated: false
    });
  },

  listByStandardNo: (standardNo: string) => {
    const standard = standardInstrumentRepository.findByNo(standardNo);
    if (!standard) {
      throw buildNotFoundError(standardNo);
    }
    audit(LOG_TEMPLATES.IntermediateCheck[5], { standard_no: standardNo });

    const checks = intermediateCheckRepository.findByStandardNo(standardNo).map((row) => ({
      ...row,
      conclusion_text: formatCheckConclusionText(row.conclusion)
    }));
    // 关联计划：依赖这台标准器的全部校准计划（含退回待派、已完成、已签发证书的计划）
    const relatedPlans = calibrationPlanRepository.findByStandardId(standard.id).map((plan) => ({
      ...plan,
      protected: PROTECTED_PLAN_STATUS.includes(plan.status)
    }));

    return {
      standard: {
        ...standard,
        status_text: formatStandardStatusText(standard.status)
      },
      checks,
      related_plans: relatedPlans,
      pending_dispatch_plan_ids: relatedPlans
        .filter((plan) => plan.status === "PLANNED")
        .map((plan) => plan.id)
    };
  }
};

type IntermediateCheckPayload = IntermediateCheckSubmitPayload;
