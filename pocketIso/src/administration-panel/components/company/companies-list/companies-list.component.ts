import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from '../../../models/company.model';
import { CompanyService } from '../../../services/company.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/common/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss']
})
export class CompaniesListComponent implements OnInit {

  companies: Company[] = [];
  constructor(private companyService: CompanyService, private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.getCompanies();
  }

  displayedColumns: string[] =
    ['name', 'director', 'nip', 'city', 'postalCode', 'street', 'edit', 'archive'];
  dataSource = new MatTableDataSource(this.companies);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(x => {
      this.companies = x;
      this.dataSource.data = x;
    })
  }

  redirectToEditCompany(id: string): void {
    this.router.navigateByUrl(`add-company/${id}`);
  }

  archive(element: Company) {
    if (element) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { text: 'Czy napewno chcesz zarchiwizować firmę?' } });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          element.isArchive = true;
          this.companyService.updateCompany(element)
            .subscribe(x => {
              this.displayMessage('Firma zarchiwizowana.');
            })
        }
      })
    }
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }
}
