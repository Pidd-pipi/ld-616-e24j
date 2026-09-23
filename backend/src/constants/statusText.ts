import { MeasurementStandardStatus } from "./MeasurementStandardStatus";
import { IntermediateCheckConclusion } from "./IntermediateCheckConclusion";

export const STATUS_TEXT = {
  MeasurementStandard: { AVAILABLE: "可用", OUT_OF_SERVICE: "停用" } as Record<MeasurementStandardStatus, string>,
  IntermediateCheck: { PASS: "合格", FAIL: "不合格" } as Record<IntermediateCheckConclusion, string>
};
