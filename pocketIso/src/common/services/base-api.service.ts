import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FileResponse } from '../models/file-response.model';

@Injectable({
    providedIn: 'root'
})
export class BaseApiService {

    private _defaultHeaders: HttpHeaders | undefined;
    private apiBaseUrl = 'https://localhost:7087/api';
    constructor(protected http: HttpClient) { }

    protected getAsync<T>(resourceUri: string, params: { [param: string]: string | string[]; } = {}): Observable<T> {
        return this.http.get<T>(`${this.apiBaseUrl}/${resourceUri}`, { params: params, headers: this._defaultHeaders })
            .pipe(catchError((err, caught) => this.handleError(err, caught)));
    }

    protected postAsync<T>(
        resourceUri: string,
        body: any,
        params: { [param: string]: string | string[]; } = {},
        handleError: boolean = true
    ): Observable<T> {
        return this.http.post<T>(`${this.apiBaseUrl}/${resourceUri}`, body, { headers: this._defaultHeaders })
            .pipe(catchError((err, caught) => this.handleError(err, caught, handleError)));
    }

    protected putAsync<T>(
        resourceUri: string,
        body: any,
        params: { [param: string]: string | string[]; } = {}): Observable<T> {
        return this.http.put<T>(`${this.apiBaseUrl}/${resourceUri}`, body, { params: params, headers: this._defaultHeaders })
          .pipe(catchError((err, caught) => this.handleError(err, caught)));
      }

    protected downloadFilePost(
        resourceUri: string,
        body: any,
        params: { [param: string]: string | string[]; } = {},
        shouldHandle?: boolean
    ): Observable<FileResponse> {
        return this.http.post(
            `${this.apiBaseUrl}/${resourceUri}`, body, { observe: 'response', responseType: 'blob', headers: this._defaultHeaders }
        ).pipe(
            map(resp => this.fileResponse(resp)),
            catchError((err, caught) => this.handleError(err, caught, shouldHandle)));
    }

    protected deleteAsync<T>(resourceUri: string, params: { [param: string]: string | string[]; } = {}): Observable<T> {
        return this.http.delete<T>(`${this.apiBaseUrl}/${resourceUri}`, { params: params, headers: this._defaultHeaders })
          .pipe(catchError((err, caught) => this.handleError(err, caught)));
      }

    protected handleError<T>(error: HttpErrorResponse, _caught: Observable<T>, shouldHandle: boolean = true): Observable<T> {
        if (shouldHandle) {
            let errorMessage = 'Nieznany błąd wystąpił!';
            if (!error?.error?.message) {
                return throwError(errorMessage);
            }
            errorMessage = error.error.message;
            return throwError(errorMessage);
        }
        return throwError(error);
    }

    protected uploadFile(resourceUri: string, formData: FormData) {
        const uploadReq = new HttpRequest('POST', `${this.apiBaseUrl}/${resourceUri}`, formData, {
            reportProgress: true,
          });
        
          return this.http.request(uploadReq).pipe(catchError((err, caught) => this.handleError(err, caught)));
    }

    private fileResponse(resp: HttpResponse<Blob>): FileResponse {
        const disposition = resp.headers.get('content-disposition');
        //const fileName = disposition ? disposition.match(/filename="(.+)"/i)[1] : '';
        const parts = disposition!.split(';');
        let fileName = parts[1].split('=')[1];

        let body = resp.body as Blob;
        return new FileResponse(fileName, body);
    }
}
