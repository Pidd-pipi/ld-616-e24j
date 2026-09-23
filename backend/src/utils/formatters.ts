export const toAuditTarget = (type: string, id: string | number) => `${type}#${id}`;

export const formatStandardStatusText = (status: string): string => {
  switch (status) {
    case "AVAILABLE":
      return "可用";
    case "DISABLED":
      return "停用";
    default:
      return status;
  }
};

export const formatCheckConclusionText = (conclusion: string): string => {
  switch (conclusion) {
    case "PASS":
      return "合格";
    case "FAIL":
      return "不合格";
    default:
      return conclusion;
  }
};
