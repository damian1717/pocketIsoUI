import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { RiskAnalysis } from '../../../../administration-panel/models/risk-analysis.model';
import { RiskAnalysisService } from '../../../../administration-panel/services/risk-analysis.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../common/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RiskLegendDialogComponent } from '../risk-legend-dialog/risk-legend-dialog.component';
import { RiskCriteriaDialogComponent } from '../risk-criteria-dialog/risk-criteria-dialog.component';

@Component({
  selector: 'app-risk-analysis-list',
  templateUrl: './risk-analysis-list.component.html',
  styleUrls: ['./risk-analysis-list.component.css']
})
export class RiskAnalysisListComponent implements OnInit {

  processId = '';
  analysType = '';
  displayedColumns = [
    'riskType',
    'ownerOfProcess',
    'definedIssue',
    'potentialCause',
    'degree',
    'occurrence',
    'rate',
    'preventiveAction',
    'personForSystemImplementation',
    'plannedSystemImplementationDate',
    'realSystemImplementationDate',
    'implementationStatus',
    'systemPerformance',
    'dateEffectivenessOfSystemOperation',
    'degreeAction',
    'occurrenceAction',
    'rate2',
    'emergencyPlan',
    'personForEmergencyPlan',
    'assessmentOfVerificationEffectiveness',
    'changedFields',
    'modifiedBy',
    'modifiedDate',
    'version',
    'edit',
    'delete'
  ];
  listOfRisk: RiskAnalysis[] = []
  dataSource = new MatTableDataSource(this.listOfRisk);
  constructor(private router: Router, private route: ActivatedRoute, private riskAnalysisService: RiskAnalysisService,
    public dialog: MatDialog, private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.processId = this.route.snapshot.paramMap.get('id')!;
    this.analysType = this.route.snapshot.paramMap.get('type')!;

    this.getRisks();
  }

  add() {
    this.redirectToAddRiskAnalysis();
  }

  redirectToAddRiskAnalysis() {
    this.router.navigateByUrl(`risk-analysis/${this.analysType}/${this.processId}`);
  }

  getRisks() {
    let type = this.analysType === 'process' ? 1 : 2;
    this.riskAnalysisService.getRiskAnalysisByProcessIdAndType(this.processId, type)
      .subscribe(x => {
        if (x) {
          this.listOfRisk = x;
          this.dataSource.data = x;
        }
      })
  }

  redirectToEdit(id: string) {
    this.router.navigateByUrl(`risk-analysis/${this.analysType}/${this.processId}/${id}`);
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { text: 'Czy napewno chce usunąć definicje procesu?' } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.riskAnalysisService.deleteRiskAnalysis(id).subscribe(x => {
          this.getRisks();
          this.displayMessage('Dane usuniete.');
        });
      }
    });
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }

  openLegend() {
    this.dialog.open(RiskLegendDialogComponent);
  }

  openCriteria() {
    this.dialog.open(RiskCriteriaDialogComponent);
  }
}


