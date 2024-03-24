import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from '../../common/services/base-api.service';
import { SubProcess } from '../models/sub-process.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubProcessService extends BaseApiService {

  constructor(
    protected override http: HttpClient) {
    super(http);
  }

  public getSubProcesses(subProcessType: number): Observable<SubProcess[]> {
    return this.getAsync<SubProcess[]>(`subprocess/getsubprocesses/${subProcessType}`);
  }

  public getSubProcess(id: string): Observable<SubProcess> {
    return this.getAsync<SubProcess>(`subprocess/getsubprocess/${id}`);
  }

  public addSubProcess(subProcess: SubProcess): Observable<SubProcess> {
    return this.postAsync<SubProcess>(`subprocess/addsubprocess`, subProcess);
  }

  public updateSubProcess(subProcess: SubProcess): Observable<SubProcess> {
    return this.postAsync<SubProcess>(`subprocess/updatesubprocess`, subProcess);
  }

  public deleteSubProcess(id: string): Observable<SubProcess> {
    return this.deleteAsync<SubProcess>(`subprocess/deletesubprocess/${id}`);
  }

}
