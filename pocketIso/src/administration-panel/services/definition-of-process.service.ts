import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../common/services/base-api.service';
import { DefineOfProcess } from '../models/define-of-process.model';

@Injectable({
  providedIn: 'root'
})
export class DefinitionOfProcessService extends BaseApiService {

  constructor(
    protected override http: HttpClient) {
    super(http);
  }

  public getDefinitionOfProcess(processId: string): Observable<DefineOfProcess[]> {
    return this.getAsync<DefineOfProcess[]>(`definitionofprocess/getdefinitionofprocess/${processId}`);
  }

  public getBaseDefinitionOfProcess(processId: string): Observable<DefineOfProcess[]> {
    return this.getAsync<DefineOfProcess[]>(`definitionofprocess/getbasedefinitionofprocess/${processId}`);
  }

  public getDefinitionOfProcessById(id: string): Observable<DefineOfProcess> {
    return this.getAsync<DefineOfProcess>(`definitionofprocess/getdefinitionofprocessbyid/${id}`);
  }

  public addDefineOfProcess(company: DefineOfProcess): Observable<DefineOfProcess> {
    return this.postAsync<DefineOfProcess>(`definitionofprocess/adddefinitionofprocess`, company);
  }

  public updateDefineOfProcess(company: DefineOfProcess): Observable<DefineOfProcess> {
    return this.postAsync<DefineOfProcess>(`definitionofprocess/updatedefinitionofprocess`, company);
  }

  public deleteDefineOfProcess(id: string): Observable<DefineOfProcess> {
    return this.deleteAsync<DefineOfProcess>(`definitionofprocess/deletedefinitionofprocess/${id}`);
  }
}
