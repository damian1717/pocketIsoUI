import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Training } from '../models/training.model';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../common/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService extends BaseApiService {

  constructor(
    protected override http: HttpClient) {
    super(http);
  }

  public getTrainings(): Observable<Training[]> {
    return this.getAsync<Training[]>(`training/gettrainings`);
  }

  public getTrainingsForLevel(level: number): Observable<Training[]> {
    return this.getAsync<Training[]>(`training/gettrainingsforlevel/${level}`);
  }

  public getTraining(id: string): Observable<Training> {
    return this.getAsync<Training>(`training/gettraining/${id}`);
  }

  public addTraining(training: Training): Observable<Training> {
    return this.postAsync<Training>(`training/addtraining`, training);
  }

  public updateTraining(training: Training): Observable<Training> {
    return this.postAsync<Training>(`training/updatetraining`, training);
  }

  public deleteTraining(id: string): Observable<Training> {
    return this.deleteAsync<Training>(`training/deletetraining/${id}`);
  }

}
