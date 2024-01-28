import { Company } from "./company.model";

export interface Process {
    id: string;
    name: string;
    isBaseProcess: boolean;
    companyName: string;
}
