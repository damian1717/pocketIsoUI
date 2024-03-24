import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SkillLevel } from '../../../../administration-panel/models/skill-level.model';
import { EmployeeTrainingService } from '../../../../administration-panel/services/employee-training.service';
import { TrainingsService } from '../../../../administration-panel/services/trainings.service';
import { EmployeeTraining } from '../../../../administration-panel/models/employee-training.model';
import { SkillLevelCodes } from '../../../../common/enums/skill-level-codes';

@Component({
  selector: 'app-add-employee-training',
  templateUrl: './add-employee-training.component.html',
  styleUrls: ['./add-employee-training.component.scss']
})
export class AddEmployeeTrainingComponent implements OnInit {

  employeeTrainingForm = new FormGroup({
    id: new FormControl('', { nonNullable: true }),
    trainingId: new FormControl('', { nonNullable: true }),
    employeeId: new FormControl('', { nonNullable: true }),
    required: new FormControl(false, { nonNullable: true }),
    trainingDate: new FormControl(new Date(), { nonNullable: true }),
    skillLevel: new FormControl(0, { nonNullable: true }),
    employeeType: new FormControl('', { nonNullable: true })
  });

  skillLevels: SkillLevel[] = [];
  requiredValue = this.employeeTrainingForm.get('required');
  trainingDateValue = this.employeeTrainingForm.get('trainingDate');
  skillLevelValue = this.employeeTrainingForm.get('skillLevel');
  id: string | null = '';
  subProcessType: string | null = '';
  trainingId: string | null = '';
  trainingName: string | undefined;
  employeeId: string | null = '';
  employeeType: string | null = '';

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar,
    private employeeTrainingService: EmployeeTrainingService, private trainingsService: TrainingsService) { }

  ngOnInit() {
    this.getSkillLevels();
    this.trainingId = this.route.snapshot.paramMap.get('trainingId');
    this.employeeId = this.route.snapshot.paramMap.get('employeeId');
    this.employeeType = this.route.snapshot.paramMap.get('employeeType');
    this.id = this.route.snapshot.paramMap.get('id');
    this.subProcessType = this.route.snapshot.paramMap.get('type');

    this.getEmployeeTrainingInfo(this.id!);
    this.getTrainingInfo();
  }

  private getTrainingInfo() {
    this.trainingsService.getTraining(this.trainingId!).subscribe(x => {
      if (x) {
        this.trainingName = x.name;
      }
    });
  }

  getEmployeeTrainingInfo(id: string) {
    if (this.id) {
      this.employeeTrainingService.getEmployeeTrainingById(id).subscribe(x => {
        if (x) {
          this.employeeTrainingForm.patchValue(
            {
              id: x.id,
              trainingId: this.trainingId!,
              employeeId: this.employeeId!,
              required: x.required,
              trainingDate: x.trainingDate,
              skillLevel: x.skillLevel,
              employeeType: this.employeeType!
            }
          )
        }
      });
    } else {
      this.employeeTrainingForm.patchValue(
        {
          id: '',
          trainingId: this.trainingId!,
          employeeId: this.employeeId!,
          required: false,
          trainingDate: null!,
          skillLevel: 0,
          employeeType: this.employeeType!
        }
      );
    }
  }

  onSubmit() {
    if (this.employeeTrainingForm.valid) {
      if (this.id) {
        this.employeeTrainingService.updateEmployeeTraining(this.employeeTrainingForm.value as EmployeeTraining).subscribe(x => {
          this.displayMessage('Informacje o szkoleniu zaktualizowane.');
        });
      } else {
        this.employeeTrainingService.addEmployeeTraining(this.employeeTrainingForm.value as EmployeeTraining).subscribe(x => {
          this.displayMessage('Informacje o szkoleniu zaktualizowane.');
        });
      }
    }
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }

  cancel() {
    window.history.back();
  }

  getSkillLevels() {
    this.skillLevels.push({ value: SkillLevelCodes.LackOfKnowledge, name: 'Kwalifikacje nie wymagane' } as SkillLevel);
    this.skillLevels.push({ value: SkillLevelCodes.BaseKnowledge, name: 'Wiedza podstawowa' } as SkillLevel);
    this.skillLevels.push({ value: SkillLevelCodes.IntermediateKnowledge, name: 'Średnio-zaawansowany' } as SkillLevel);
    this.skillLevels.push({ value: SkillLevelCodes.AdvancedKnowledge, name: 'Zaawansowany' } as SkillLevel);
    this.skillLevels.push({ value: SkillLevelCodes.ExpertKnowlege, name: 'Expert' } as SkillLevel);
  }
}
