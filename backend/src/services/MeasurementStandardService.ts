import { measurementStandardRepository } from "../repositories/MeasurementStandardRepository";
import { buildMeasurementStandardResponse } from "../constructors/MeasurementStandardDtoFactory";
import { AppError } from "../utils/AppError";
import { ERROR_CODES } from "../constants/errorCodes";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { LOG_TEMPLATES } from "../constants/logTemplates";

export const measurementStandardService = {
  list: () => measurementStandardRepository.findAll().map(buildMeasurementStandardResponse),

  getByCode: (standardCode: string) => {
    const standard = measurementStandardRepository.findByCode(standardCode);
    if (!standard) {
      throw new AppError(404, ERROR_CODES.STANDARD_NOT_FOUND, ERROR_MESSAGES.STANDARD_NOT_FOUND);
    }
    return standard;
  },

  // service 层包装：标准器停用 / 恢复
  setStatus: (standardCode: string, status: string, logTemplate: string) => {
    const standard = measurementStandardService.getByCode(standardCode);
    measurementStandardRepository.updateStatus(standard, status);
    console.info(logTemplate, standard.standard_code, status);
    return standard;
  },

  create: (row: unknown) => {
    const created = measurementStandardRepository.save(row as never);
    console.info(LOG_TEMPLATES.MeasurementStandard[0], created.standard_code);
    return buildMeasurementStandardResponse(created);
  }
};
