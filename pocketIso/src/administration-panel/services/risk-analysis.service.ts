import { Injectable } from '@angular/core';
import { BaseApiService } from '../../common/services/base-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RiskAnalysis } from '../models/risk-analysis.model';

@Injectable({
  providedIn: 'root'
})
export class RiskAnalysisService extends BaseApiService {

  constructor(
    protected override http: HttpClient) {
    super(http);
  }

  public getRiskAnalys(id: string): Observable<RiskAnalysis> {
    return this.getAsync<RiskAnalysis>(`riskanalysis/getriskanalys/${id}`);
  }

  public getRiskAnalysByProcessId(processId: string): Observable<RiskAnalysis> {
    return this.getAsync<RiskAnalysis>(`riskanalysis/getriskanalysbyprocessid/${processId}`);
  }

  public addRiskAnalysis(risk: RiskAnalysis): Observable<string> {
    return this.postAsync<string>(`riskanalysis/addriskanalys`, risk);
  }

  public updateRiskAnalysis(risk: RiskAnalysis): Observable<RiskAnalysis> {
    return this.postAsync<RiskAnalysis>(`riskanalysis/updateriskanalys`, risk);
  }

  public deleteRiskAnalysis(id: string): Observable<RiskAnalysis> {
    return this.deleteAsync<RiskAnalysis>(`riskanalysis/deleteriskanalys/${id}`);
  }
}
