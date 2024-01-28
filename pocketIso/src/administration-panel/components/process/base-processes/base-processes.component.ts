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

  processes: Process[] = [];
  constructor(private processService: ProcessService, private router: Router) { }

  ngOnInit() {
    this.getProcesses();
  }

  displayedColumns: string[] = ['name', 'edit', 'defineprocess'];
  dataSource = new MatTableDataSource(this.processes);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getProcesses() {
    this.processService.getBaseProcesses().subscribe(x => {
      this.processes = x;
      this.dataSource.data = x;
    })
  }

  redirectToEditProcess(id: string): void {
    this.router.navigateByUrl(`add-base-process/${id}`);
  }

  redirectToDefineProcess(id: string): void {
    this.router.navigateByUrl(`define-base-process/${id}`);
  }
}
