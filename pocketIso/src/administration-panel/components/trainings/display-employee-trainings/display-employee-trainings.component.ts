import { Component } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { EmployeeTrainingService } from '../../../../administration-panel/services/employee-training.service';
import { TrainingsService } from '../../../../administration-panel/services/trainings.service';

'use strict'
@Component({
  selector: 'app-display-employee-trainings',
  templateUrl: './display-employee-trainings.component.html',
  styleUrls: ['./display-employee-trainings.component.css']
})
export class DisplayEmployeeTrainingsComponent {
  displayedColumns: string[] = [];
  dataSource: object[] = [];
  displayedColumnsWithDisplayName: ColumnInfo[] = [];
  tables = [0];
  modifiedData: any;
  trainingModifiedData: any;
  constructor(private employeeTrainingService: EmployeeTrainingService, private trainingsService: TrainingsService) {

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
          }
        }
      });

    this.getLastModifiedData();
  }

  private getLastModifiedData() {
    this.employeeTrainingService.getLastModifiedRecordData()
      .subscribe(x => {
        if (x) {
          this.modifiedData = x;
        }
      });

    this.trainingsService.getLastModifiedRecordData()
      .subscribe(x => {
        if (x) {
          this.trainingModifiedData = x;
        }
      });
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

