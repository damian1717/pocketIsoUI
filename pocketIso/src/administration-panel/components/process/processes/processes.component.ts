import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Process } from '../../../../administration-panel/models/process.model';
import { ProcessService } from '../../../../administration-panel/services/process.service';
import { AuthService } from '../../../../common/auth/auth.service';
import { Role } from '../../../../common/enums/user-role-codes';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit {

  processes: Process[] = [];
  displayedColumns: string[] = ['name', 'edit', 'defineprocess'];
  showCompanyName = true;

  constructor(private processService: ProcessService, private router: Router, private authService: AuthService) { }

  ngOnInit() {

    const role = this.authService.getRole();

    if (role === Role.SuperAdmin) {
      this.getProcessesForSuperAdmin();
      this.displayedColumns = ['name', 'basic', 'edit', 'company', 'defineprocess'];
      this.showCompanyName = true;
    } else {
      this.getProcesses();
      this.displayedColumns = ['name', 'basic', 'edit', 'defineprocess'];
      this.showCompanyName = false;
    }
  }

  
  dataSource = new MatTableDataSource(this.processes);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getProcesses() {
    this.processService.getProcesses().subscribe(x => {
      this.processes = x;
      this.dataSource.data = x;
    })
  }

  getProcessesForSuperAdmin() {
    this.processService.getProcessesForSuperAdmin().subscribe(x => {
      this.processes = x;
      this.dataSource.data = x;
    })
  }

  redirectToEditProcess(id: string): void {
    this.router.navigateByUrl(`add-process/${id}`);
  }

  redirectToDefineProcess(id: string): void {
    this.router.navigateByUrl(`define-process/${id}`);
  }

}
