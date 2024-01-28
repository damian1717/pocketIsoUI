import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../common/services/base-api.service';
import { EmployeeTraining } from '../models/employee-training.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTrainingService extends BaseApiService {

  constructor(
    protected override http: HttpClient) {
    super(http);
  }

  public getAllEmployeeTrainings(): Observable<any> {
    return this.getAsync<any>(`employeetraining/getallemployeetrainings`);
  }

  public getEmployeeTrainings(employeeId: string, level: number): Observable<EmployeeTraining[]> {
    return this.getAsync<EmployeeTraining[]>(`employeetraining/getemployeetrainings/${employeeId}/${level}`);
  }

  public getEmployeeTrainingById(id: string): Observable<EmployeeTraining> {
    return this.getAsync<EmployeeTraining>(`employeetraining/getemployeetrainingbyid/${id}`);
  }

  public addEmployeeTraining(employee: EmployeeTraining): Observable<EmployeeTraining> {
    return this.postAsync<EmployeeTraining>(`employeetraining/addemployeetrainings`, employee);
  }

  public updateEmployeeTraining(employee: EmployeeTraining): Observable<EmployeeTraining> {
    return this.postAsync<EmployeeTraining>(`employeetraining/updateemployeetrainings`, employee);
  }

  public getLastModifiedRecordData(): Observable<any> {
    return this.getAsync<any>(`employeetraining/getlastmodifiedrecorddata`);
  }

}
