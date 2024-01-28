import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserInfo } from '../../../../administration-panel/models/user-info.model';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {

  userInfo: UserInfo = {} as UserInfo;
  showPasswordColumn = false;
  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    if (this.data) {
      this.userInfo = this.data;
      this.showPasswordColumn = false;
    } else {
      this.userInfo = { firstName: '', lastName: '', email: '', role: '' } as UserInfo;
      this.showPasswordColumn = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
