import { validationError } from "../utils/AppError";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { IntermediateCheckConclusion } from "../constants/IntermediateCheckConclusion";
import type { IntermediateCheckPayload } from "../types/IntermediateCheckPayload";

// 期间核查提交入参校验：标准器编号、核查编号、结论必填；操作时间可缺省（服务端补当前时间）
export const validateIntermediateCheckSubmit = (payload: IntermediateCheckPayload) => {
  if (!payload || typeof payload !== "object") throw validationError(ERROR_MESSAGES.VALIDATION_FAILED);
  if (!payload.standard_code || String(payload.standard_code).trim() === "") {
    throw validationError(ERROR_MESSAGES.STANDARD_CODE_MISSING);
  }
  if (!payload.check_no || String(payload.check_no).trim() === "") {
    throw validationError(ERROR_MESSAGES.CHECK_NO_MISSING);
  }
  if (!IntermediateCheckConclusion.includes(payload.conclusion as never)) {
    throw validationError(ERROR_MESSAGES.CHECK_CONCLUSION_INVALID);
  }
};
