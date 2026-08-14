import {
  PERSISTED_RETURN_STATUSES,
  type ReturnStatus,
} from "@/entities/return-case/model/types";

export function nextReturnStatus(status: ReturnStatus): ReturnStatus | null {
  const index = PERSISTED_RETURN_STATUSES.indexOf(status);
  if (index < 0 || index >= PERSISTED_RETURN_STATUSES.length - 1) {
    return null;
  }

  return PERSISTED_RETURN_STATUSES[index + 1];
}

export function isValidReturnStatusTransition(
  from: ReturnStatus,
  to: ReturnStatus,
): boolean {
  return nextReturnStatus(from) === to;
}
