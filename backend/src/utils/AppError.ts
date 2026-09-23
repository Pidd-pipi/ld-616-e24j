import { ERROR_CODES } from "../constants/errorCodes";

// service / controller 分层包装异常共用的错误类型
export class AppError extends Error {
  status: number;
  code: string;
  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export const validationError = (message: string) => new AppError(400, ERROR_CODES.VALIDATION_FAILED, message);
