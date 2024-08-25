export interface RiskAnalysis {
    id: string;
    processId: string;
    type: number;
    riskType: number;
    definedIssue: string;
    potentialCause: string;
    degree: number;
    occurrence: number;
    preventiveAction: string;
    personForSystemImplementation: string;
    plannedSystemImplementationDate: Date;
    realSystemImplementationDate: Date;
    implementationStatus: string;
    systemPerformance: string;
    dateEffectivenessOfSystemOperation: Date;
    degreeAction: number;
    occurrenceAction: number;
    emergencyPlan: string;
    personForEmergencyPlan: string;
    assessmentOfVerificationEffectiveness: string;
    ownerOfProcess: string;
    changedFields: string;
    rate: number;
    rate2: number;
    rateClass: string;
    rate2Class: string;
    currentUpdateId: string;
  }
  