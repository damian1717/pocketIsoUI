import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Process } from '../../../../administration-panel/models/process.model';
import { ProcessService } from '../../../../administration-panel/services/process.service';

@Component({
  selector: 'app-base-processes',
  templateUrl: './base-processes.component.html',
  styleUrls: ['./base-processes.component.scss']
})
export class BaseProcessesComponent implements OnInit {

  managerProcesses: Process[] = [];
  mainProcesses: Process[] = [];
  supportingProcesses: Process[] = [];
  constructor(private processService: ProcessService, private router: Router) { }

  ngOnInit() {
    this.getProcesses();
  }

  displayedColumns: string[] = ['name', 'edit', 'defineprocess'];
  managerDataSource = new MatTableDataSource(this.managerProcesses);
  mainDataSource = new MatTableDataSource(this.mainProcesses);
  supportingDataSource = new MatTableDataSource(this.supportingProcesses);

  getProcesses() {
    this.processService.getBaseProcesses().subscribe(x => {
      if (x && x.length) {
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

  redirectToEditProcess(id: string): void {
    this.router.navigateByUrl(`add-base-process/${id}`);
  }

  redirectToDefineProcess(id: string): void {
    this.router.navigateByUrl(`define-base-process/${id}`);
  }
}
