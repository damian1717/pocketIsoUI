import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DefineProcessDialogComponent } from '../define-process-dialog/define-process-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { DefineOfProcess } from '../../../../administration-panel/models/define-of-process.model';
import { DefinitionOfProcessService } from '../../../../administration-panel/services/definition-of-process.service';
import { DefinitionOfProcessCode } from '../../../../common/enums/definition-of-process-codes';
import { ConfirmationDialogComponent } from '../../../../common/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-define-base-process',
  templateUrl: './define-base-process.component.html',
  styleUrls: ['./define-base-process.component.scss']
})
export class DefineBaseProcessComponent implements OnInit {

  panelOpenState = false;
  displayedColumns: string[] = ['name', 'edit', 'delete'];
  defineOfProcesses: DefineOfProcess[] = [];
  inputDataDataSource = new MatTableDataSource(this.defineOfProcesses);
  outputDataDataSource = new MatTableDataSource(this.defineOfProcesses);
  measuredValuesDataSource = new MatTableDataSource(this.defineOfProcesses);
  materialDataSource = new MatTableDataSource(this.defineOfProcesses);
  resourcesDataSource = new MatTableDataSource(this.defineOfProcesses);
  documentsDataSource = new MatTableDataSource(this.defineOfProcesses);
  itemsDataSource = new MatTableDataSource(this.defineOfProcesses);

  processId: string = '';

  constructor(private definitionOfProcessService: DefinitionOfProcessService, private snackBar: MatSnackBar, public dialog: MatDialog,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.processId = this.route.snapshot.paramMap.get('id')!;
    this.getDataSources();
  }

  getDataSources() {
    this.definitionOfProcessService.getBaseDefinitionOfProcess(this.processId).subscribe(x => {
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
      data: { id: '', name: '', isBase: true, processId: processId, code: definitionOfProcessCode } as DefineOfProcess
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
        data: { id: id, name: p.name, isBase: true, processId: this.processId, code: definitionOfProcessCode } as DefineOfProcess
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
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { text: 'Czy napewno chcesz usunąć?'} });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.definitionOfProcessService.deleteDefineOfProcess(id).subscribe(x => {
            this.getDataSources();
            this.displayMessage('Definicja procesu usunieta.');
          });
        }
      });
    
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 1500 });
  }
}