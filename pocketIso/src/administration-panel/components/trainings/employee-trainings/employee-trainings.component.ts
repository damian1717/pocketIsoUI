import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeTraining } from '../../../../administration-panel/models/employee-training.model';
import { EmpoyeeService } from '../../../../administration-panel/services/empoyee.service';
import { EmployeeTrainingService } from '../../../../administration-panel/services/employee-training.service';
import { OrganizationChartService } from '../../../../administration-panel/services/organization-chart.service';
import { EmployeeType } from '../../../../common/enums/employee-type-codes';

@Component({
  selector: 'app-employee-trainings',
  templateUrl: './employee-trainings.component.html',
  styleUrls: ['./employee-trainings.component.scss']
})
export class EmployeeTrainingsComponent implements OnInit {

  employeeId: string | undefined;
  level: number | undefined;
  employeeTrainings: EmployeeTraining[] = [];
  displayedColumns: string[] = ['name', 'required', 'trainingDate', 'skillLevel', 'finished', 'edit'];
  dataSource = new MatTableDataSource(this.employeeTrainings);
  employeeName: string | undefined;
  employeeType: string | undefined;
  constructor(private route: ActivatedRoute, private employeeTrainingService: EmployeeTrainingService, private router: Router,
    private empoyeeService: EmpoyeeService, private organizationChartService: OrganizationChartService) { }

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.employeeType = this.route.snapshot.paramMap.get('type')!;
    this.level = Number(this.route.snapshot.paramMap.get('level'));
    if (this.employeeId && this.level) {
      this.employeeTrainingService.getEmployeeTrainings(this.employeeId, this.level)
        .subscribe(x => {
          if (x) {
            this.employeeTrainings = x;
            this.dataSource.data = x;
          }
        })
    }

    this.getEmployeeData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(id: string, trainingId: string) {
    if (id) {
      this.router.navigateByUrl(`add-employee-training/${this.employeeType}/${trainingId}/${this.employeeId}/${id}`);
    } else {
      this.router.navigateByUrl(`add-employee-training/${this.employeeType}/${trainingId}/${this.employeeId}`);
    }
  }

  getEmployeeData() {
    if (this.employeeType === EmployeeType.New) {
      this.empoyeeService.getEmployee(this.employeeId!)
        .subscribe(x => {
          if (x) {
            this.employeeName = `${x.name} ${x.lastName}`;
          }
        });
    } else if (this.employeeType === EmployeeType.Old) {
      this.organizationChartService.getPersonOrganizationChart(this.employeeId!)
        .subscribe(x => {
          if (x) {
            this.employeeName = `${x.name} ${x.lastName}`;
          }
        });
    }
  }

}
