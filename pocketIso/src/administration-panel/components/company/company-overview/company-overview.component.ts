import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from '../../../../administration-panel/services/company.service';
import { Company } from '../../../../administration-panel/models/company.model';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.css']
})
export class CompanyOverviewComponent implements OnInit {

  id: string = '';
  company: Company = { name: '', code: '', director: '', nip: 0, city: '', postalCode: '', street: '', numberBuilding: 0, numberApartment: '',
  knowHow: '', itemsCompany: '', technologiesUsed: '', communicationSystem: '', strengths: '', weaknesses: '', opportunitiesForTheCompany: '',
  threatsToTheCompany: '', isArchive: false, id: '', contactDetails: ''
  };
  constructor(
    private companyService: CompanyService,
    public dialogRef: MatDialogRef<CompanyOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.id = this.data;
    this.getCompany();
  }

  getCompany() {
    this.companyService.getCompany(this.id).subscribe(x => {
      this.company = x;
    })
  }
}
