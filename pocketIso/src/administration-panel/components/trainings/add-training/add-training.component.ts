import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationChartService } from '../../../../administration-panel/services/organization-chart.service';
import { TrainingsService } from '../../../../administration-panel/services/trainings.service';
import { Training } from '../../../../administration-panel/models/training.model';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.scss']
})
export class AddTrainingComponent implements OnInit {

  trainingForm = new FormGroup({
    id: new FormControl('', { nonNullable: true }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    forHowManyMonths: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    level: new FormControl(0, { nonNullable: true, validators: [Validators.required] })
  });

  nameValue = this.trainingForm.get('name');
  forHowManyMonthsValue = this.trainingForm.get('forHowManyMonths');
  levelValue = this.trainingForm.get('level');
  id: string | null = '';
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
  levels: number[] = [];

  constructor(private trainingsService: TrainingsService, private route: ActivatedRoute, private snackBar: MatSnackBar,
    private organizationChartService: OrganizationChartService, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getTraining(this.id);
    }

    this.getLevels();
  }

  getTraining(id: string) {
    this.trainingsService.getTraining(id).subscribe(x => {
      this.trainingForm.patchValue({
        id: x.id,
        name: x.name,
        forHowManyMonths: x.forHowManyMonths,
        level: x.level
      });
    })
  }

  onSubmit() {
    if (this.trainingForm.valid) {
      
      if (this.id) {
        this.trainingsService.updateTraining(this.trainingForm.value as Training).subscribe(x => {
          this.displayMessage('Szkolenie zaktualizowane.');
        });
      } else {
        this.trainingsService.addTraining(this.trainingForm.value as Training).subscribe(x => {
          this.displayMessage('Szkolenie dodane.');
          this.resetTrainingForm();
        });
      }
    }
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }

  resetTrainingForm() {
    this.trainingForm.patchValue(
      {
        id: '',
        name: '',
        forHowManyMonths: 0,
        level: 0
      }
    );

    this.nameValue?.setErrors(null);
    this.forHowManyMonthsValue?.setErrors(null);
    this.levelValue?.setErrors(null);
  }

  getLevels() {
    this.organizationChartService.getOrganizationChartMaxLevel()
    .subscribe(x => {
      if (x && x > 0) {
        this.levelValue?.setErrors(null);
        for (let i = 1; i <= x; i++) {
          this.levels.push(i);
        }
      } else {
        this.levelValue?.setErrors({ 'notDefineLevels': true });
      }
    });
  }

  redirectToTrainings() {
    this.router.navigateByUrl(`trainings`);
  }
}
