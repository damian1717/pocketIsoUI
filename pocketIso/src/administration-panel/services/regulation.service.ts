import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Regulation } from '../models/regulation.model';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../common/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class RegulationService extends BaseApiService {

  constructor(
    protected override http: HttpClient) {
    super(http);
  }

  public getRegulations(): Observable<Regulation[]> {
    return this.getAsync<Regulation[]>(`regulation/getregulations`);
  }

  public getRegulation(id: string): Observable<Regulation> {
    return this.getAsync<Regulation>(`regulation/getregulation/${id}`);
  }

  public addRegulation(company: Regulation): Observable<Regulation> {
    return this.postAsync<Regulation>(`regulation/addregulation`, company);
  }

  public updateRegulation(company: Regulation): Observable<Regulation> {
    return this.postAsync<Regulation>(`regulation/updateregulation`, company);
  }
}
