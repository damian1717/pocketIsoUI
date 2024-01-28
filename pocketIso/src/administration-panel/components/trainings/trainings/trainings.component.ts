import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrainingsService } from '../../../../administration-panel/services/trainings.service';
import { Training } from '../../../../administration-panel/models/training.model';
import { ConfirmationDialogComponent } from 'src/common/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss']
})
export class TrainingsComponent implements OnInit {

  trainings: Training[] = [];
  canEdit = true;
  constructor(private trainingsService: TrainingsService, private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.getTrainings();
  }

  displayedColumns: string[] = ['name', 'forHowManyMonths', 'level', 'edit', 'delete'];
  dataSource = new MatTableDataSource(this.trainings);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTrainings() {
    this.trainingsService.getTrainings().subscribe(x => {
      this.trainings = x;
      this.dataSource.data = x;
    })
  }

  redirectToEditTraining(id: string): void {
    this.router.navigateByUrl(`add-training/${id}`);
  }

  deleteTraining(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { text: 'Czy napewno chcesz usunąć?' } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingsService.deleteTraining(id).subscribe(
          res => {
            this.displayMessage('Szkolenie zostało usunięte.');
            this.getTrainings();
          },
          err => this.displayMessage(err),
          () => { }
        );
      }
    });
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 2500 });
  }

}
