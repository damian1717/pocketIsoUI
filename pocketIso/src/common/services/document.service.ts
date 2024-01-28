import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import { DocumentInfo } from '../models/documnet.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends BaseApiService {

  constructor(
    protected override http: HttpClient) {
    super(http);
  }

  public getDocumentsByCode(code: string): Observable<DocumentInfo[]> {
    return this.getAsync<DocumentInfo[]>(`document/GetDocumentsByCode?code=${code}`);
  }

  public downloadFileById(id: string): Observable<{ filename: string, body: Blob }> {
    return this.downloadFilePost(`document/DownloadPdf?id=${id}`, null, {}, false);
  }

  public downloadPdfByCodeLastAdded(code: string): Observable<{ filename: string, body: Blob }> {
    return this.downloadFilePost(`document/DownloadPdfByCodeLastAdded?code=${code}`, null, {}, false);
  }
}
