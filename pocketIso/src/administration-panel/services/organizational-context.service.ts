import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from '../../common/services/base-api.service';
import { OrganizationalContext } from '../models/organizational-context.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationalContextService extends BaseApiService {

  constructor(
    protected override http: HttpClient) {
    super(http);
  }

  public getOrganizationalContextByUserId(): Observable<OrganizationalContext> {
    return this.getAsync<OrganizationalContext>(`organizationalcontext/getorganizationalcontextbyuserid`);
  }

  public addOrganizationalContext(organizationalContext: OrganizationalContext): Observable<OrganizationalContext> {
    return this.postAsync<OrganizationalContext>(`organizationalcontext/addorganizationalcontext`, organizationalContext);
  }

  public updateOrganizationalContext(organizationalContext: OrganizationalContext): Observable<OrganizationalContext> {
    return this.postAsync<OrganizationalContext>(`organizationalcontext/updatedeorganizationalcontext`, organizationalContext);
  }

}
