import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnInit {
  changePasswordForm = new FormGroup({
    currentPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    newPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  currentPasswordValue = this.changePasswordForm.get('currentPassword');
  newPasswordValue = this.changePasswordForm.get('newPassword');

  isLoading = false;
  error: any = null;
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService, private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      const currentPassword = this.changePasswordForm.value.currentPassword!;
      const newPassword = this.changePasswordForm.value.newPassword!;

      this.authService.changePassword(currentPassword, newPassword).subscribe(result => {
        this.displayMessage('Hasło zostało zmienione.');
        this.dialogRef.close();
      },
        err => this.displayMessage(err),
        () => { });

    } else {
      this.displayMessage("Dane nie poprawne. Sprawdź formularz.");
    }
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}