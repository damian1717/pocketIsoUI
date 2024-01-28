import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QualityPolicy } from '../models/quality-policy.model';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../common/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class QualityPolicyService extends BaseApiService {

  constructor(
    protected override http: HttpClient) {
    super(http);
  }

  public getQualityPolicies(): Observable<QualityPolicy[]> {
    return this.getAsync<QualityPolicy[]>(`qualitypolicies/getqualitypolicies`);
  }

  public getQualityPolicy(id: string): Observable<QualityPolicy> {
    return this.getAsync<QualityPolicy>(`qualitypolicies/getqualitypolicy/${id}`);
  }

  public addQualityPolicy(qualityPolicy: QualityPolicy): Observable<QualityPolicy> {
    return this.postAsync<QualityPolicy>(`qualitypolicies/addqualitypolicy`, qualityPolicy);
  }

  public updateQualityPolicy(qualityPolicy: QualityPolicy): Observable<QualityPolicy> {
    return this.postAsync<QualityPolicy>(`qualitypolicies/updatequalitypolicy`, qualityPolicy);
  }
}