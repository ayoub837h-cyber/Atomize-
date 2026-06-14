export const LIMITS = {
  free: {
    messages: 10,
    pdfs: 2,
  },
  pro: {
    messages: 200,
    pdfs: 20,
  },
  business: {
    messages: Infinity,
    pdfs: Infinity,
  },
};

export type PlanType = keyof typeof LIMITS;

/**
 * Checks if a user can send a message based on their plan and current usage.
 */
export const canSendMessage = (plan: PlanType, used: number) => {
  return used < (LIMITS[plan]?.messages ?? 0);
};

/**
 * Checks if a user can upload a PDF based on their plan and current usage.
 */
export const canUploadPDF = (plan: PlanType, used: number) => {
  return used < (LIMITS[plan]?.pdfs ?? 0);
};

/**
 * Determines if the usage counters should be reset based on the stored reset date.
 */
export const shouldReset = (resetDate: string) => {
  if (!resetDate) return false;
  return new Date() > new Date(resetDate);
};
