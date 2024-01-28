import { QualityPolicy } from "./quality-policy.model";

export interface SavedQualityPolicy {
    qualityPolicyId: string;
    qualityPolicy: QualityPolicy;
    isExternal: boolean;
    isInternal: boolean;
  }
  