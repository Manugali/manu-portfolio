import type { LegacySource, SourceId, SourceRecord } from "./types";

export const SOURCE_META: Omit<LegacySource, "health" | "lastSyncAt" | "failureMode" | "recordCount">[] =
  [
    {
      id: "hr",
      name: "Legacy HR",
      system: "PeopleSoft HR 9.2",
      protocol: "SOAP / XML",
      description: "Employee master, cost centers, and termination flags.",
    },
    {
      id: "policy",
      name: "Policy Admin",
      system: "PolicyMainframe",
      protocol: "Batch flat-file",
      description: "Active policies, riders, and payout eligibility codes.",
    },
    {
      id: "gl",
      name: "General Ledger",
      system: "GL Classic",
      protocol: "REST (legacy)",
      description: "Cost centers, account mappings, and posting periods.",
    },
  ];

function employees(): SourceRecord[] {
  return [
    {
      externalId: "EMP-1001",
      sourceId: "hr",
      payload: {
        firstName: "Asha",
        lastName: "Patel",
        costCenter: "CC-410",
        status: "active",
        hireDate: "2019-04-12",
      },
    },
    {
      externalId: "EMP-1002",
      sourceId: "hr",
      payload: {
        firstName: "Marcus",
        lastName: "Nguyen",
        costCenter: "CC-220",
        status: "active",
        hireDate: "2021-08-03",
      },
    },
    {
      externalId: "EMP-1003",
      sourceId: "hr",
      payload: {
        firstName: "Elena",
        lastName: "Ruiz",
        costCenter: "CC-410",
        status: "leave",
        hireDate: "2017-11-21",
      },
    },
    {
      externalId: "EMP-1004",
      sourceId: "hr",
      payload: {
        firstName: "Jordan",
        lastName: "Blake",
        costCenter: "CC-105",
        status: "active",
        hireDate: "2023-01-16",
      },
    },
    {
      externalId: "EMP-1005",
      sourceId: "hr",
      payload: {
        firstName: "Priya",
        lastName: "Shah",
        costCenter: "CC-220",
        status: "terminated",
        hireDate: "2018-06-01",
      },
    },
  ];
}

function policies(): SourceRecord[] {
  return [
    {
      externalId: "POL-55001",
      sourceId: "policy",
      payload: {
        holderExternalId: "EMP-1001",
        product: "Term Life",
        eligibility: "payout_ready",
        faceAmount: 250000,
        status: "in_force",
      },
    },
    {
      externalId: "POL-55002",
      sourceId: "policy",
      payload: {
        holderExternalId: "EMP-1002",
        product: "Whole Life",
        eligibility: "review",
        faceAmount: 100000,
        status: "in_force",
      },
    },
    {
      externalId: "POL-55003",
      sourceId: "policy",
      payload: {
        holderExternalId: "EMP-1003",
        product: "Term Life",
        eligibility: "payout_ready",
        faceAmount: 500000,
        status: "in_force",
      },
    },
    {
      externalId: "POL-55004",
      sourceId: "policy",
      payload: {
        holderExternalId: "EMP-1004",
        product: "Universal Life",
        eligibility: "blocked",
        faceAmount: 75000,
        status: "pending",
      },
    },
  ];
}

function ledger(): SourceRecord[] {
  return [
    {
      externalId: "GL-CC-410",
      sourceId: "gl",
      payload: {
        costCenter: "CC-410",
        account: "6210-Payouts",
        period: "2026-07",
        balance: 128450.25,
      },
    },
    {
      externalId: "GL-CC-220",
      sourceId: "gl",
      payload: {
        costCenter: "CC-220",
        account: "6210-Payouts",
        period: "2026-07",
        balance: 64210.0,
      },
    },
    {
      externalId: "GL-CC-105",
      sourceId: "gl",
      payload: {
        costCenter: "CC-105",
        account: "6210-Payouts",
        period: "2026-07",
        balance: 22100.5,
      },
    },
  ];
}

export function createSeedRecords(): SourceRecord[] {
  return [...employees(), ...policies(), ...ledger()];
}

export function recordsForSource(sourceId: SourceId, all: SourceRecord[]): SourceRecord[] {
  return all.filter((r) => r.sourceId === sourceId);
}
