export class EmployeeTraining {
  constructor(public id: string,
    public name: string,
    public trainingId: string,
    public required: boolean,
    public trainingDate: Date,
    public skillLevel: number,
    public level: number,
    public employeeId: string,
    public finished: boolean,
    public employeeType: string) { }
}
