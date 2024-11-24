
export interface Complaint {
    id: string;
    type: number;
    status: number;
    client: string;
    product: string;
    date: Date;
    deadline: Date;
    responsiblePerson: string;
    actions: string;
    whatHappened: string;
    whyItIsProblem: string;
    whenProblemIdentified: Date;
    whereProblemDetected: string;
    howProblemDetected: string;
    whoProblemDetected: string;
    piecesNok: number;
    properProcess: string;
    inconsistencyDetected: string;
    fileNames: string;
  }
  