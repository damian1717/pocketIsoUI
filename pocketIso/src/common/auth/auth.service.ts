import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BaseApiService } from '../services/base-api.service';
import { User } from '../models/user.model';
import { AuthResponseData } from '../models/auth-reponse-data.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService {

  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;
  constructor(
    protected override http: HttpClient,
    private router: Router) {
    super(http);
  }

  signup(email: string, password: string, firstName: string, lastName: string, role: string) {
    return this.postAsync(`identity/sign-up`,
      {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        role: role
      })
  }

  signin(email: string, password: string) {
    return this.postAsync<AuthResponseData>(`identity/sign-in`,
      {
        email: email,
        password: password
      }).pipe(
        tap(resData => {
          const expirationDate = new Date(new Date().getTime() + resData.expires * 1000)
          const user = new User(
            email,
            resData.id,
            resData.role,
            resData.accessToken,
            expirationDate
          );

          this.user.next(user);
          this.autoLogout(resData.expires * 1000);
          localStorage.setItem('userData', JSON.stringify(user));
        }))
  }

  changePassword(currentPassword: string, newPassword: string) {

    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData')!);

    return this.putAsync(`identity/me/password`,
      {
        currentPassword: currentPassword,
        newPassword: newPassword,
        email: userData?.email
      } as object)
  }

  autologin() {
    const userData: {
      email: string;
      id: string;
      role: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData')!);

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData.role,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, 2000000);
  }

  getRole() {
    const userData: {
      role: string;
    } = JSON.parse(localStorage.getItem('userData')!);

    if (!userData || !userData.role) {
      return '';
    }
    return userData.role;
  }

  isLoggedIn() {
    const userData: {
      id: string;
    } = JSON.parse(localStorage.getItem('userData')!);

    if (userData && userData.id) {
      return true;
    }

    return false;
  }
}
