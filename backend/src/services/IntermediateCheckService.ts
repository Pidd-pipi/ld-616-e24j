import { intermediateCheckRepository } from "../repositories/IntermediateCheckRepository";
import { measurementStandardRepository } from "../repositories/MeasurementStandardRepository";
import { measurementStandardService } from "./MeasurementStandardService";
import { calibrationPlanRepository } from "../repositories/CalibrationPlanRepository";
import type { IntermediateCheck } from "../models/IntermediateCheck";
import type { CalibrationPlan } from "../models/CalibrationPlan";
import { validateIntermediateCheckSubmit } from "../validators/intermediateCheckValidator";
import { AppError } from "../utils/AppError";
import { ERROR_CODES } from "../constants/errorCodes";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { LOG_TEMPLATES } from "../constants/logTemplates";
import { MeasurementStandardStatus } from "../constants/MeasurementStandardStatus";
import {
  createIntermediateCheckDto,
  buildIntermediateCheckResponse,
  buildIntermediateCheckHistoryResponse
} from "../constructors/IntermediateCheckDtoFactory";
import { formatOperatedAt } from "../utils/formatters";
import type { IntermediateCheckPayload } from "../types/IntermediateCheckPayload";

export const intermediateCheckService = {
  // 提交期间核查
  submit: (payload: IntermediateCheckPayload) => {
    validateIntermediateCheckSubmit(payload);

    const standardCode = String(payload.standard_code).trim();
    const checkNo = String(payload.check_no).trim();
    const conclusion = String(payload.conclusion) as IntermediateCheck["conclusion"];
    const operatedAt = formatOperatedAt(payload.operated_at);

    // 标准器必须存在
    if (!measurementStandardRepository.findByCode(standardCode)) {
      throw new AppError(404, ERROR_CODES.STANDARD_NOT_FOUND, ERROR_MESSAGES.STANDARD_NOT_FOUND);
    }

    // 同一核查编号再次提交：返回首次结论，不改标准器和计划
    const existing = intermediateCheckRepository.findByCheckNo(checkNo);
    if (existing) {
      console.info(LOG_TEMPLATES.IntermediateCheck[1], checkNo);
      return buildIntermediateCheckResponse(existing, existing.affected_plan_codes, true);
    }

    // 首次提交，落核查记录：标准器编号、核查编号、结论、操作时间
    const check = intermediateCheckRepository.save(
      createIntermediateCheckDto({
        id: intermediateCheckRepository.findAll().length + 1,
        standard_code: standardCode,
        check_no: checkNo,
        conclusion,
        operated_at: operatedAt,
        affected_plan_codes: [] as string[]
      }) as IntermediateCheck
    );
    console.info(LOG_TEMPLATES.IntermediateCheck[0], checkNo, conclusion);

    let affectedPlanCodes: string[] = [];

    if (conclusion === "FAIL") {
      // 核查不合格：标准器停用
      measurementStandardService.setStatus(
        standardCode,
        MeasurementStandardStatus[1],
        LOG_TEMPLATES.IntermediateCheck[2]
      );

      // 依赖它且尚未完成的校准计划退回待派，受影响编号一并返回
      const unfinished: CalibrationPlan[] = calibrationPlanRepository.findUnfinishedByStandardCode(standardCode);
      unfinished.forEach((plan) => {
        calibrationPlanRepository.returnToPendingDispatch(plan);
        console.info(LOG_TEMPLATES.IntermediateCheck[4], plan.plan_code);
      });
      affectedPlanCodes = unfinished.map((p) => p.plan_code);

      // 已签发证书保持原样：不触碰 calibration_certificate
      check.affected_plan_codes = affectedPlanCodes;
    } else {
      // 核查合格：标准器保持/恢复可用
      measurementStandardService.setStatus(
        standardCode,
        MeasurementStandardStatus[0],
        LOG_TEMPLATES.IntermediateCheck[3]
      );
    }

    return buildIntermediateCheckResponse(check, affectedPlanCodes, false);
  },

  // 按标准器编号查看核查记录和关联计划
  historyByStandard: (standardCode: string) => {
    if (!measurementStandardRepository.findByCode(standardCode)) {
      throw new AppError(404, ERROR_CODES.STANDARD_NOT_FOUND, ERROR_MESSAGES.STANDARD_NOT_FOUND);
    }
    const checks = intermediateCheckRepository.findByStandardCode(standardCode);
    const relatedPlans = calibrationPlanRepository.findByStandardCode(standardCode);
    console.info(LOG_TEMPLATES.IntermediateCheck[5], standardCode);
    return buildIntermediateCheckHistoryResponse(standardCode, checks, relatedPlans);
  },

  list: () => intermediateCheckRepository.findAll()
};
