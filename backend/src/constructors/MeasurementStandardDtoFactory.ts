import type { MeasurementStandard } from "../models/MeasurementStandard";

export const createMeasurementStandardDto = (overrides = {}) => ({ id: 1, standard_code: "STD-001", name: "多功能校准源", specification: "5520A", owner_dept: "计量室", status: "AVAILABLE", ...overrides });

// 响应对象：标准器 + 状态文案
export const buildMeasurementStandardResponse = (standard: MeasurementStandard) => ({
  id: standard.id,
  standard_code: standard.standard_code,
  name: standard.name,
  specification: standard.specification,
  owner_dept: standard.owner_dept,
  status: standard.status
});
