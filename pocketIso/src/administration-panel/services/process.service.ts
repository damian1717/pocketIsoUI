import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Process } from '../models/process.model';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../common/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessService extends BaseApiService {

  constructor(
    protected override http: HttpClient) {
    super(http);
  }

  public getProcesses(): Observable<Process[]> {
    return this.getAsync<Process[]>(`process/getprocesses`);
  }

  public getProcessesForSuperAdmin(): Observable<Process[]> {
    return this.getAsync<Process[]>(`process/getprocessesforsuperadmin`);
  }

  public getBaseProcesses(): Observable<Process[]> {
    return this.getAsync<Process[]>(`process/getbaseprocesses`);
  }

  public getProcess(id: string): Observable<Process> {
    return this.getAsync<Process>(`process/getprocess/${id}`);
  }

  public addProcess(process: Process): Observable<Process> {
    return this.postAsync<Process>(`process/addprocess`, process);
  }

  public updateProcess(process: Process): Observable<Process> {
    return this.postAsync<Process>(`process/updateprocess`, process);
  }
}
