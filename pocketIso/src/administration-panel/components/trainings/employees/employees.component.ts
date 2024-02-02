import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { OrganizationChartService } from '../../../services/organization-chart.service';
import { Employee } from '../../../models/employee.model';
import { Router } from '@angular/router';
import { EmpoyeeService } from '../../../services/empoyee.service';
import { forkJoin } from 'rxjs';
import { EmployeeType } from '../../../../common/enums/employee-type-codes';
import { ConfirmationDialogComponent } from '../../../../common/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  employees1: Employee[] = [];
  employees2: Employee[] = [];
  constructor(private snackBar: MatSnackBar, public dialog: MatDialog, private router: Router, private organizationChartService: OrganizationChartService,
    private empoyeeService: EmpoyeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  displayedColumns: string[] =
    ['name', 'lastName', 'email', 'position', 'level', 'existInChartOrg', 'trainings', 'edit', 'delete'];
  dataSource = new MatTableDataSource(this.employees);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getEmployees() {
    let employeeOrgChar = this.organizationChartService.getPersonsListOrganizationChart();
    let employee = this.empoyeeService.getEmployees();

    forkJoin(employeeOrgChar, employee)
      .subscribe(res => {
        if (res && res[0]) {
          this.employees1 = res[0].map(x =>
            new Employee(x.id,
              x.name,
              x.lastName,
              x.position,
              x.level,
              x.email,
              true));
        }

        if (res && res[1]) {
          this.employees2 = res[1].map(x =>
            new Employee(x.id,
              x.name,
              x.lastName,
              x.position,
              x.level,
              x.email,
              false));
        }

        this.employees = this.employees1.concat(this.employees2);
        this.dataSource.data = this.employees;
      })
  }

  deleteUser(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { text: 'Czy napewno chcesz usunąć?' } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.empoyeeService.deleteEmployee(id).subscribe(
          res => {
            this.displayMessage('Pracownik została usunięta.');
            this.getEmployees();
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

  openTrainings(id: string, level: number, existInChartOrg: boolean) {
    const type = existInChartOrg ? EmployeeType.Old : EmployeeType.New;
    this.router.navigateByUrl(`employee-trainings/${type}/${level}/${id}`);
  }

  addEmployee(): void {
    this.router.navigateByUrl('add-employee');
  }

  editEmployee(id: string): void {
    this.router.navigateByUrl(`add-employee/${id}`);
  }
}
