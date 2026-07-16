import type { FailureMode, SourceId, SourceRecord } from "./types";

export type AdapterFetchResult =
  | { ok: true; records: SourceRecord[] }
  | { ok: false; error: string; retryable: boolean };

/** Deterministic mock of a legacy adapter call for one source. */
export function fetchFromAdapter(
  sourceId: SourceId,
  records: SourceRecord[],
  failureMode: FailureMode,
  attempt: number
): AdapterFetchResult {
  if (failureMode === "timeout" && attempt < 2) {
    return {
      ok: false,
      error: `${sourceId.toUpperCase()} adapter timeout after 8s (attempt ${attempt})`,
      retryable: true,
    };
  }

  if (failureMode === "bad_payload") {
    const poisoned = records.map((record, index) => {
      if (index !== 0) return record;
      return {
        ...record,
        payload: {
          ...record.payload,
          __corrupt: true,
          status: null,
        },
      };
    });
    return { ok: true, records: poisoned };
  }

  if (failureMode === "duplicate") {
    // Emit the same batch twice so the pipeline must stay idempotent.
    return { ok: true, records: [...records, ...records] };
  }

  return { ok: true, records };
}

export function mapRecord(record: SourceRecord): Record<string, unknown> {
  switch (record.sourceId) {
    case "hr":
      return {
        type: "employee",
        externalId: record.externalId,
        fullName: `${record.payload.firstName ?? ""} ${record.payload.lastName ?? ""}`.trim(),
        costCenter: record.payload.costCenter,
        employmentStatus: record.payload.status,
        hireDate: record.payload.hireDate,
      };
    case "policy":
      return {
        type: "policy",
        externalId: record.externalId,
        holderExternalId: record.payload.holderExternalId,
        product: record.payload.product,
        eligibility: record.payload.eligibility,
        faceAmount: record.payload.faceAmount,
        status: record.payload.status,
      };
    case "gl":
      return {
        type: "ledger",
        externalId: record.externalId,
        costCenter: record.payload.costCenter,
        account: record.payload.account,
        period: record.payload.period,
        balance: record.payload.balance,
      };
  }
}

export function validateMapped(
  sourceId: SourceId,
  mapped: Record<string, unknown>,
  raw: SourceRecord
): { ok: true } | { ok: false; error: string } {
  if (raw.payload.__corrupt === true || mapped.status === null) {
    return { ok: false, error: "Validation failed: malformed legacy payload" };
  }

  if (sourceId === "hr") {
    if (!mapped.fullName || !mapped.costCenter) {
      return { ok: false, error: "Validation failed: employee missing name or cost center" };
    }
  }

  if (sourceId === "policy") {
    if (!mapped.holderExternalId || mapped.faceAmount == null) {
      return { ok: false, error: "Validation failed: policy missing holder or face amount" };
    }
  }

  if (sourceId === "gl") {
    if (!mapped.account || mapped.balance == null) {
      return { ok: false, error: "Validation failed: ledger missing account or balance" };
    }
  }

  return { ok: true };
}
