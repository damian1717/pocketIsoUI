import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthResponseData } from '../../../common/models/auth-reponse-data.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  emailValue = this.loginForm.get('email');
  passwordValue = this.loginForm.get('password');

  isLoading = false;
  error: any = null;
  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email!;
      const password = this.loginForm.value.password!;

      let authObs: Observable<AuthResponseData>;
      
      this.isLoading = true;
      authObs = this.authService.signin(email, password);
      
      authObs.subscribe(resData => {
        this.isLoading = false;
        this.router.navigate(['/'])
      },
        errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
          this.displayMessage(this.error?.message);
        })
    } else {
      this.displayMessage("Dane nie poprawne. Sprawdź formularz.");
    }
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }

}
