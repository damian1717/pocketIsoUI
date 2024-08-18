import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Process } from '../../../../administration-panel/models/process.model';
import { ProcessService } from '../../../../administration-panel/services/process.service';
import { AuthService } from '../../../../common/auth/auth.service';
import { Role } from '../../../../common/enums/user-role-codes';
import { RaportCode } from '../../../../common/enums/raport-codes';
import { DocumentService } from '../../../../common/services/document.service';
import { SaveAsService } from '../../../../common/services/save-as.service';
import { RaportService } from '../../../../common/services/raport.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentInfo } from '../../../../common/models/documnet.model';
import { ProcessMap } from 'src/common/models/process-map-report.model';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit {

  allProcesses: Process[] = [];
  managerProcesses: Process[] = [];
  mainProcesses: Process[] = [];
  supportingProcesses: Process[] = [];
  displayedColumns: string[] = ['name', 'edit', 'defineprocess'];
  showCompanyName = true;
  documents: DocumentInfo[] = [];
  
  constructor(private processService: ProcessService, private router: Router, private authService: AuthService,
    private documentService: DocumentService, private saveAsService: SaveAsService, private raport: RaportService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

    const role = this.authService.getRole();

    if (role === Role.SuperAdmin) {
      this.getProcessesForSuperAdmin();
      this.displayedColumns = ['name', 'basic', 'edit', 'company', 'defineprocess', 'riskAnalysis'];
      this.showCompanyName = true;
    } else {
      this.getProcesses();
      this.displayedColumns = ['name', 'basic', 'edit', 'defineprocess', 'riskAnalysis'];
      this.showCompanyName = false;
    }
  }


  managerDataSource = new MatTableDataSource(this.managerProcesses);
  mainDataSource = new MatTableDataSource(this.mainProcesses);
  supportingDataSource = new MatTableDataSource(this.supportingProcesses);

  getProcesses() {
    this.processService.getProcesses().subscribe(x => {
      if (x && x.length) {
        this.allProcesses = x;

        const managers = x.filter(x => x.processType === 1);;
        this.managerProcesses = managers;
        this.managerDataSource.data = managers;

        const mains = x.filter(x => x.processType === 2);;
        this.mainProcesses = mains;
        this.mainDataSource.data = mains;

        const supportings = x.filter(x => x.processType === 3);;
        this.supportingProcesses = supportings;
        this.supportingDataSource.data = supportings;
      }
    })
  }

  getProcessesForSuperAdmin() {
    this.processService.getProcessesForSuperAdmin().subscribe(x => {
      if (x && x.length) {
        this.allProcesses = x;

        const managers = x.filter(x => x.processType === 1);
        this.managerProcesses = managers;
        this.managerDataSource.data = managers;

        const mains = x.filter(x => x.processType === 2);;
        this.mainProcesses = mains;
        this.mainDataSource.data = mains;

        const supportings = x.filter(x => x.processType === 3);;
        this.supportingProcesses = supportings;
        this.supportingDataSource.data = supportings;
      }
    })
  }

  redirectToEditProcess(id: string): void {
    this.router.navigateByUrl(`add-process/${id}`);
  }

  redirectToDefineProcess(id: string): void {
    this.router.navigateByUrl(`define-process/${id}`);
  }

  redirectToRiskAnalysis(processId: string) {
     this.router.navigateByUrl(`risk-analysis/${processId}`);
  }

  private getDocuments() {
    this.documentService.getDocumentsByCode(RaportCode.ProcessMap).subscribe(x => {
      this.documents = x;
    });
  }

  downloadDocumnet(id: string, name: string) {
    this.documentService.downloadFileById(id)
      .subscribe(
        resp => this.saveAsService.save(resp.body, name),
      );
  }

  generateReport() {
    let request = { processes: this.allProcesses } as ProcessMap;
    this.raport.generateProcessMapRaportPdf(request)
      .subscribe(resp => {
        this.saveAsService.save(resp.body, resp.filename);
        this.getDocuments();
        this.displayMessage('Raport utworzony');
      })
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }
}
