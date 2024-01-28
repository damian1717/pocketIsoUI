import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DefineOfProcess } from '../../../../administration-panel/models/define-of-process.model';
import { DocumentInfo } from '../../../../common/models/documnet.model';
import { DefinitionOfProcessService } from '../../../../administration-panel/services/definition-of-process.service';
import { DocumentService } from '../../../../common/services/document.service';
import { ProcessService } from '../../../../administration-panel/services/process.service';
import { SaveAsService } from '../../../../common/services/save-as.service';
import { RaportService } from '../../../../common/services/raport.service';
import { DefinitionOfProcessCode } from '../../../../common/enums/definition-of-process-codes';
import { DefineProcessDialogComponent } from '../define-process-dialog/define-process-dialog.component';
import { DefinitionProcessReport } from '../../../../common/models/definition-process-report.model';
import { RaportCode } from '../../../../common/enums/raport-codes';

@Component({
  selector: 'app-define-process',
  templateUrl: './define-process.component.html',
  styleUrls: ['./define-process.component.scss']
})
export class DefineProcessComponent implements OnInit {

  panelOpenState = false;
  displayedColumns: string[] = ['name', 'basic', 'edit', 'delete'];
  defineOfProcesses: DefineOfProcess[] = [];
  inputDataDataSource = new MatTableDataSource(this.defineOfProcesses);
  outputDataDataSource = new MatTableDataSource(this.defineOfProcesses);
  measuredValuesDataSource = new MatTableDataSource(this.defineOfProcesses);
  materialDataSource = new MatTableDataSource(this.defineOfProcesses);
  resourcesDataSource = new MatTableDataSource(this.defineOfProcesses);
  documentsDataSource = new MatTableDataSource(this.defineOfProcesses);
  itemsDataSource = new MatTableDataSource(this.defineOfProcesses);

  documents : DocumentInfo[] = [];
  processId: string = '';
  processName: string = '';

  constructor(private definitionOfProcessService: DefinitionOfProcessService, private snackBar: MatSnackBar, public dialog: MatDialog,
    private route: ActivatedRoute, private saveAsService: SaveAsService, private documentService: DocumentService,
    private raport: RaportService, private processService: ProcessService) { }

  ngOnInit() {
    this.processId = this.route.snapshot.paramMap.get('id')!;
    this.getDataSources();
    this.getDocuments();
    this.getProcessName();
  }

  getProcessName() {
    this.processService.getProcess(this.processId).subscribe(x => {
      this.processName = x.name;
    })
  }

  getDataSources() {
    this.definitionOfProcessService.getDefinitionOfProcess(this.processId).subscribe(x => {
      this.defineOfProcesses = x;
      if (x && x.length > 0) {
        this.inputDataDataSource.data = x.filter(x => x.code === DefinitionOfProcessCode.InputData);

        this.outputDataDataSource.data = x.filter(x => x.code === DefinitionOfProcessCode.OutputData);

        this.measuredValuesDataSource.data = x.filter(x => x.code === DefinitionOfProcessCode.MeasuredValuesData);

        this.materialDataSource.data = x.filter(x => x.code === DefinitionOfProcessCode.MaterialData);

        this.resourcesDataSource.data = x.filter(x => x.code === DefinitionOfProcessCode.ResourceData);

        this.documentsDataSource.data = x.filter(x => x.code === DefinitionOfProcessCode.DocumentsData);

        this.itemsDataSource.data = x.filter(x => x.code === DefinitionOfProcessCode.ItemsData);
      } else {
        this.inputDataDataSource.data = [];
        this.outputDataDataSource.data = [];
        this.measuredValuesDataSource.data = [];
        this.materialDataSource.data = [];
        this.resourcesDataSource.data = [];
        this.documentsDataSource.data = [];
        this.itemsDataSource.data = [];
      }
    })
  }

  addInputData() {
    this.add(this.processId, DefinitionOfProcessCode.InputData);
  }

  editInputData(id: any) {
    this.edit(id, DefinitionOfProcessCode.InputData)
  }

  addOutputData() {
    this.add(this.processId, DefinitionOfProcessCode.OutputData);
  }

  editOutputData(id: any) {
    this.edit(id, DefinitionOfProcessCode.OutputData)
  }

  addMeasuredValuesData() {
    this.add(this.processId, DefinitionOfProcessCode.MeasuredValuesData);
  }

  editMeasuredValuesData(id: any) {
    this.edit(id, DefinitionOfProcessCode.MeasuredValuesData)
  }

  addMaterialData() {
    this.add(this.processId, DefinitionOfProcessCode.MaterialData);
  }

  editMaterialData(id: any) {
    this.edit(id, DefinitionOfProcessCode.MaterialData)
  }

  addResourceData() {
    this.add(this.processId, DefinitionOfProcessCode.ResourceData);
  }

  editResourceData(id: any) {
    this.edit(id, DefinitionOfProcessCode.ResourceData)
  }

  addDocumentsData() {
    this.add(this.processId, DefinitionOfProcessCode.DocumentsData);
  }

  editDocumentsData(id: any) {
    this.edit(id, DefinitionOfProcessCode.DocumentsData)
  }

  addItemsData() {
    this.add(this.processId, DefinitionOfProcessCode.ItemsData);
  }

  editItemsData(id: any) {
    this.edit(id, DefinitionOfProcessCode.ItemsData)
  }

  add(processId: string, definitionOfProcessCode: string) {
    const dialogRef = this.dialog.open(DefineProcessDialogComponent, {
      width: '350px',
      data: { id: '', name: '', isBase: false, processId: processId, code: definitionOfProcessCode } as DefineOfProcess
    });

    dialogRef.afterClosed().subscribe(result => {
      this.definitionOfProcessService.addDefineOfProcess(result).subscribe(x => {
        this.getDataSources();
        this.displayMessage('Definicja procesu dodana.');
      });
    })
  }

  edit(id: any, definitionOfProcessCode: string) {
    this.definitionOfProcessService.getDefinitionOfProcessById(id).subscribe(p => {
      const dialogRef = this.dialog.open(DefineProcessDialogComponent, {
        width: '350px',
        data: { id: id, name: p.name, isBase: false, processId: this.processId, code: definitionOfProcessCode } as DefineOfProcess
      });

      dialogRef.afterClosed().subscribe(result => {
        this.definitionOfProcessService.updateDefineOfProcess(result).subscribe(x => {
          this.getDataSources();
          this.displayMessage('Definicja procesu zaktualizowana.');
        });
      })
    })
  }

  delete(id: any) {
    this.definitionOfProcessService.deleteDefineOfProcess(id).subscribe(x => {
      this.getDataSources();
      this.displayMessage('Definicja procesu usunieta.');
    });
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }

  generateRaportPdf() {
    const request = { processId: this.processId, processName: this.processName } as DefinitionProcessReport;
    
    this.raport.generateDefinitionProcessRaportPdf(request)
    .subscribe(
      resp => {
        this.saveAsService.save(resp.body, resp.filename);
        this.getDataSources();
        this.getDocuments();
      }
    );
  }

  downloadDocumnet(id: string) {
    this.documentService.downloadFileById(id)
    .subscribe(
      resp =>  { 
        this.saveAsService.save(resp.body, resp.filename);
        this.displayMessage(`Raport wygenerowany dla procesu.`);
      }
    );
  }

  private getDocuments() {
    const reportCode = `${RaportCode.DefinitionProcess}_${this.processId}`
    this.documentService.getDocumentsByCode(reportCode).subscribe(x => {
      this.documents = x;
    });
  }

}
