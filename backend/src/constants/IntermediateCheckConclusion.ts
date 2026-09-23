export const IntermediateCheckConclusion = ["PASS","FAIL"] as const;
export type IntermediateCheckConclusion = (typeof IntermediateCheckConclusion)[number];
