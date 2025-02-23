export interface Audit {
  id: string;
  type: string;
  name: string;
  status: string;
  auditDate: Date;
  auditor: string
}