import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/common/services/base-api.service';
import { Audit } from '../models/audit.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditService extends BaseApiService {

  constructor(
    protected override http: HttpClient) {
    super(http);
  }

  public getAudits(): Observable<Audit[]> {
    return this.getAsync<Audit[]>(`audit/getaudits`);
  }

  public getAudit(id: string): Observable<Audit> {
    return this.getAsync<Audit>(`audit/getaudit/${id}`);
  }

  public addAudit(audit: Audit): Observable<Audit> {
    return this.postAsync<Audit>(`audit/addaudit`, audit);
  }

  public updateAudit(audit: Audit): Observable<Audit> {
    return this.postAsync<Audit>(`audit/updateaudit`, audit);
  }

  public deleteAudit(id: string): Observable<Audit> {
    return this.deleteAsync<Audit>(`audit/delete/${id}`);
  }
}
