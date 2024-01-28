import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpoyeeService } from '../../../../administration-panel/services/empoyee.service';
import { OrganizationChartService } from '../../../../administration-panel/services/organization-chart.service';
import { Employee } from 'src/administration-panel/models/employee.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {


  employeeForm = new FormGroup({
    id: new FormControl('', { nonNullable: true }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    position: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    level: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    existInChartOrg : new FormControl(false, { nonNullable: true } )
  });

  nameValue = this.employeeForm.get('name');
  lastNameValue = this.employeeForm.get('lastName');
  positionValue = this.employeeForm.get('position');
  emailValue = this.employeeForm.get('email');
  levelValue = this.employeeForm.get('level');
  employeeId: string | null = '';
  levels: number[] = [];

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar, private empoyeeService: EmpoyeeService,
    private organizationChartService: OrganizationChartService, private router: Router) { }

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.getTrainingInfo(this.employeeId);
    }

    this.getLevels();
  }

  getTrainingInfo(employeeId: string) {
    this.empoyeeService.getEmployee(employeeId).subscribe(x => {
      if (x) {
        this.employeeForm.patchValue(
          {
            id: x.id,
            name: x.name,
            lastName: x.lastName,
            position: x.position,
            email: x.email,
            level: x.level
          }
        )
      }
    });
  }

  getLevels() {
    this.organizationChartService.getOrganizationChartMaxLevel()
      .subscribe(x => {
        if (x && x > 0) {
          for (let i = 1; i <= x; i++) {
            this.levels.push(i);
          }
        } else {
          this.levelValue?.setErrors({ 'notDefineLevels': true });
        }
      });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      if (this.employeeId) {
        this.empoyeeService.updateEmployee(this.employeeForm.value as Employee).subscribe(x => {
          this.displayMessage('Pracownik zaktualizowany.');
        });
      } else {
        this.empoyeeService.addEmployee(this.employeeForm.value  as Employee).subscribe(x => {
          this.displayMessage('Pracownik dodany.');
          this.resetEmployeeForm();
        });
      }
    }
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }

  resetEmployeeForm() {
    this.employeeForm.patchValue(
      {
        id: '',
        name: '',
        lastName: '',
        position: '',
        email: '',
        level: 0
      }
    );

    this.nameValue?.setErrors(null);
    this.lastNameValue?.setErrors(null);
    this.positionValue?.setErrors(null);
    this.emailValue?.setErrors(null);
    this.levelValue?.setErrors(null);
  }

  cancel() {
    this.router.navigateByUrl('employees');
  }
  
}
