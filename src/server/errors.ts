export class PurchaseNotFoundError extends Error {
  readonly code = "NOT_FOUND" as const;

  constructor() {
    super("Purchase not found");
    this.name = "PurchaseNotFoundError";
  }
}

export class ReturnCaseMissingError extends Error {
  readonly code = "NO_RETURN_CASE" as const;

  constructor() {
    super("This purchase has no return case");
    this.name = "ReturnCaseMissingError";
  }
}

export class InvalidReturnStatusTransitionError extends Error {
  readonly code = "INVALID_TRANSITION" as const;

  constructor(from: string, to: string) {
    super(`Cannot change return status from ${from} to ${to}`);
    this.name = "InvalidReturnStatusTransitionError";
  }
}
