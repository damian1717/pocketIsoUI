import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from '../../common/services/base-api.service';
import { Complaint } from '../models/complaint.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService extends BaseApiService {

  constructor(
    protected override http: HttpClient) {
    super(http);
  }

  public getComplaints(dateFrom: string | null, dateTo: string | null): Observable<Complaint[]> {
    return this.getAsync<Complaint[]>(`complaint/getcomplaints/${dateFrom}/${dateTo}`);
  }

  public geComplaintById(id: string): Observable<Complaint> {
    return this.getAsync<Complaint>(`complaint/getcomplaintbyid/${id}`);
  }

  public addComplaint(complaint: Complaint): Observable<Complaint> {
    return this.postAsync<Complaint>(`complaint/addcomplaint`, complaint);
  }

  public updateComplaint(complaint: Complaint): Observable<Complaint> {
    return this.postAsync<Complaint>(`complaint/updatecomplaint`, complaint);
  }

  public deleteComplaint(id: string): Observable<Complaint> {
    return this.deleteAsync<Complaint>(`complaint/deletecomplaint/${id}`);
  }
}
