import { standardInstrumentRepository } from "../repositories/StandardInstrumentRepository";

export const standardInstrumentService = {
  list: () => standardInstrumentRepository.findAll(),
  getByNo: (standardNo: string) => standardInstrumentRepository.findByNo(standardNo)
};
