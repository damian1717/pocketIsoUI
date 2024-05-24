import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { QualityPolicyReport } from '../models/quality-policy-report.model';
import { ChartOrgReport } from '../models/chart-org-report.model';
import { DefinitionProcessReport } from '../models/definition-process-report.model';
import { ProcessMap } from '../models/process-map-report.model';
import { SubProcess } from '../../administration-panel/models/sub-process.model';
import { OrganizationalContext } from '../../administration-panel/models/organizational-context.model';

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

  public generateProcessMapRaportPdf(request: ProcessMap): Observable<{ filename: string, body: Blob }> {
    return this.downloadFilePost('raport/GenerateProcessMapRaportPdf', request, {}, false);
  }

  public generateSubProcessRaportPdf(request: SubProcess): Observable<{ filename: string, body: Blob }> {
    return this.downloadFilePost('raport/GenerateSubProcessRaportPdf', request, {}, false);
  }

  public generateOrganizationalContextRaportPdf(request: OrganizationalContext): Observable<{ filename: string, body: Blob }> {
    return this.downloadFilePost('raport/GenerateOrganizationalContextRaportPdf', request, {}, false);
  }
}
