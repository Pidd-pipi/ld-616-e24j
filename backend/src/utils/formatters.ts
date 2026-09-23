import { STATUS_TEXT } from "../constants/statusText";

export const toAuditTarget = (type: string, id: string | number) => `${type}#${id}`;

// 标准器状态文本
export const formatStandardStatus = (status: string) =>
  STATUS_TEXT.MeasurementStandard[status as keyof typeof STATUS_TEXT.MeasurementStandard] ?? status;

// 核查结论文本
export const formatCheckConclusion = (conclusion: string) =>
  STATUS_TEXT.IntermediateCheck[conclusion as keyof typeof STATUS_TEXT.IntermediateCheck] ?? conclusion;

// 操作时间
export const formatOperatedAt = (operatedAt?: unknown) =>
  typeof operatedAt === "string" && operatedAt.trim() !== "" ? operatedAt : new Date().toISOString();
