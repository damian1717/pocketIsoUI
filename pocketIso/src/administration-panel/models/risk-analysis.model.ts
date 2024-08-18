export interface RiskAnalysis {
    id: string;
    processId: string;
    processType: number;
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
  }
  