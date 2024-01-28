import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrganizationChartPersonInfo } from '../../../../../administration-panel/models/organization-chart-person-info.model';
import { PersonBelow } from '../../../../../administration-panel/models/person-below.model';
import { ChartOrganizationPopup } from '../../../../../administration-panel/models/chart-organization-popup.model';

@Component({
  selector: 'app-add-chart-organization-dialog',
  templateUrl: './add-chart-organization-dialog.component.html',
  styleUrls: ['./add-chart-organization-dialog.component.scss']
})
export class AddChartOrganizationDialogComponent implements OnInit {

  showBelowHowColumn = false;
  showLevelColumn = false;
  personInfo: OrganizationChartPersonInfo | undefined;
  personsBelow: PersonBelow[] = [];
  constPersonsBelow: PersonBelow[] = [];
  availableLevels: number[] = [];
  constAvailableLevels: number[] = [];

  chartForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    belowPersonId: new FormControl(''),
    level: new FormControl(0, { nonNullable: true })
  });

  nameValue = this.chartForm.get('name');
  lastNameValue = this.chartForm.get('lastName');
  positionValue = this.chartForm.get('position');
  emailValue = this.chartForm.get('email');
  belowPersonIdValue = this.chartForm.get('belowPersonId');
  levelValue = this.chartForm.get('level');

  constructor(
    public dialogRef: MatDialogRef<AddChartOrganizationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChartOrganizationPopup,
  ) { }

  ngOnInit() {
    if (this.data?.organizationChartPersonInfo) {
      this.personInfo = this.data.organizationChartPersonInfo;
      this.showLevelColumn = false;

      this.chartForm.patchValue({
        id: this.personInfo.id,
        name: this.personInfo.name,
        lastName: this.personInfo.lastName,
        position: this.personInfo.position,
        email: this.personInfo.email,
        belowPersonId: this.personInfo.belowPersonId,
        level: this.personInfo.level
      });

    } else {
      this.personInfo = { id: '', name: '', lastName: '', position: '', belowPersonId: '', belowPersonName: '', email: '', level: 0 } as OrganizationChartPersonInfo;
      this.showLevelColumn = true;
      this.chartForm.patchValue({
        id: '',
        name: '',
        lastName: '',
        position: '',
        email: '',
        level: 0,
        belowPersonId: null
      });
    }

    if (this.data?.personsBelow && this.data.personsBelow.length > 0) {
      this.showBelowHowColumn = true;
      this.personsBelow = this.data.personsBelow;

      if (this.data?.organizationChartPersonInfo?.id) {
        this.personsBelow = this.personsBelow.filter(x => x.id != this.data.organizationChartPersonInfo.id);
      }
    } else {
      this.showBelowHowColumn = false;
    }

    this.constPersonsBelow = this.personsBelow;

    if (this.data.availableLevels) {
      this.availableLevels = this.data.availableLevels;
      this.constAvailableLevels = this.data.availableLevels;
    }
  }

  onSubmit() {
    if (this.chartForm.valid) {
      this.dialogRef.close(this.chartForm.value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChangeBelowPerson(event: any) {
    if (event?.value) {
      const personLevel = this.personsBelow.find(x => x.id === event.value);

      if (personLevel) {
        this.availableLevels = this.constAvailableLevels.filter(x => x === personLevel.level + 1);
        const level = this.chartForm.get('level');
        if (level) {
          level.setValue(personLevel.level + 1);
        }
      }
    }
  }
}
