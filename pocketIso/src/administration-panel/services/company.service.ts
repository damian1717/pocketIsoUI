import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../common/services/base-api.service';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseApiService {

  constructor(
    protected override http: HttpClient) {
    super(http);
  }

  public getCompanies(): Observable<Company[]> {
    return this.getAsync<Company[]>(`company/getcompanies`);
  }

  public getCompany(id: string): Observable<Company> {
    return this.getAsync<Company>(`company/getcompany/${id}`);
  }

  public addCompany(company: Company): Observable<Company> {
    return this.postAsync<Company>(`company/addcompany`, company);
  }

  public updateCompany(company: Company): Observable<Company> {
    return this.postAsync<Company>(`company/updatecompany`, company);
  }
}
