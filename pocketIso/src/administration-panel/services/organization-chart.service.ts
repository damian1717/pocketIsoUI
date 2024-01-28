import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrganizationChartPersonInfo } from '../models/organization-chart-person-info.model';
import { BaseApiService } from '../../common/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationChartService extends BaseApiService {

  constructor(
    protected override http: HttpClient) {
    super(http);
  }

  public getPersonsListOrganizationChart(): Observable<OrganizationChartPersonInfo[]> {
    return this.getAsync<OrganizationChartPersonInfo[]>(`organizationchart/GetPersonsListOrganizationChart`);
  }

  public getPersonOrganizationChart(id: string): Observable<OrganizationChartPersonInfo> {
    return this.getAsync<OrganizationChartPersonInfo>(`organizationchart/GetPersonOrganizationChart/${id}`);
  }

  public getOrganizationChartMaxLevel(): Observable<number> {
    return this.getAsync<number>('organizationchart/getorganizationchartmaxlevel');
  }

  public addOrganizationChartPerson(organizationChartPersonInfo: OrganizationChartPersonInfo): Observable<OrganizationChartPersonInfo> {
    return this.postAsync<OrganizationChartPersonInfo>(`organizationchart/AddOrganizationChartPerson`, organizationChartPersonInfo);
  }

  public updateOrganizationChartPerson(organizationChartPersonInfo: OrganizationChartPersonInfo): Observable<OrganizationChartPersonInfo> {
    return this.postAsync<OrganizationChartPersonInfo>(`organizationchart/UpdateOrganizationChartPerson`, organizationChartPersonInfo);
  }

  public deletePersonOrganizationChart(id: string): Observable<OrganizationChartPersonInfo> {
    return this.deleteAsync<OrganizationChartPersonInfo>(`organizationchart/DeleteOrganizationChartPerson/${id}`);
  }
}
