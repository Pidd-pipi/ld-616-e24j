import type { MeasurementStandard } from "../models/MeasurementStandard";
import { seed } from "../seed";

const standards: MeasurementStandard[] = seed.measurementStandard.map((row) => ({ ...row }));

export const measurementStandardRepository = {
  findAll: (): MeasurementStandard[] => standards,
  findByCode: (standardCode: string): MeasurementStandard | undefined =>
    standards.find((s) => s.standard_code === standardCode),
  save: (row: MeasurementStandard): MeasurementStandard => {
    standards.push(row);
    return row;
  },
  updateStatus: (standard: MeasurementStandard, status: string): MeasurementStandard => {
    standard.status = status;
    return standard;
  }
};
