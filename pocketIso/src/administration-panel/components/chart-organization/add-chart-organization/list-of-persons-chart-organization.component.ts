import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddChartOrganizationDialogComponent } from './add-chart-organization-dialog/add-chart-organization-dialog.component';
import { OrganizationChartPersonInfo } from '../../../models/organization-chart-person-info.model';
import { OrganizationChartService } from '../../../services/organization-chart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ChartOrganizationPopup } from '../../../models/chart-organization-popup.model';
import { PersonBelow } from '../../../models/person-below.model';
import { ConfirmationDialogComponent } from '../../../../common/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-list-of-persons-chart-organization',
  templateUrl: './list-of-persons-chart-organization.component.html',
  styleUrls: ['./list-of-persons-chart-organization.component.scss']
})
export class ListOfPersonsChartOrganizationComponent implements OnInit {

  listOfPersons: OrganizationChartPersonInfo[] = [];

  displayedColumns: string[] =
    ['name', 'lastName', 'position', 'belowPersonName', 'level', 'email', 'edit', 'delete'];
  dataSource = new MatTableDataSource(this.listOfPersons);

  constructor(public dialog: MatDialog, private organizationChartService: OrganizationChartService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getPersonsLists();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogForAddPerson() {
    const dialogRef = this.dialog.open(AddChartOrganizationDialogComponent, {
      width: '350px',
      data: this.getDataForPopup(null)
    });

    dialogRef.afterClosed().subscribe(result => {
      this.organizationChartService.addOrganizationChartPerson(result).subscribe(x => {
        this.displayMessage('Osoba dodana.');
        this.getPersonsLists();
      })
    });
  }

  openDialogForUpdatePerson(person: OrganizationChartPersonInfo) {
    const dialogRef = this.dialog.open(AddChartOrganizationDialogComponent, {
      width: '350px',
      data: this.getDataForPopup(person)
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.organizationChartService.updateOrganizationChartPerson(result).subscribe(x => {
          this.displayMessage('Osoba została zaktualizowana.');
          this.getPersonsLists();
        })
      }
    });
  }

  getPersonsLists() {
    this.organizationChartService.getPersonsListOrganizationChart().subscribe(x => {
      this.listOfPersons = x;
      this.dataSource.data = x;
    })
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 2500 });
  }

  getDataForPopup(person: OrganizationChartPersonInfo | null) {
    let data = { organizationChartPersonInfo: person, personsBelow: this.getPersonsBelow(), availableLevels: this.getAvailableLevels() } as ChartOrganizationPopup;

    return data;
  }

  getAvailableLevels(): number[] {
    if (!this.listOfPersons || this.listOfPersons.length <= 0) {
      return [1];
    }

    let maxLevel = 0;
    this.listOfPersons.forEach(person => {
      if (person.level > maxLevel) {
        maxLevel = person.level;
      }
    });

    let availableLevels: number[] = [];
    for (let i = 2; i <= maxLevel + 1; i++) {
      availableLevels.push(i);
    }

    return availableLevels;
  }

  getPersonsBelow(): PersonBelow[] {
    if (!this.listOfPersons || this.listOfPersons.length <= 0) {
      return [];
    }

    let persons: PersonBelow[] = [];

    this.listOfPersons.forEach(x => {
      persons.push({ name: `${x.name} ${x.lastName}`, id: x.id, level: x.level } as PersonBelow);
    });

    return persons;
  }

  deletePerson(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { text: 'Czy napewno chcesz usunąć?' } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.organizationChartService.deletePersonOrganizationChart(id).subscribe(
          res => {
            this.displayMessage('Osoba została usunięta.');
            this.getPersonsLists();
          },
          err => {
            console.log(err);
            if (err) {
              if (err.code === 'below_person_exists') {
                const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { text: 'Czy napewno chce usunąć siebie i wszystkich pracownikow pod soba?' } });

                dialogRef.afterClosed().subscribe(result => {
                  if (result) {
                    this.organizationChartService.deleteOrganizationChartPersonAndBelowPersons(id).subscribe(
                      res => {
                        this.displayMessage('Osoby zostały usunięte.');
                        this.getPersonsLists();
                      },
                      err => { this.displayMessage(err?.message) });
                  }
                });
              }
            } else {
              this.displayMessage(err?.message);
            }
          },
          () => { }
        );
      }
    })
  }
}
