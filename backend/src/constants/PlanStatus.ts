export const PlanStatus = ["PLANNED","ASSIGNED","IN_PROGRESS","CERT_UPLOADED","CLOSED","CANCELLED"] as const;
export type PlanStatus = (typeof PlanStatus)[number];

// 待派：退回待派后落到此状态，由调度员决定何时再次派发
export const PLAN_PENDING_DISPATCH: PlanStatus = "PLANNED";
// 尚未完成：依赖标准器且处于这些状态的计划，在标准器核查不合格时退回待派
export const PLAN_UNFINISHED_STATUSES: PlanStatus[] = ["PLANNED","ASSIGNED","IN_PROGRESS"];
// 已签发证书 / 已终结的计划不受影响（含已取消）
export const PLAN_FINISHED_STATUSES: PlanStatus[] = ["CERT_UPLOADED","CLOSED","CANCELLED"];
