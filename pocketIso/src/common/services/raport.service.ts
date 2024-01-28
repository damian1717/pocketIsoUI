import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { QualityPolicyReport } from '../models/quality-policy-report.model';
import { ChartOrgReport } from '../models/chart-org-report.model';
import { DefinitionProcessReport } from '../models/definition-process-report.model';

@Injectable({
  providedIn: 'root'
})
export class RaportService extends BaseApiService {

  constructor(
    protected override http: HttpClient) {
    super(http);
  }

  public generateQualityPolicyRaportPdf(report: QualityPolicyReport): Observable<{ filename: string, body: Blob }> {
    return this.downloadFilePost('raport/GenerateQualityPolicyRaportPdf', report, {}, false);
  }

  public generateOrgChartRaportPdf(request: ChartOrgReport): Observable<{ filename: string, body: Blob }> {
    return this.downloadFilePost('raport/GenerateOrgChartRaportPdf', request, {}, false);
  }

  public generateDefinitionProcessRaportPdf(request: DefinitionProcessReport): Observable<{ filename: string, body: Blob }> {
    return this.downloadFilePost('raport/GenerateDefinitionProcessRaportPdf', request, {}, false);
  }
}
