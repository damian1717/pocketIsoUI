import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../models/user-info.model';
import { BaseApiService } from '../../common/services/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService {

  constructor(
    protected override http: HttpClient) {
    super(http);
  }

  public getusers(): Observable<UserInfo[]> {
    return this.getAsync<UserInfo[]>(`user/getusers`);
  }

  public getUser(id: string): Observable<UserInfo> {
    return this.getAsync<UserInfo>(`user/getuserbyid/${id}`);
  }

  public getUserByEmail(email: string): Observable<UserInfo> {
    return this.getAsync<UserInfo>(`user/getuserbyemail/${email}`);
  }

  public addUser(user: UserInfo): Observable<UserInfo> {
    return this.postAsync<UserInfo>(`user/addUser`, user);
  }

  public updateUser(user: UserInfo): Observable<UserInfo> {
    return this.postAsync<UserInfo>(`user/updateuser`, user);
  }

  public deleteUser(id: string): Observable<UserInfo> {
    return this.deleteAsync<UserInfo>(`user/deleteuser/${id}`);
  }
}
