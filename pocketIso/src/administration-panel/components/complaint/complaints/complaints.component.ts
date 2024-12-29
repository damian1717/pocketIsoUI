import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Complaint } from '../../../../administration-panel/models/complaint.model';
import { ComplaintService } from '../../../../administration-panel/services/complaint.service';
import { ConfirmationDialogComponent } from '../../../../common/components/confirmation-dialog/confirmation-dialog.component';
import { UploadFilesComponent } from '../../../../common/components/upload-files/upload-files.component';
import { AuthService } from '../../../../common/auth/auth.service';
import { Role } from '../../../../common/enums/user-role-codes';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  role = '';
  dateFrom: Date | null = null;
  dateTo: Date | null = null;
  displayedColumns = [
    'type',
    'status',
    'client',
    'date',
    'deadline',
    'product',
    'responsiblePerson',
    'fileNames',
    'actions',
    'addDocument',
    'edit',
    'delete'
  ];

  complaints: Complaint[] = [];

  complaintDataSource = new MatTableDataSource(this.complaints);
  constructor(private router: Router, private complaintService: ComplaintService, private snackBar: MatSnackBar, public dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.role = this.authService.getRole();

    if (this.role === Role.SuperAdmin || this.role === Role.Admin) {
      this.displayedColumns = ['type',
        'status',
        'client',
        'date',
        'deadline',
        'product',
        'responsiblePerson',
        'fileNames',
        'actions',
        'addDocument',
        'edit',
        'delete'];
    } else {
      this.displayedColumns = ['type',
        'status',
        'client',
        'date',
        'deadline',
        'product',
        'responsiblePerson',
        'fileNames',
        'actions',
        'addDocument'];
    }

    this.getComplaints();
  }

  add() {
    this.redirectToAddComplaint();
  }

  redirectToAddComplaint() {
    this.router.navigateByUrl(`add-complaint`);
  }

  redirectToEdit(id: string) {
    this.router.navigateByUrl(`add-complaint/${id}`);
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { text: 'Czy napewno chcesz usunąć?' } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.complaintService.deleteComplaint(id).subscribe(
          res => {
            this.displayMessage('Reklamacja został usunięta.');
            this.getComplaints();
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

  getComplaints() {
    let from = this.dateFrom ? this.dateFrom.toISOString() : null;
    let to = this.dateTo ? this.dateTo.toISOString() : null;
    this.complaintService.getComplaints(from, to).subscribe(x => {
      if (x) {
        this.complaints = x;
        this.complaintDataSource.data = x;
      }
    })
  }

  filter() {
    this.getComplaints();
  }

  addDocument(id: string) {
    const dialogRef = this.dialog.open(UploadFilesComponent,
      {
        data:
        {
          id: id,
          canEdit: this.role === Role.SuperAdmin || this.role === Role.Admin

        }
      });
      
    dialogRef.afterClosed().subscribe(result => {
      this.getComplaints();
    });
  }

  clearFilter() {
    this.dateFrom = null;
    this.dateTo = null;
    this.getComplaints();
  }
}
