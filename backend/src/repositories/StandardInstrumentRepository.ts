import { seed } from "../seed";
import type { StandardInstrument } from "../models/StandardInstrument";

const standardInstruments: StandardInstrument[] = seed.standardInstrument.map((row) => ({ ...row }));

export const standardInstrumentRepository = {
  findAll: (): StandardInstrument[] => standardInstruments,
  findByNo: (standardNo: string): StandardInstrument | undefined =>
    standardInstruments.find((row) => row.standard_no === standardNo),
  save: (row: StandardInstrument): StandardInstrument => {
    const index = standardInstruments.findIndex((item) => item.id === row.id);
    if (index >= 0) {
      standardInstruments[index] = row;
    } else {
      standardInstruments.push(row);
    }
    return row;
  }
};
