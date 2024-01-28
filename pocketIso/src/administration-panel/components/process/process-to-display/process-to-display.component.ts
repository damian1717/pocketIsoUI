import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Process } from '../../../../administration-panel/models/process.model';
import { ProcessService } from '../../../../administration-panel/services/process.service';
import { SaveAsService } from '../../../../common/services/save-as.service';
import { DocumentService } from '../../../../common/services/document.service';
import { RaportCode } from '../../../../common/enums/raport-codes';

@Component({
  selector: 'app-process-to-display',
  templateUrl: './process-to-display.component.html',
  styleUrls: ['./process-to-display.component.scss']
})
export class ProcessToDisplayComponent implements OnInit {

  processes: Process[] = [];
  displayedColumns: string[] = ['name', 'download'];
  constructor(private processService: ProcessService, private documentService: DocumentService,
    private saveAsService: SaveAsService, private snackBar: MatSnackBar) { }

  dataSource = new MatTableDataSource(this.processes);

  ngOnInit() {
    this.getProcesses();
  }

  getProcesses() {
    this.processService.getProcesses().subscribe(x => {
      this.processes = x;
      this.dataSource.data = x;
      console.log(x);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  downloadDocumnet(processId: string, processName: string) {
    const code = `${RaportCode.DefinitionProcess}_${processId}`;

    this.documentService.downloadPdfByCodeLastAdded(code)
      .subscribe(
        resp => {
          this.saveAsService.save(resp.body, resp.filename);
          this.displayMessage(`Raport wygenerowany dla procesu: ${processName}.`);
        },
        err => {
          if (err && err.status === 404) {
            this.displayMessage(`Raport nie został jeszcze utworzony dla procesu: ${processName}.`);
          } else {
            this.displayMessage('Problem podczas generowania raportu.');
          }
        }
      );
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 2500 });
  }

}
