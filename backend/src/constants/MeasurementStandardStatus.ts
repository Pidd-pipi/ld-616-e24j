export const MeasurementStandardStatus = ["AVAILABLE","OUT_OF_SERVICE"] as const;
export type MeasurementStandardStatus = (typeof MeasurementStandardStatus)[number];
