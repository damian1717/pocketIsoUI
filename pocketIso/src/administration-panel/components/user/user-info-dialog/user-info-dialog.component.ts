import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserInfo } from '../../../../administration-panel/models/user-info.model';
import { UserService } from '../../../../administration-panel/services/user.service';

@Component({
  selector: 'app-user-info-dialog',
  templateUrl: './user-info-dialog.component.html',
  styleUrls: ['./user-info-dialog.component.scss']
})
export class UserInfoDialogComponent implements OnInit {

  userInfo: UserInfo = {} as UserInfo;
  constructor(
    public dialogRef: MatDialogRef<UserInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData')!);

    this.userService.getUserByEmail(userData.email).subscribe(result => {
      this.userInfo = result
    })
  }
}
