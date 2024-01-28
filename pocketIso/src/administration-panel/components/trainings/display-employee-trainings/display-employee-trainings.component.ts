import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { EmployeeTrainingService } from '../../../../administration-panel/services/employee-training.service';

'use strict'
@Component({
  selector: 'app-display-employee-trainings',
  templateUrl: './display-employee-trainings.component.html',
  styleUrls: ['./display-employee-trainings.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatButtonToggleModule, MatTableModule],
})
export class DisplayEmployeeTrainingsComponent {
  displayedColumns: string[] = [];
  dataSource: object[] = [];
  displayedColumnsWithDisplayName: ColumnInfo[] = [];
  tables = [0];
  constructor(private employeeTrainingService: EmployeeTrainingService) {

    this.employeeTrainingService.getAllEmployeeTrainings()
      .subscribe(x => {
        console.log(x);

        if (x && x.columns && x.columns.length > 0) {

          this.displayedColumnsWithDisplayName = x.columns;

          x.columns.forEach((c: any) => {
            this.displayedColumns.push(c.name)
          });

          if (x.data && x.data.length > 0) {

            x.data.forEach((d: any) => {

              type rekord = Record<string, object>

              const obj1: rekord = {}

              obj1['position'] = d.position;
              obj1['trainingName'] = d.trainingName

              if (d.employeeTrainings && d.employeeTrainings.length > 0) {
                d.employeeTrainings.forEach((em: any) => {
                  obj1[em.columnName] =
                  {
                    trainingDate: em.trainingDate,
                    classOfDisplayTrainingDate: em.classOfDisplayTrainingDate,
                    classOfDisplayTrainingLevel: em.classOfDisplayTrainingLevel
                  };
                });
              }
              
              this.dataSource.push(obj1 as object);

            });

            console.log(this.dataSource);
          }
        }
      })
  }

  isSticky(buttonToggleGroup: MatButtonToggleGroup, id: string) {
    return (buttonToggleGroup.value || []).indexOf(id) !== -1;
  }
  test() {
    console.log('ff');
  }

}

export interface ColumnInfo {
  name: string;
  displayName: string;
}

