import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SavedQualityPolicy } from '../models/saved-quality-policy.model';
import { QualityPolicy } from '../models/quality-policy.model';
import { BaseApiService } from '../../common/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class SavedQualityPolicyService extends BaseApiService {

  constructor(
    protected override http: HttpClient) {
    super(http);
  }

  public getLastSavedQualityPolicies(): Observable<QualityPolicy[]> {
    return this.getAsync<QualityPolicy[]>(`savedqualitypolicies/getlastsavedqualitypolicy`);
  }

  public addSavedQualityPolicy(items: SavedQualityPolicy[]): Observable<SavedQualityPolicy[]> {
    return this.postAsync<SavedQualityPolicy[]>(`savedqualitypolicies/addsavedqualitypolicy`, items);
  }
}