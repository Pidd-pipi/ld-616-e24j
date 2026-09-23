export const createIntermediateCheckDto = (overrides = {}) => ({ id: 1, check_no: "CHK-0001", standard_no: "STD-001", conclusion: "PASS", operated_by: "quality-manager", operated_at: "2026-09-23T09:00:00Z", ...overrides });

export const createIntermediateCheckSubmitDto = (overrides = {}) => ({ standard_no: "STD-001", check_no: "CHK-0001", conclusion: "PASS", operated_by: "quality-manager", operated_at: "2026-09-23T09:00:00Z", ...overrides });

export const createIntermediateCheckResultDto = (overrides = {}) => ({ check: createIntermediateCheckDto(), standard_status: "AVAILABLE", affected_plan_ids: [], duplicated: false, ...overrides });
