import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Audit } from '../../../../administration-panel/models/audit.model';
import { AuditService } from '../../../../administration-panel/services/audit.service';
import { AuthService } from '../../../../common/auth/auth.service';
import { Role } from '../../../../common/enums/user-role-codes';
import { ConfirmationDialogComponent } from '../../../../common/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-audits',
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.css']
})
export class AuditsComponent implements OnInit {

  isAdmin = true;
  role = '';
  displayedColumns = [
    'type',
    'name',
    'status',
    'date',
    'edit',
    'delete'
  ];

  audits: Audit[] = [];

  auditDataSource = new MatTableDataSource(this.audits);
  constructor(
    private authService: AuthService,
    private router: Router,
    private auditService: AuditService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.role = this.authService.getRole();

    this.isAdmin = this.role === Role.SuperAdmin || this.role === Role.Admin;
    if (this.role === Role.SuperAdmin || this.role === Role.Admin) {
      this.displayedColumns =
        [
          'type',
          'name',
          'status',
          'auditDate',
          'auditor',
          'edit',
          'delete'
        ];
    } else {
      this.displayedColumns =
        [
          'type',
          'name',
          'status',
          'auditDate',
          'auditor'
        ];
    }

    this.getAudits();
  }

  add() {
    this.redirectToAddAudit();
  }

  redirectToAddAudit() {
    this.router.navigateByUrl(`add-audit`);
  }

  redirectToEdit(id: string) {
    this.router.navigateByUrl(`add-audit/${id}`);
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { text: 'Czy napewno chcesz usunąć?' } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.auditService.deleteAudit(id).subscribe(
          res => {
            this.displayMessage('Audyt został usunięta.');
            this.getAudits();
          },
          err => this.displayMessage(err?.message),
          () => { }
        );
      }
    });
  }

  getAudits() {
    this.auditService.getAudits().subscribe(x => {
      if (x) {
        this.audits = x;
        this.auditDataSource.data = x;
      }
    })
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 2500 });
  }
}
