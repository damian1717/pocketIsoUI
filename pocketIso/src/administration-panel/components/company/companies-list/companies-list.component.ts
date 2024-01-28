import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from '../../../models/company.model';
import { CompanyService } from '../../../services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss']
})
export class CompaniesListComponent implements OnInit {

  companies: Company[] = [];
  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit() {
    this.getCompanies();
  }

  displayedColumns: string[] =
    ['name', 'director', 'nip', 'city', 'postalCode', 'street', 'numberBuilding', 'numberApartment', 'knowHow', 'itemsCompany',
      'technologiesUsed', 'communicationSystem', 'strengths', 'weaknesses', 'opportunitiesForTheCompany', 'threatsToTheCompany', 'edit'];
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
}
