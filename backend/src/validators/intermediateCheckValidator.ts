import { ERROR_CODES } from "../constants/errorCodes";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { CheckConclusion } from "../constants/CheckConclusion";
import type { IntermediateCheckSubmitPayload } from "../types/IntermediateCheckPayload";

export interface ValidatedIntermediateCheck {
  standard_no: string;
  check_no: string;
  conclusion: string;
  operated_by?: string;
  operated_at?: string;
}

export const validateIntermediateCheckSubmit = (
  payload: IntermediateCheckSubmitPayload
): ValidatedIntermediateCheck => {
  const standardNo = typeof payload.standard_no === "string" ? payload.standard_no.trim() : "";
  const checkNo = typeof payload.check_no === "string" ? payload.check_no.trim() : "";
  const conclusion = typeof payload.conclusion === "string" ? payload.conclusion.trim().toUpperCase() : "";

  if (!standardNo || !checkNo || !conclusion) {
    const error = new Error(ERROR_MESSAGES.CHECK_FIELDS_REQUIRED) as Error & { status?: number; code?: string };
    error.status = 400;
    error.code = ERROR_CODES.VALIDATION_FAILED;
    throw error;
  }

  if (!(CheckConclusion as readonly string[]).includes(conclusion)) {
    const error = new Error(ERROR_MESSAGES.CHECK_CONCLUSION_INVALID) as Error & { status?: number; code?: string };
    error.status = 400;
    error.code = ERROR_CODES.VALIDATION_FAILED;
    throw error;
  }

  return {
    standard_no: standardNo,
    check_no: checkNo,
    conclusion,
    operated_by: typeof payload.operated_by === "string" ? payload.operated_by : undefined,
    operated_at: typeof payload.operated_at === "string" ? payload.operated_at : undefined
  };
};
