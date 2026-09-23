export const StandardStatus = ["AVAILABLE", "DISABLED"] as const;
export type StandardStatus = (typeof StandardStatus)[number];
