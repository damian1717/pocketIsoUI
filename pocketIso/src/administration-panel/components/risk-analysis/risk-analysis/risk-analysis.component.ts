import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../../administration-panel/models/category.model';
import { ProcessService } from '../../../../administration-panel/services/process.service';
import { RiskAnalysisService } from '../../../../administration-panel/services/risk-analysis.service';
import { RiskLegendDialogComponent } from '../risk-legend-dialog/risk-legend-dialog.component';
import { RiskAnalysis } from '../../../../administration-panel/models/risk-analysis.model';
import { RiskCriteriaDialogComponent } from '../risk-criteria-dialog/risk-criteria-dialog.component';

@Component({
  selector: 'app-risk-analysis',
  templateUrl: './risk-analysis.component.html',
  styleUrls: ['./risk-analysis.component.css']
})
export class RiskAnalysisComponent implements OnInit, AfterViewInit {

  processId = '';
  processName = '';
  ownerOfProcess = '';
  riskId: string | null = '';
  selectedIndex: number = 0;
  processTypes: Category[] | undefined;
  numbers: number[] = [];
  firstResult = 0;
  secondResult = 0;

  firstFormGroup: FormGroup = this._formBuilder.group({
    processType: [1, Validators.required],
    definedIssue: ['', Validators.required],
    potentialCause: ['', Validators.required],
    degree: [1],
    occurrence: [1]
  });

  secondFormGroup: FormGroup = this._formBuilder.group({
    preventiveAction: ['', Validators.required],
    personForSystemImplementation: ['', Validators.required],
    plannedSystemImplementationDate: [new Date(), Validators.required],
    realSystemImplementationDate: [new Date(), Validators.required],
    implementationStatus: ['', Validators.required],
    systemPerformance: ['', Validators.required],
    dateEffectivenessOfSystemOperation: [new Date(), Validators.required],
    degreeAction: [1],
    occurrenceAction: [1]
  });

  thirdFormGroup: FormGroup = this._formBuilder.group({
    emergencyPlan: ['', Validators.required],
    personForEmergencyPlan: ['', Validators.required],
    assessmentOfVerificationEffectiveness: ['', Validators.required]
  });

  duration = '2000';
  isCompleted1 = false;
  isCompleted2 = false;
  isCompleted3 = false;
  potentialCauseValue = this.firstFormGroup.get('potentialCause');
  definedIssueValue = this.firstFormGroup.get('definedIssue');

  preventiveActionValue = this.secondFormGroup.get('preventiveAction');
  personForSystemImplementationValue = this.secondFormGroup.get('personForSystemImplementation');
  implementationStatusValue = this.secondFormGroup.get('implementationStatus');
  systemPerformanceValue = this.secondFormGroup.get('systemPerformance');

  emergencyPlanValue = this.thirdFormGroup.get('emergencyPlan');
  personForEmergencyPlanValue = this.thirdFormGroup.get('personForEmergencyPlan');
  assessmentOfVerificationEffectivenessValue = this.thirdFormGroup.get('assessmentOfVerificationEffectiveness');

  text = 'szansa';
  teks2 = 'zapobiegawcze'
  showPotentialCause = false;
  processTypeValue = this.firstFormGroup.get('processType');
  constructor(private router: Router, private route: ActivatedRoute,
    private processService: ProcessService, private _formBuilder: FormBuilder, public dialog: MatDialog,
    private riskAnalysisService: RiskAnalysisService, private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.processId = this.route.snapshot.paramMap.get('processId')!;
    this.getProcess();
    this.getRiskAnalys(this.processId);
    this.getProcessTypes();
    this.getNumbers();

    this.setProcesTypeText(this.processTypeValue?.value);
  }

  ngAfterViewInit() {
    this.setClassForResult(this.processTypeValue?.value, 'first-result');
    this.setClassForResult(this.processTypeValue?.value, 'second-result');
  }

  getRiskAnalys(processId: string) {
    if (processId) {
      this.riskAnalysisService.getRiskAnalysByProcessId(processId).subscribe(x => {
        if (x) {
          this.riskId = x.id;
          this.ownerOfProcess = x.ownerOfProcess;

          this.firstFormGroup.patchValue(
            {
              processType: x.processType,
              definedIssue: x.definedIssue,
              potentialCause: x.potentialCause,
              degree: x.degree,
              occurrence: x.occurrence
            }
          );

          this.secondFormGroup.patchValue(
            {
              preventiveAction: x.preventiveAction,
              personForSystemImplementation: x.personForSystemImplementation,
              plannedSystemImplementationDate: x.plannedSystemImplementationDate,
              realSystemImplementationDate: x.realSystemImplementationDate,
              implementationStatus: x.implementationStatus,
              systemPerformance: x.systemPerformance,
              dateEffectivenessOfSystemOperation: x.dateEffectivenessOfSystemOperation,
              degreeAction: x.degreeAction,
              occurrenceAction: x.occurrenceAction
            }
          );

          this.thirdFormGroup.patchValue(
            {
              emergencyPlan: x.emergencyPlan,
              personForEmergencyPlan: x.personForEmergencyPlan,
              assessmentOfVerificationEffectiveness: x.assessmentOfVerificationEffectiveness
            }
          );

          this.setProcesTypeText(this.processTypeValue?.value);
          this.calculateResult();
          this.calculateSecendResult();
        }
      });
    } else {
      this.calculateResult();
      this.calculateSecendResult();
    }
  }

  getProcess() {
    this.processService.getProcess(this.processId).subscribe(x => {
      if (x) {
        this.processName = x.name;
      }
    })
  }

  private setProcesTypeText(typeValue: number) {
    if (typeValue === 1) {
      this.text = 'ryzyko';
      this.showPotentialCause = true;
      this.firstFormGroup.get('potentialCause')?.setValidators(Validators.required);
    } else {
      this.text = 'szansa';
      this.showPotentialCause = false;
      this.firstFormGroup.get('potentialCause')?.setValidators(null);
      this.firstFormGroup.get('potentialCause')?.setErrors(null);
    }
    this.setClassForResult(typeValue, 'first-result');
    this.setClassForResult(typeValue, 'second-result');
  }

  setClassForResult(typeValue: number, elementId: string) {
    this.calculateResult();
    this.calculateSecendResult();
    let element = document.getElementById(elementId);

    let result = elementId === 'first-result' ? this.firstResult : this.secondResult;

    if (element && typeValue === 1) {

      if (result > 0 && result < 3) {
        element.className = 'risk-low';
      } else if (result > 2 && result < 8) {
        element.className = 'risk-medium';
      } else if (result > 7 && result < 17) {
        element.className = 'risk-high';
      }
    }

    if (element && typeValue === 2) {

      if (result > 0 && result < 3) {
        element.className = 'chance-low';
      } else if (result > 2 && result < 8) {
        element.className = 'chance-medium';
      } else if (result > 7 && result < 17) {
        element.className = 'chance-high';
      }
    }
  }

  setIndex(event: any) {
    this.selectedIndex = event.selectedIndex;
  }

  stepFirstFinish() {
    if (this.firstFormGroup.valid) {
      let model = this.firstFormGroup.value as RiskAnalysis;
      model.processId = this.processId ? this.processId : '';
      model.ownerOfProcess = this.ownerOfProcess;
      if (this.riskId) {
        this.update();
      } else {
        this.riskAnalysisService.addRiskAnalysis(model).subscribe(x => {
          this.displayMessage('Dane wypełnione.');
          this.riskId = x;
        });
      }
    }
  }

  stepSecondFinish() {
    if (this.secondFormGroup.valid && this.firstFormGroup.valid) {
      this.update();
    }
  }

  stepThirdFinish() {
    if (this.secondFormGroup.valid && this.firstFormGroup.valid && this.thirdFormGroup.valid) {
      this.update();
    }
  }

  private update() {
    let model = this.firstFormGroup.value as RiskAnalysis;
    model.processId = this.processId ? this.processId : '';
    model.ownerOfProcess = this.ownerOfProcess;
    let secendModel = this.secondFormGroup.value as RiskAnalysis;
    model.id = this.riskId ? this.riskId : '';
    model.preventiveAction = secendModel.preventiveAction;
    model.personForSystemImplementation = secendModel.personForSystemImplementation;
    model.plannedSystemImplementationDate = secendModel.plannedSystemImplementationDate;
    model.realSystemImplementationDate = secendModel.realSystemImplementationDate;
    model.implementationStatus = secendModel.implementationStatus;
    model.systemPerformance = secendModel.systemPerformance;
    model.dateEffectivenessOfSystemOperation = secendModel.dateEffectivenessOfSystemOperation;
    model.degreeAction = secendModel.degreeAction;
    model.occurrenceAction = secendModel.occurrenceAction;

    let thirdModel = this.thirdFormGroup.value as RiskAnalysis;

    model.emergencyPlan = thirdModel.emergencyPlan;
    model.personForEmergencyPlan = thirdModel.personForEmergencyPlan;
    model.assessmentOfVerificationEffectiveness = thirdModel.assessmentOfVerificationEffectiveness;

    this.riskAnalysisService.updateRiskAnalysis(model).subscribe(x => {
      this.displayMessage('Dane zaktualizowane.');
    });
  }

  getProcessTypes() {
    this.processTypes =
      [
        { value: 1, name: 'Ryzyko' } as Category,
        { value: 2, name: 'Szansa' } as Category
      ];
  }

  getNumbers() {
    this.numbers =
      [
        1, 2, 3, 4
      ];
  }

  onChangeProcesType(event: any) {
    if (event?.value) {
      this.setProcesTypeText(event.value);
      this.calculateResult();
      this.calculateSecendResult();
    }
  }

  onChangeDegree(event: any) {
    let typeValue = (this.firstFormGroup.get('processType')?.value ?? 0) as number;
    this.setClassForResult(typeValue, 'first-result');
  }

  onChangeOccurrence(event: any) {
    let typeValue = (this.firstFormGroup.get('processType')?.value ?? 0) as number;
    this.setClassForResult(typeValue, 'first-result');
  }

  onChangeDegreeAction(event: any) {
    let typeValue = (this.firstFormGroup.get('processType')?.value ?? 0) as number;
    this.setClassForResult(typeValue, 'second-result');
  }

  onChangeOccurrenceAction(event: any) {
    let typeValue = (this.firstFormGroup.get('processType')?.value ?? 0) as number;
    this.setClassForResult(typeValue, 'second-result');
  }

  openLegend() {
    this.dialog.open(RiskLegendDialogComponent);
  }

  openCriteria() {
    this.dialog.open(RiskCriteriaDialogComponent);
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }

  calculateResult() {
    let degree = (this.firstFormGroup.get('degree')?.value ?? 0) as number;
    let occurrence = (this.firstFormGroup.get('occurrence')?.value ?? 0) as number;

    this.firstResult = degree * occurrence;
  }

  calculateSecendResult() {
    let degree = (this.secondFormGroup.get('degreeAction')?.value ?? 0) as number;
    let occurrence = (this.secondFormGroup.get('occurrenceAction')?.value ?? 0) as number;

    this.secondResult = degree * occurrence;
  }
}
