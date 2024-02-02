import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../../administration-panel/services/user.service';
import { UserInfo } from '../../../../administration-panel/models/user-info.model';
import { AuthService } from '../../../../common/auth/auth.service';
import { ConfirmationDialogComponent } from '../../../../common/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: UserInfo[] = [];
  constructor(private userService: UserService, private snackBar: MatSnackBar, public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    this.getUsers();
  }

  displayedColumns: string[] =
    ['firstName', 'lastName', 'email', 'role', 'edit', 'delete'];
  dataSource = new MatTableDataSource(this.users);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUsers() {
    this.userService.getusers().subscribe(x => {
      this.users = x;
      this.dataSource.data = x;
    })
  }

  addUser() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '350px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.authService.signup(result.email, result.password, result.firstName, result.lastName, result.role).subscribe(x => {
        this.displayMessage('Urzytkownik dodany.');
        this.getUsers();
      })
    });
  }

  openDialogForUpdateUser(user: UserInfo) {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '350px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result).subscribe(x => {
          this.displayMessage('Użytkownik został zaktualizowany.');
          this.getUsers();
        })
      }
    });
  }

  deleteUser(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { text: 'Czy napewno chcesz usunąć?'} });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.userService.deleteUser(id).subscribe(
            res => {
              this.displayMessage('Użytkownik została usunięta.');
              this.getUsers();
            },
            err => this.displayMessage(err?.message),
            () => { }
          );
        }
      });
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 2500 });
  }
}
