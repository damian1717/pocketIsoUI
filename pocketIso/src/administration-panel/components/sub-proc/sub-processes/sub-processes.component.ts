import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SubProcess } from '../../../models/sub-process.model';
import { SubProcessService } from '../../../../administration-panel/services/sub-process.service';
import { ConfirmationDialogComponent } from '../../../../common/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RaportService } from '../../../../common/services/raport.service';
import { SaveAsService } from '../../../../common/services/save-as.service';
import { AuthService } from '../../../../common/auth/auth.service';
import { Role } from '../../../../common/enums/user-role-codes';

@Component({
  selector: 'app-sub-processes',
  templateUrl: './sub-processes.component.html',
  styleUrls: ['./sub-processes.component.css']
})
export class SubProcessesComponent implements OnInit {

  processes: SubProcess[] = [];
  subProcessType: number | undefined;
  displayedColumns: string[] = ['code', 'description', 'download', 'edit', 'archive'];
  addButtontext: string = '';
  role: string = '';
  constructor(private route: ActivatedRoute, private router: Router, private subProcessService: SubProcessService,
    private snackBar: MatSnackBar, public dialog: MatDialog, private saveAsService: SaveAsService, private raport: RaportService,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.subProcessType = Number(this.route.snapshot.paramMap.get('type'));

      this.getSubProcesses(this.subProcessType);

      if (this.subProcessType === 1) {
        this.addButtontext = 'Dodaj Procedure';
      } else {
        this.addButtontext = 'Dodaj Instrukcje';
      }

      this.role = this.authService.getRole();

      if (this.role === Role.SuperAdmin || this.role === Role.Admin) {
        this.displayedColumns = ['code', 'description', 'download', 'edit', 'archive'];
      } else {
        this.displayedColumns = ['code', 'description', 'download'];
      }
    });
  }


  dataSource = new MatTableDataSource(this.processes);

  getSubProcesses(subProcessType: number) {
    this.subProcessService.getSubProcesses(subProcessType).subscribe(x => {
      if (this.role === Role.User) {
        if (x && x.length > 0) {
          let filteredItems = x.filter(x => !x.isArchive);
          this.processes = filteredItems;
          this.dataSource.data = filteredItems;
        }
      } else {
        this.processes = x;
        this.dataSource.data = x;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addSubProcess() {
    this.router.navigateByUrl(`add-sub-process/${this.subProcessType}`);
  }

  editSubProcess(id: string) {
    this.router.navigateByUrl(`add-sub-process/${this.subProcessType}/${id}`);
  }

  archive(element: SubProcess) {
    if (element) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { text: 'Czy napewno chcesz zarchiwizować?' } });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          element.isArchive = true;
          this.subProcessService.updateSubProcess(element)
            .subscribe(x => {
              this.displayMessage('Zarchiwizowano.');
            })
        }
      })
    }
  }

  displayMessage(message: string) {
    this.snackBar.open(message, '', { duration: 2500 });
  }

  generateReport(id: string) {
    this.subProcessService.getSubProcess(id).subscribe(x => {
      if (x) {
        this.raport.generateSubProcessRaportPdf(x)
          .subscribe(resp => {
            this.saveAsService.save(resp.body, resp.filename);
            this.displayMessage('Raport utworzony');
          })
      }
    });
  }
}
