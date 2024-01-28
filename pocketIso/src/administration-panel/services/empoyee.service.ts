import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../common/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class EmpoyeeService extends BaseApiService {

  constructor(
    protected override http: HttpClient) {
    super(http);
  }

  public getEmployees(): Observable<Employee[]> {
    return this.getAsync<Employee[]>(`employee/getemployees`);
  }

  public getEmployee(id: string): Observable<Employee> {
    return this.getAsync<Employee>(`employee/getemployee/${id}`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.postAsync<Employee>(`employee/addemployee`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.postAsync<Employee>(`employee/updateemployee`, employee);
  }

  public deleteEmployee(id: string): Observable<Employee> {
    return this.deleteAsync<Employee>(`employee/delete/${id}`);
  }

}
