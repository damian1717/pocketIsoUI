import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { RegulationService } from '../../../../administration-panel/services/regulation.service';
import { AuthService } from '../../../../common/auth/auth.service';
import { Regulation } from '../../../../administration-panel/models/regulation.model';
import { Role } from '../../../../common/enums/user-role-codes';
import { ConfirmationDialogComponent } from 'src/common/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-regulations-list',
  templateUrl: './regulations-list.component.html',
  styleUrls: ['./regulations-list.component.scss']
})
export class RegulationsListComponent implements OnInit {

  qualityRegulation: Regulation[] = [];
  financeRegulation: Regulation[] = [];
  waterManagementRegulation: Regulation[] = [];
  noiseEmissionsRegulation: Regulation[] = [];
  wasteGenerationRegulation: Regulation[] = [];
  packagingManagementRegulation: Regulation[] = [];
  gasEmissionsRegulation: Regulation[] = [];
  generalRequirementsRegulation: Regulation[] = [];
  bhpRegulation: Regulation[] = [];
  displayedColumns: string[] = ['name', 'link', 'description', 'edit' , 'delete'];
  canEdit = true;

  constructor(private regulationService: RegulationService, private router: Router, private authService: AuthService,
    private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.canEditRegulation();
    this.getQualityPolicies();

    if (!this.canEdit) {
      this.displayedColumns = ['name', 'link', 'description'];
    }
  }

  

  financeDataSource = new MatTableDataSource(this.financeRegulation);
  qualityDataSource = new MatTableDataSource(this.qualityRegulation);
  waterManagementDataSource = new MatTableDataSource(this.waterManagementRegulation);
  noiseEmissionsDataSource = new MatTableDataSource(this.noiseEmissionsRegulation);
  wasteGenerationDataSource = new MatTableDataSource(this.wasteGenerationRegulation);
  packagingManagementDataSource = new MatTableDataSource(this.packagingManagementRegulation);
  gasEmissionsDataSource = new MatTableDataSource(this.gasEmissionsRegulation);
  generalRequirementsDataSource = new MatTableDataSource(this.generalRequirementsRegulation);
  bhpDataSource = new MatTableDataSource(this.bhpRegulation);

  private canEditRegulation() {
    let role = this.authService.getRole();

    if (role === Role.User) {
      this.canEdit = false;
    } else {
      this.canEdit = true;
    }
  }

  getQualityPolicies() {
    this.regulationService.getRegulations().subscribe(x => {
      if (x && x.length > 0) {
        const financeReg = x.filter(x => x.category == 1);
        this.financeRegulation = financeReg;
        this.financeDataSource.data = financeReg;

        const qualityReg = x.filter(x => x.category == 2);
        this.qualityRegulation = qualityReg;
        this.qualityDataSource.data = qualityReg;

        const waterManagements = x.filter(x => x.category == 3);
        this.waterManagementRegulation = waterManagements;
        this.waterManagementDataSource.data = waterManagements;

        const noiseEmissionsRegulations = x.filter(x => x.category == 4);
        this.noiseEmissionsRegulation = noiseEmissionsRegulations;
        this.noiseEmissionsDataSource.data = noiseEmissionsRegulations;

        const wasteGenerationRegulations = x.filter(x => x.category == 5);
        this.wasteGenerationRegulation = wasteGenerationRegulations;
        this.wasteGenerationDataSource.data = wasteGenerationRegulations;

        const packagingManagementRegulations = x.filter(x => x.category == 6);
        this.packagingManagementRegulation = packagingManagementRegulations;
        this.packagingManagementDataSource.data = packagingManagementRegulations;

        const gasEmissionsRegulations = x.filter(x => x.category == 7);
        this.gasEmissionsRegulation = gasEmissionsRegulations;
        this.gasEmissionsDataSource.data = gasEmissionsRegulations;

        const generalRequirementsRegulations = x.filter(x => x.category == 8);
        this.generalRequirementsRegulation = generalRequirementsRegulations;
        this.generalRequirementsDataSource.data = generalRequirementsRegulations;

        const bhpRegulations = x.filter(x => x.category == 9);
        this.bhpRegulation = bhpRegulations;
        this.bhpDataSource.data = bhpRegulations;
      }

    })
  }

  redirectToEditRegulation(id: string): void {
    this.router.navigateByUrl(`add-regulation/${id}`);
  }

  deleteRegulation(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { text: 'Czy napewno chcesz usunąć?' } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.regulationService.deleteRegulation(id).subscribe(
          res => {
            this.displayMessage('Przypis prawny został usunięty.');
            this.getQualityPolicies();
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

}
