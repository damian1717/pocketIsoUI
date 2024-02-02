import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CompanyService } from '../../../services/company.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from 'src/administration-panel/models/company.model';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  companyForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    director: new FormControl('', Validators.required),
    nip: new FormControl(0, Validators.required),
    city: new FormControl(''),
    postalCode: new FormControl(''),
    street: new FormControl(''),
    numberBuilding: new FormControl(0),
    numberApartment: new FormControl(''),
    knowHow: new FormControl(''),
    itemsCompany: new FormControl(''),
    technologiesUsed: new FormControl(''),
    communicationSystem: new FormControl(''),
    strengths: new FormControl(''),
    weaknesses: new FormControl(''),
    opportunitiesForTheCompany: new FormControl(''),
    threatsToTheCompany: new FormControl('')
  });

  nameValue = this.companyForm.get('name');
  codeValue = this.companyForm.get('code');
  directorValue = this.companyForm.get('director');
  nipValue = this.companyForm.get('nip');
  id: string | null = '';
  buttonSubmitText = 'Dodaj organizacje';
  codeDisabled = false;
  constructor(private companyService: CompanyService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getCompany(this.id);
      this.buttonSubmitText = 'Edytuj organizacje';
      this.codeDisabled = true;
    }
  }

  getCompany(id: string) {
    this.companyService.getCompany(id).subscribe(x => {
      this.companyForm.patchValue({
        id: x.id,
        code: x.code,
        name: x.name,
        director: x.director,
        nip: x.nip,
        city: x.city,
        postalCode: x.postalCode,
        street: x.street,
        numberBuilding: x.numberBuilding,
        numberApartment: x.numberApartment,
        knowHow: x.knowHow,
        itemsCompany: x.itemsCompany,
        technologiesUsed: x.technologiesUsed,
        communicationSystem: x.communicationSystem,
        strengths: x.strengths,
        weaknesses: x.weaknesses,
        opportunitiesForTheCompany: x.opportunitiesForTheCompany,
        threatsToTheCompany: x.threatsToTheCompany
      });
    })
  }
  onSubmit(formDirective: FormGroupDirective) {
    if (this.companyForm.valid) {
      if (this.id) {
        this.companyService.updateCompany(this.companyForm.value as Company).subscribe(x => {
          this.displayMessage('Firma zaktualizowana.');
        });
      } else {
        this.companyService.addCompany(this.companyForm.value as Company).subscribe(res => {
          this.displayMessage('Firma dodana.');
          this.resetCompanyForm(formDirective);
        },
          err => this.displayMessage(err?.message),
          () => { });
      }
    }
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }

  resetCompanyForm(formDirective: FormGroupDirective) {
    formDirective.resetForm();
    this.companyForm.reset();
  }
}
