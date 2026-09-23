export const createStandardInstrumentDto = (overrides = {}) => ({ id: 1, standard_no: "STD-001", name: "标准器 1", specification: "0~100 Ω 0.01 级", status: "AVAILABLE", ...overrides });
