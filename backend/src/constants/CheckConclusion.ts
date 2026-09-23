export const CheckConclusion = ["PASS", "FAIL"] as const;
export type CheckConclusion = (typeof CheckConclusion)[number];
