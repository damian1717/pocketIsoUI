import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../common/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class FileService extends BaseApiService {

  constructor(
    protected override http: HttpClient) {
    super(http);
  }

  public uploadFileTo(file: any): Observable<any> {
    return this.uploadFile(`document/upload`, file);
  }

}
